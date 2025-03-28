import { pgTable, serial, text, varchar, timestamp, integer, boolean, foreignKey } from 'drizzle-orm/pg-core';

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