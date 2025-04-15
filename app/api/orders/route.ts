import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, orderItems, orderTimeline, customers, users } from '@/lib/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth'

// GET all orders for the current user's company
export async function GET(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse query parameters
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const orderType = searchParams.get('type')
        const dateRange = searchParams.get('dateRange') // today, yesterday, week, month
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        // Build query conditions with raw SQL to avoid column name issues
        let conditions = [`orders."companyId" = ${user.id}`]

        if (status && status !== 'all') {
            conditions.push(`orders."status" = '${status}'`)
        }

        if (orderType && orderType !== 'all') {
            conditions.push(`orders."orderType" = '${orderType}'`)
        }

        if (dateRange) {
            const now = new Date()
            let startDate = new Date()

            switch (dateRange) {
                case 'today':
                    startDate.setHours(0, 0, 0, 0)
                    break
                case 'yesterday':
                    startDate.setDate(startDate.getDate() - 1)
                    startDate.setHours(0, 0, 0, 0)
                    now.setDate(now.getDate() - 1)
                    now.setHours(23, 59, 59, 999)
                    break
                case 'week':
                    startDate.setDate(startDate.getDate() - 7)
                    break
                case 'month':
                    startDate.setMonth(startDate.getMonth() - 1)
                    break
                default:
                    break
            }

            conditions.push(`orders."orderDate" >= '${startDate.toISOString()}'`)
            conditions.push(`orders."orderDate" <= '${now.toISOString()}'`)
        }

        // Use raw SQL query to avoid column name issues
        const whereClause = conditions.join(' AND ')

        // Get total count for pagination
        const totalCountQuery = `
            SELECT COUNT(DISTINCT orders.id) as count
            FROM orders
            WHERE ${whereClause}
        `

        const totalCountResult = await db.execute(totalCountQuery)
        const totalCount = parseInt(totalCountResult.rows?.[0]?.count || '0')

        // Get orders with related data using raw SQL
        const ordersQuery = `
            SELECT 
                orders.id,
                orders."orderId",
                orders."customerId",
                orders.status,
                orders."orderType",
                orders.subtotal,
                orders.tax,
                orders."deliveryFee",
                orders.total,
                orders."paymentMethod",
                orders."paymentStatus",
                orders.notes,
                orders."orderDate",
                orders."createdAt"
            FROM orders
            WHERE ${whereClause}
            ORDER BY orders."orderDate" DESC
            LIMIT ${limit} OFFSET ${offset}
        `

        const result = await db.execute(ordersQuery)
        const ordersResult = result.rows || [];

        // For each order, get the customer and items
        const ordersWithDetails = await Promise.all(
            ordersResult.map(async (order) => {
                // Get customer data
                let customerData = null
                if (order.customerId) {
                    const customerQuery = `
                        SELECT *
                        FROM customers
                        WHERE id = ${order.customerId}
                        LIMIT 1
                    `

                    const customerResult = await db.execute(customerQuery)
                    const customerRows = customerResult.rows || [];

                    if (customerRows.length > 0) {
                        customerData = customerRows[0]
                    }
                }

                // Get order items using raw SQL
                const orderItemsQuery = `
                    SELECT *
                    FROM order_items
                    WHERE "orderId" = ${order.id}
                `

                const itemsResult = await db.execute(orderItemsQuery)
                const itemsRows = itemsResult.rows || [];

                // Format the order
                return {
                    ...order,
                    customer: customerData,
                    items: itemsRows,
                    subtotalFormatted: formatCurrency(order.subtotal),
                    taxFormatted: formatCurrency(order.tax),
                    deliveryFeeFormatted: formatCurrency(order.deliveryFee),
                    totalFormatted: formatCurrency(order.total),
                    orderDateFormatted: formatDate(order.orderDate),
                    timeFormatted: formatTime(order.orderDate)
                }
            })
        )

        return NextResponse.json({
            orders: ordersWithDetails,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        })
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}

// Helper functions
function formatCurrency(amount: number): string {
    return `₹${(amount / 100).toFixed(2)}`
}

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
}

function formatTime(date: Date): string {
    return date.toTimeString().split(' ')[0].substring(0, 5)
}

