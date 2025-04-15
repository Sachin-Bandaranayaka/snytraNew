import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, orderItems, orderTimeline, customers, users } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface RouteParams {
    params: {
        id: string
    }
}

// GET a specific order
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = params

        // Get the authenticated user session
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get user from database
        const userResult = await db.select().from(users).where(eq(users.email, session.user.email))

        if (!userResult.length) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const user = userResult[0]

        // Get order
        const orderResult = await db
            .select()
            .from(orders)
            .where(
                and(
                    eq(orders.companyId, user.id),
                    eq(orders.orderId, id)
                )
            )
            .limit(1)

        if (!orderResult.length) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        const order = orderResult[0]

        // Get customer data
        let customerData = null
        if (order.customerId) {
            const customerResult = await db
                .select()
                .from(customers)
                .where(eq(customers.id, order.customerId))
                .limit(1)

            if (customerResult.length > 0) {
                customerData = customerResult[0]
            }
        }

        // Get order items
        const itemsResult = await db
            .select()
            .from(orderItems)
            .where(eq(orderItems.orderId, order.id))

        // Get order timeline
        const timelineResult = await db
            .select({
                id: orderTimeline.id,
                status: orderTimeline.status,
                timestamp: orderTimeline.timestamp,
                notes: orderTimeline.notes,
                userId: orderTimeline.userId
            })
            .from(orderTimeline)
            .where(eq(orderTimeline.orderId, order.id))
            .orderBy(orderTimeline.timestamp)

        // Format the order
        const formattedOrder = {
            ...order,
            customer: customerData,
            items: itemsResult,
            timeline: timelineResult,
            subtotalFormatted: formatCurrency(order.subtotal),
            taxFormatted: formatCurrency(order.tax),
            deliveryFeeFormatted: formatCurrency(order.deliveryFee),
            totalFormatted: formatCurrency(order.total),
            orderDateFormatted: formatDate(order.orderDate),
            timeFormatted: formatTime(order.orderDate)
        }

        return NextResponse.json(formattedOrder)
    } catch (error) {
        console.error('Error fetching order:', error)
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        )
    }
}

// PATCH - Update order status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = params

        // Get the authenticated user session
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get user from database
        const userResult = await db.select().from(users).where(eq(users.email, session.user.email))

        if (!userResult.length) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const user = userResult[0]

        // Get order
        const orderResult = await db
            .select()
            .from(orders)
            .where(
                and(
                    eq(orders.companyId, user.id),
                    eq(orders.orderId, id)
                )
            )
            .limit(1)

        if (!orderResult.length) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        const order = orderResult[0]

        // Parse request body
        const body = await request.json()
        const { status, notes } = body

        // Validate status
        if (!status || !['created', 'in-progress', 'completed', 'cancelled'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            )
        }

        // Update order status
        await db
            .update(orders)
            .set({
                status,
                updatedAt: new Date()
            })
            .where(eq(orders.id, order.id))

        // Add timeline entry
        await db
            .insert(orderTimeline)
            .values({
                orderId: order.id,
                status,
                userId: user.id,
                timestamp: new Date(),
                notes: notes || `Order status updated to ${status}`
            })

        return NextResponse.json({
            success: true,
            message: `Order status updated to ${status}`
        })
    } catch (error) {
        console.error('Error updating order:', error)
        return NextResponse.json(
            { error: 'Failed to update order' },
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