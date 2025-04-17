import { pgTable, serial, text, varchar, timestamp, integer, boolean, foreignKey, jsonb, unique } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password'), // Hashed password
    role: text('role').default('user'), // user, admin, etc.
    companyId: integer('company_id'),
    jobTitle: text('job_title'),
    phoneNumber: text('phone_number'),
    twoFactorEnabled: boolean('two_factor_enabled').default(false),
    // Additional fields for staff management
    position: text('position'),
    hourlyRate: integer('hourly_rate'),
    weeklyHours: integer('weekly_hours'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Companies table
export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
    name: text('company_name').notNull(),
    industry: text('industry'),
    address: text('address'),
    city: text('city'),
    state: text('state'),
    postalCode: text('postal_code'),
    country: text('country'),
    businessSize: text('business_size'),
    numberOfLocations: integer('number_of_locations'),
    taxId: text('tax_id'),
    businessRegistration: text('business_registration'),
    expectedOrderVolume: text('expected_order_volume'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Bookings/Reservations table
export const reservations = pgTable('reservations', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    date: timestamp('date').notNull(),
    time: text('time').notNull(),
    partySize: integer('party_size').notNull(),
    status: text('status').default('pending'), // pending, confirmed, cancelled
    specialRequests: text('special_requests'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Job Applications table
export const jobApplications = pgTable('job_applications', {
    id: serial('id').primaryKey(),
    jobId: text('job_id').notNull(),
    fullName: text('full_name').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: text('phone'),
    resumeUrl: text('resume_url'),
    coverLetter: text('cover_letter'),
    experienceYears: integer('experience_years'),
    howDidYouHear: text('how_did_you_hear'),
    status: text('status').default('submitted'), // submitted, reviewed, interviewed, hired, rejected
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Newsletter Subscribers table
export const newsletter = pgTable('newsletter', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: text('name'),
    subscribed: boolean('subscribed').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact Form Submissions table
export const contactSubmissions = pgTable('contact_submissions', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    subject: text('subject'),
    message: text('message').notNull(),
    status: text('status').default('new'), // new, read, replied
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Blog Categories table
export const blogCategories = pgTable('blog_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Blog Posts table
export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    excerpt: text('excerpt'),
    featuredImage: text('featured_image'),
    categoryId: integer('category_id').references(() => blogCategories.id),
    authorId: integer('author_id').references(() => users.id),
    status: text('status').default('draft'), // draft, published
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Pricing Packages table
export const pricingPackages = pgTable('pricing_packages', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(), // stored in cents
    billingCycle: text('billing_cycle').default('monthly'), // monthly, annually
    features: text('features').notNull(), // JSON string of features
    isPopular: boolean('is_popular').default(false),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// User Subscriptions table
export const userSubscriptions = pgTable('user_subscriptions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    packageId: integer('package_id').references(() => pricingPackages.id),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    status: text('status').default('active'), // active, cancelled, expired
    paymentStatus: text('payment_status').default('paid'), // paid, pending, failed
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Support Tickets table
export const supportTickets = pgTable('support_tickets', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    subject: text('subject').notNull(),
    description: text('description').notNull(),
    status: text('status').default('open'), // open, in_progress, resolved, closed
    priority: text('priority').default('medium'), // low, medium, high
    category: text('category').notNull(),
    assignedTo: integer('assigned_to').references(() => users.id),
    lastReplyBy: text('last_reply_by').default('user'), // user, admin
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Ticket Messages table
export const ticketMessages = pgTable('ticket_messages', {
    id: serial('id').primaryKey(),
    ticketId: integer('ticket_id').references(() => supportTickets.id).notNull(),
    userId: integer('user_id').references(() => users.id).notNull(),
    message: text('message').notNull(),
    isInternal: boolean('is_internal').default(false), // For admin notes not visible to user
    attachments: text('attachments'), // JSON array of attachment URLs
    createdAt: timestamp('created_at').defaultNow(),
});

// FAQ Categories table
export const faqCategories = pgTable('faq_categories', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    order: integer('order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// FAQ Items table
export const faqItems = pgTable('faq_items', {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id').references(() => faqCategories.id).notNull(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    order: integer('order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// System Settings table
export const systemSettings = pgTable('system_settings', {
    id: serial('id').primaryKey(),
    key: text('key').notNull().unique(),
    value: text('value').notNull(),
    description: text('description'),
    category: text('category').default('general'),
    updatedBy: integer('updated_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Carousel Images table
export const carouselImages = pgTable('carousel_images', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    imageSrc: text('image_src').notNull(),
    altText: text('alt_text'),
    carouselType: text('carousel_type').notNull(), // admin-dashboard, order-management, etc.
    order: integer('order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    createdBy: integer('created_by').references(() => users.id),
    updatedBy: integer('updated_by').references(() => users.id),
});

// Testimonials table
export const testimonials = pgTable('testimonials', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    quote: text('quote').notNull(),
    imageSrc: text('image_src'),
    order: integer('order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    createdBy: integer('created_by').references(() => users.id),
    updatedBy: integer('updated_by').references(() => users.id),
});

// Restaurant Management System Schema

// Company Settings table
export const companySettings = pgTable('company_settings', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    logoUrl: text('logo_url'),
    primaryColor: text('primary_color').default('#e85c2c'),
    secondaryColor: text('secondary_color').default('#f8f5eb'),
    siteTitle: text('site_title'),
    siteDescription: text('site_description'),
    businessHours: text('business_hours'),
    address: text('address'),
    phone: text('phone'),
    email: text('email'),
    socialMedia: jsonb('social_media'),
    customDomain: text('custom_domain'),
    faviconUrl: text('favicon_url'),
    bannerImageUrl: text('banner_image_url'),
    footerText: text('footer_text'),
    metaDescription: text('meta_description'),
    googleAnalyticsId: text('google_analytics_id'),
    customDomainVerified: boolean('custom_domain_verified').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Menu Categories
export const menuCategories = pgTable('menu_categories', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    imageUrl: text('image_url'),
    displayOrder: integer('display_order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Menu Items
export const menuItems = pgTable('menu_items', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    categoryId: integer('category_id').references(() => menuCategories.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(), // Price in cents
    imageUrl: text('image_url'),
    isVegetarian: boolean('is_vegetarian').default(false),
    isVegan: boolean('is_vegan').default(false),
    isGlutenFree: boolean('is_gluten_free').default(false),
    spiceLevel: integer('spice_level'),
    preparationTime: integer('preparation_time'), // In minutes
    isActive: boolean('is_active').default(true),
    isFeatured: boolean('is_featured').default(false),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Inventory Items
export const inventoryItems = pgTable('inventory_items', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    sku: text('sku'),
    category: text('category'),
    unit: text('unit'),
    quantity: integer('quantity').default(0),
    reorderLevel: integer('reorder_level').default(10),
    costPerUnit: integer('cost_per_unit'), // Cost in cents
    supplier: text('supplier'),
    imageUrl: text('image_url'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    orderId: text('order_id').notNull(), // e.g. ORD-12345
    companyId: integer('company_id').references(() => users.id).notNull(),
    customerId: integer('customer_id').references(() => customers.id),
    status: text('status').notNull().default('created'), // created, in-progress, completed, cancelled
    orderType: text('order_type').notNull(), // dine-in, takeaway, delivery
    subtotal: integer('subtotal').notNull(), // In cents
    tax: integer('tax').notNull(), // In cents
    deliveryFee: integer('delivery_fee').default(0), // In cents
    total: integer('total').notNull(), // In cents
    paymentMethod: text('payment_method'), // cash, credit-card, online, etc.
    paymentStatus: text('payment_status').default('pending'), // pending, paid, failed
    transactionId: text('transaction_id'),
    notes: text('notes'),
    orderDate: timestamp('order_date').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Order Items table
export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').references(() => orders.id).notNull(),
    menuItemId: integer('menu_item_id').references(() => menuItems.id),
    name: text('name').notNull(), // Store the name directly in case menu item is deleted
    price: integer('price').notNull(), // In cents, store the price at time of order
    quantity: integer('quantity').notNull(),
    subtotal: integer('subtotal').notNull(), // In cents
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
});

// Order Status Timeline
export const orderTimeline = pgTable('order_timeline', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').references(() => orders.id).notNull(),
    status: text('status').notNull(),
    userId: integer('user_id').references(() => users.id), // Staff member who made the change
    timestamp: timestamp('timestamp').defaultNow().notNull(),
    notes: text('notes'),
});

// Customers table
export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Module Access Table - to control subscription-based access to different modules
export const moduleAccess = pgTable('module_access', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    moduleName: text('module_name').notNull(), // dashboard, order_management, inventory_management, etc.
    isEnabled: boolean('is_enabled').default(false),
    maxUsers: integer('max_users').default(1),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Restaurant Theme Settings
export const restaurantTheme = pgTable('restaurant_theme', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    fontFamily: text('font_family').default('Inter'),
    menuLayout: text('menu_layout').default('grid'),
    heroStyle: text('hero_style').default('centered'),
    accentColor: text('accent_color').default('#e85c2c'),
    buttonStyle: text('button_style').default('rounded'),
    customCSS: text('custom_css'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Loyalty Program Schema
export const loyaltyProgram = pgTable('loyalty_program', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull().default('Rewards Program'),
    description: text('description'),
    pointsPerDollar: integer('points_per_dollar').notNull().default(10),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const loyaltyTiers = pgTable('loyalty_tiers', {
    id: serial('id').primaryKey(),
    loyaltyProgramId: integer('loyalty_program_id').references(() => loyaltyProgram.id).notNull(),
    name: text('name').notNull(),
    minimumPoints: integer('minimum_points').notNull(),
    benefits: text('benefits'),
    color: text('color'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const customerLoyalty = pgTable('customer_loyalty', {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id').references(() => customers.id).notNull(),
    loyaltyProgramId: integer('loyalty_program_id').references(() => loyaltyProgram.id).notNull(),
    pointsBalance: integer('points_balance').notNull().default(0),
    lifetimePoints: integer('lifetime_points').notNull().default(0),
    tierId: integer('tier_id').references(() => loyaltyTiers.id),
    joinDate: timestamp('join_date').defaultNow(),
    lastActivity: timestamp('last_activity').defaultNow(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => {
    return {
        customerProgramUnique: unique().on(table.customerId, table.loyaltyProgramId),
    };
});

export const loyaltyTransactions = pgTable('loyalty_transactions', {
    id: serial('id').primaryKey(),
    customerLoyaltyId: integer('customer_loyalty_id').references(() => customerLoyalty.id).notNull(),
    points: integer('points').notNull(),
    type: text('type').notNull(), // earn, redeem, adjust, expire
    source: text('source').notNull(), // order, promotion, referral, manual, etc.
    sourceId: text('source_id'), // ID of the source (e.g., order_id)
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const loyaltyRewards = pgTable('loyalty_rewards', {
    id: serial('id').primaryKey(),
    loyaltyProgramId: integer('loyalty_program_id').references(() => loyaltyProgram.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    pointCost: integer('point_cost').notNull(),
    rewardType: text('reward_type').notNull(), // discount, free_item, gift_card, etc.
    rewardValue: integer('reward_value'), // value in cents for discounts/gift cards
    menuItemId: integer('menu_item_id').references(() => menuItems.id), // for free_item type
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const redeemedRewards = pgTable('redeemed_rewards', {
    id: serial('id').primaryKey(),
    customerLoyaltyId: integer('customer_loyalty_id').references(() => customerLoyalty.id).notNull(),
    rewardId: integer('reward_id').references(() => loyaltyRewards.id).notNull(),
    transactionId: integer('transaction_id').references(() => loyaltyTransactions.id).notNull(),
    code: text('code').notNull(),
    status: text('status').notNull().default('active'), // active, used, expired, revoked
    usedDate: timestamp('used_date'),
    expiryDate: timestamp('expiry_date'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Marketing System Schema
export const marketingCampaigns = pgTable('marketing_campaigns', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    type: text('type').notNull(), // email, sms, push
    status: text('status').notNull().default('draft'), // draft, scheduled, in_progress, paused, completed, cancelled
    audienceType: text('audience_type').notNull(), // all, loyalty_tier, custom_segment
    audienceFilter: jsonb('audience_filter'), // for custom segments
    loyaltyTierId: integer('loyalty_tier_id').references(() => loyaltyTiers.id), // for tier-specific campaigns
    scheduleDate: timestamp('schedule_date'),
    completedDate: timestamp('completed_date'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const emailTemplates = pgTable('email_templates', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    subject: text('subject').notNull(),
    content: text('content').notNull(),
    isDefault: boolean('is_default').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const campaignContent = pgTable('campaign_content', {
    id: serial('id').primaryKey(),
    campaignId: integer('campaign_id').references(() => marketingCampaigns.id).notNull(),
    templateId: integer('template_id').references(() => emailTemplates.id),
    subject: text('subject'),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const campaignDelivery = pgTable('campaign_delivery', {
    id: serial('id').primaryKey(),
    campaignId: integer('campaign_id').references(() => marketingCampaigns.id).notNull(),
    customerId: integer('customer_id').references(() => customers.id).notNull(),
    status: text('status').notNull().default('pending'), // pending, sent, delivered, opened, clicked, bounced, unsubscribed
    sentAt: timestamp('sent_at'),
    deliveredAt: timestamp('delivered_at'),
    openedAt: timestamp('opened_at'),
    clickedAt: timestamp('clicked_at'),
    trackingCode: text('tracking_code'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const promotions = pgTable('promotions', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    campaignId: integer('campaign_id').references(() => marketingCampaigns.id),
    name: text('name').notNull(),
    code: text('code').notNull(),
    type: text('type').notNull(), // percent_off, amount_off, free_item, bogo
    value: integer('value'), // amount in cents or percent
    menuItemId: integer('menu_item_id').references(() => menuItems.id), // for free_item type
    minimumOrder: integer('minimum_order'), // minimum order amount in cents
    maximumDiscount: integer('maximum_discount'), // maximum discount amount in cents
    isFirstOrderOnly: boolean('is_first_order_only').default(false),
    isOneTimeUse: boolean('is_one_time_use').default(false),
    isActive: boolean('is_active').notNull().default(true),
    startDate: timestamp('start_date'),
    endDate: timestamp('end_date'),
    usageLimit: integer('usage_limit'), // max number of times this code can be used
    usageCount: integer('usage_count').default(0), // number of times this code has been used
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const promotionUsage = pgTable('promotion_usage', {
    id: serial('id').primaryKey(),
    promotionId: integer('promotion_id').references(() => promotions.id).notNull(),
    orderId: integer('order_id').references(() => orders.id).notNull(),
    customerId: integer('customer_id').references(() => customers.id).notNull(),
    amount: integer('amount').notNull(), // discount amount in cents
    createdAt: timestamp('created_at').defaultNow(),
});

// Inventory Management System
export const inventoryCategories = pgTable('inventory_categories', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const suppliers = pgTable('suppliers', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    contactName: text('contact_name'),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    website: text('website'),
    notes: text('notes'),
    isActive: boolean('is_active').notNull().default(true),
    paymentTerms: text('payment_terms'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Update inventoryItems with new fields
// Note: This is not a new table, just updating the existing definition
export const inventoryBatches = pgTable('inventory_batches', {
    id: serial('id').primaryKey(),
    inventoryItemId: integer('inventory_item_id').references(() => inventoryItems.id).notNull(),
    batchNumber: text('batch_number'),
    quantity: integer('quantity').notNull(),
    costPerUnit: integer('cost_per_unit'),
    expiryDate: timestamp('expiry_date'),
    receivedDate: timestamp('received_date').notNull().defaultNow(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const purchaseOrders = pgTable('purchase_orders', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    supplierId: integer('supplier_id').references(() => suppliers.id).notNull(),
    poNumber: text('po_number').notNull(),
    status: text('status').notNull().default('draft'), // draft, submitted, partial, received, cancelled
    orderDate: timestamp('order_date'),
    expectedDeliveryDate: timestamp('expected_delivery_date'),
    deliveryDate: timestamp('delivery_date'),
    subtotal: integer('subtotal'), // in cents
    tax: integer('tax'), // in cents
    shipping: integer('shipping'), // in cents
    total: integer('total'), // in cents
    notes: text('notes'),
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const purchaseOrderItems = pgTable('purchase_order_items', {
    id: serial('id').primaryKey(),
    purchaseOrderId: integer('purchase_order_id').references(() => purchaseOrders.id).notNull(),
    inventoryItemId: integer('inventory_item_id').references(() => inventoryItems.id).notNull(),
    quantity: integer('quantity').notNull(),
    unitCost: integer('unit_cost').notNull(), // in cents
    receivedQuantity: integer('received_quantity').default(0),
    subtotal: integer('subtotal').notNull(), // in cents
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const inventoryTransactions = pgTable('inventory_transactions', {
    id: serial('id').primaryKey(),
    inventoryItemId: integer('inventory_item_id').references(() => inventoryItems.id).notNull(),
    batchId: integer('batch_id').references(() => inventoryBatches.id),
    quantity: integer('quantity').notNull(), // positive for additions, negative for deductions
    transactionType: text('transaction_type').notNull(), // purchase, sale, adjustment, waste, transfer
    referenceId: text('reference_id'), // PO number, order number, etc.
    notes: text('notes'),
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});

export const recipeIngredients = pgTable('recipe_ingredients', {
    id: serial('id').primaryKey(),
    menuItemId: integer('menu_item_id').references(() => menuItems.id).notNull(),
    inventoryItemId: integer('inventory_item_id').references(() => inventoryItems.id).notNull(),
    quantity: text('quantity').notNull(), // Using text to store decimal values like DECIMAL(10,2)
    unit: text('unit').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => {
    return {
        menuItemIngredientUnique: unique().on(table.menuItemId, table.inventoryItemId),
    };
});

// Analytics and Reporting System
export const salesAnalytics = pgTable('sales_analytics', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    date: timestamp('date').notNull(),
    totalSales: integer('total_sales').notNull(), // in cents
    orderCount: integer('order_count').notNull(),
    averageOrderValue: integer('average_order_value').notNull(), // in cents
    menuCategoryBreakdown: jsonb('menu_category_breakdown'),
    orderTypeBreakdown: jsonb('order_type_breakdown'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const customerAnalytics = pgTable('customer_analytics', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    date: timestamp('date').notNull(),
    newCustomers: integer('new_customers').notNull(),
    returningCustomers: integer('returning_customers').notNull(),
    totalCustomers: integer('total_customers').notNull(),
    loyaltySignups: integer('loyatly_signups').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const inventoryAnalytics = pgTable('inventory_analytics', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    date: timestamp('date').notNull(),
    totalValue: integer('total_value').notNull(), // in cents
    lowStockCount: integer('low_stock_count').notNull(),
    outOfStockCount: integer('out_of_stock_count').notNull(),
    wasteValue: integer('waste_value').notNull().default(0), // in cents
    categoryBreakdown: jsonb('category_breakdown'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const staffPerformance = pgTable('staff_performance', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    userId: integer('user_id').references(() => users.id).notNull(),
    date: timestamp('date').notNull(),
    ordersProcessed: integer('orders_processed').notNull().default(0),
    salesTotal: integer('sales_total').notNull().default(0), // in cents
    hoursWorked: text('hours_worked').notNull().default('0'), // Using text to store DECIMAL(5,2)
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const savedReports = pgTable('saved_reports', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    reportType: text('report_type').notNull(), // sales, inventory, customers, staff, custom
    parameters: jsonb('parameters').notNull(),
    lastRun: timestamp('last_run'),
    schedule: text('schedule'), // daily, weekly, monthly, etc.
    recipients: jsonb('recipients'), // array of email addresses
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const dashboardWidgets = pgTable('dashboard_widgets', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id).notNull(),
    userId: integer('user_id').references(() => users.id).notNull(),
    widgetType: text('widget_type').notNull(), // sales_chart, inventory_status, etc.
    title: text('title').notNull(),
    config: jsonb('config').notNull(),
    position: integer('position').notNull(),
    size: text('size').notNull().default('medium'), // small, medium, large
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Restaurant Tables schema
export const restaurantTables = pgTable('restaurant_tables', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id').references(() => users.id),
    tableNumber: integer('table_number').notNull(),
    capacity: integer('capacity').notNull(),
    location: text('location'), // e.g., "main floor", "patio", "bar area"
    shape: text('shape').default('rectangle'), // rectangle, square, round, oval
    status: text('status').default('available'), // available, reserved, occupied, unavailable
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Table Reservations schema
export const tableReservations = pgTable('table_reservations', {
    id: serial('id').primaryKey(),
    tableId: integer('table_id').references(() => restaurantTables.id),
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email'),
    customerPhone: text('customer_phone').notNull(),
    partySize: integer('party_size').notNull(),
    reservationDate: timestamp('reservation_date').notNull(),
    startTime: text('start_time').notNull(), // e.g. "18:00"
    endTime: text('end_time').notNull(), // e.g. "20:00"
    duration: integer('duration').default(120), // in minutes
    status: text('status').default('confirmed'), // confirmed, seated, completed, cancelled, no-show
    source: text('source').default('website'), // website, phone, walk-in, third-party
    specialRequests: text('special_requests'),
    notes: text('notes'),
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Table Availability Time Slots
export const tableTimeSlots = pgTable('table_time_slots', {
    id: serial('id').primaryKey(),
    dayOfWeek: integer('day_of_week').notNull(), // 0-6 (Sunday-Saturday)
    openTime: text('open_time').notNull(), // e.g. "11:00"
    closeTime: text('close_time').notNull(), // e.g. "22:00"
    slotDuration: integer('slot_duration').default(30), // in minutes
    maxReservationsPerSlot: integer('max_reservations').default(1),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Table Layouts/Floor Plans
export const tableLayouts = pgTable('table_layouts', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    layoutData: jsonb('layout_data'), // JSON data for floor plan
    isDefault: boolean('is_default').default(false),
    isActive: boolean('is_active').default(true),
    createdBy: integer('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}); 