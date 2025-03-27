import { pgTable, serial, text, varchar, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password'), // Hashed password
    role: text('role').default('user'), // user, admin, etc.
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