// POST - Create a new order
export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse request body
        const body = await request.json()
        const {
            customer,
            items,
            orderType,
            subtotal,
            tax,
            deliveryFee = 0,
            total,
            paymentMethod,
            paymentStatus = 'pending',
            transactionId,
            notes
        } = body

        // Validate required fields
        if (!items || !items.length || !orderType || subtotal === undefined || tax === undefined || total === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create or get customer
        let customerId = null
        if (customer && customer.name) {
            // Check if customer already exists
            let existingCustomer = null
            if (customer.email || customer.phone) {
                const conditions = []
                if (customer.email) conditions.push(`email = '${customer.email}'`)
                if (customer.phone) conditions.push(`phone = '${customer.phone}'`)

                const customerQuery = `
                    SELECT *
                    FROM customers
                    WHERE "companyId" = ${user.id}
                    AND (${conditions.join(' OR ')})
                    LIMIT 1
                `

                const existingCustomerResult = await db.execute(customerQuery)
                const customerRows = existingCustomerResult.rows || [];

                if (customerRows.length > 0) {
                    existingCustomer = customerRows[0]
                }
            }

            if (existingCustomer) {
                customerId = existingCustomer.id
            } else {
                // Create new customer
                const createCustomerQuery = `
                    INSERT INTO customers ("companyId", name, email, phone, address)
                    VALUES (${user.id}, '${customer.name}', ${customer.email ? `'${customer.email}'` : 'NULL'}, ${customer.phone ? `'${customer.phone}'` : 'NULL'}, ${customer.address ? `'${customer.address}'` : 'NULL'})
                    RETURNING id
                `

                const newCustomer = await db.execute(createCustomerQuery)
                const customerRows = newCustomer.rows || [];

                if (customerRows.length > 0) {
                    customerId = customerRows[0].id
                }
            }
        }

        // Generate order ID (e.g., ORD-12345)
        const orderIdPrefix = 'ORD-'
        const orderIdNumber = Math.floor(10000 + Math.random() * 90000) // 5-digit random number
        const orderId = `${orderIdPrefix}${orderIdNumber}`

        // Calculate total if not provided
        const calculatedTotal = subtotal + tax + deliveryFee

        // Create order
        const createOrderQuery = `
            INSERT INTO orders (
                "orderId", "companyId", "customerId", status, "orderType", subtotal, tax, "deliveryFee", 
                total, "paymentMethod", "paymentStatus", "transactionId", notes, "orderDate"
            )
            VALUES (
                '${orderId}', ${user.id}, ${customerId ? customerId : 'NULL'}, 'created', '${orderType}', 
                ${subtotal}, ${tax}, ${deliveryFee}, ${total || calculatedTotal}, 
                ${paymentMethod ? `'${paymentMethod}'` : 'NULL'}, 
                '${paymentStatus}', 
                ${transactionId ? `'${transactionId}'` : 'NULL'}, 
                ${notes ? `'${notes}'` : 'NULL'}, 
                CURRENT_TIMESTAMP
            )
            RETURNING id
        `

        const orderResult = await db.execute(createOrderQuery)
        const orderRows = orderResult.rows || [];

        if (!orderRows.length) {
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: 500 }
            )
        }

        const newOrderId = orderRows[0].id

        // Create order items
        for (const item of items) {
            const createOrderItemQuery = `
                INSERT INTO order_items (
                    "orderId", "menuItemId", name, price, quantity, subtotal, notes
                )
                VALUES (
                    ${newOrderId}, ${item.menuItemId ? item.menuItemId : 'NULL'}, '${item.name}', 
                    ${item.price}, ${item.quantity}, ${item.subtotal || item.price * item.quantity}, 
                    ${item.notes ? `'${item.notes}'` : 'NULL'}
                )
            `

            await db.execute(createOrderItemQuery)
        }

        // Create order timeline entry
        const createTimelineQuery = `
            INSERT INTO order_timeline (
                "orderId", status, "userId", notes
            )
            VALUES (
                ${newOrderId}, 'created', ${user.id}, 'Order created'
            )
        `

        await db.execute(createTimelineQuery)

        return NextResponse.json({
            success: true,
            message: 'Order created successfully',
            orderId: newOrderId
        })
    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        )
    }
} 