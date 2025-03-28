// Script to create carousel_images and testimonials tables

import postgres from 'postgres';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
config({ path: '.env.local' });
config({ path: '.env' });

// Get database connection string
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined in environment variables');
    process.exit(1);
}

// Connect to the database
const sql = postgres(DATABASE_URL);

async function main() {
    try {
        console.log('Checking if carousel_images table exists...');
        const carouselTableExists = await sql`
            SELECT EXISTS (
                SELECT 1 FROM information_schema.tables 
                WHERE table_name = 'carousel_images'
            );
        `;

        console.log('Checking if testimonials table exists...');
        const testimonialsTableExists = await sql`
            SELECT EXISTS (
                SELECT 1 FROM information_schema.tables 
                WHERE table_name = 'testimonials'
            );
        `;

        // Create carousel_images table if it doesn't exist
        if (!carouselTableExists[0].exists) {
            console.log('Creating carousel_images table...');
            await sql`
                CREATE TABLE carousel_images (
                    id SERIAL PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT,
                    image_src TEXT NOT NULL,
                    alt_text TEXT,
                    carousel_type TEXT NOT NULL,
                    "order" INTEGER DEFAULT 0,
                    is_active BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMPTZ DEFAULT NOW(),
                    updated_at TIMESTAMPTZ DEFAULT NOW(),
                    created_by INTEGER REFERENCES users(id),
                    updated_by INTEGER REFERENCES users(id)
                );
            `;
            console.log('carousel_images table created successfully!');
        } else {
            console.log('carousel_images table already exists. Skipping creation.');
        }

        // Create testimonials table if it doesn't exist
        if (!testimonialsTableExists[0].exists) {
            console.log('Creating testimonials table...');
            await sql`
                CREATE TABLE testimonials (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    role TEXT NOT NULL,
                    quote TEXT NOT NULL,
                    image_src TEXT,
                    "order" INTEGER DEFAULT 0,
                    is_active BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMPTZ DEFAULT NOW(),
                    updated_at TIMESTAMPTZ DEFAULT NOW(),
                    created_by INTEGER REFERENCES users(id),
                    updated_by INTEGER REFERENCES users(id)
                );
            `;
            console.log('testimonials table created successfully!');
        } else {
            console.log('testimonials table already exists. Skipping creation.');
        }

        // Seed with initial data
        const initialCarouselImages = [
            {
                title: 'Order Management & Analytics',
                description: 'Track orders in real-time, manage deliveries, and get insights into your restaurant\'s performance with powerful analytics dashboards.',
                image_src: '/admin1.png',
                alt_text: 'Admin Dashboard View 1',
                carousel_type: 'admin-dashboard',
                order: 0
            },
            {
                title: 'Menu Performance Tracking',
                description: 'Identify your top-selling items, analyze profit margins, and optimize your menu based on data-driven insights.',
                image_src: '/admin2.png',
                alt_text: 'Admin Dashboard View 2',
                carousel_type: 'admin-dashboard',
                order: 1
            },
            {
                title: 'Customer Waiting List',
                description: 'Efficiently manage table assignments, track waiting times, and ensure a smooth dining experience for your customers.',
                image_src: '/admin3.png',
                alt_text: 'Admin Dashboard View 3',
                carousel_type: 'admin-dashboard',
                order: 2
            },
            {
                title: 'Order Metrics',
                description: 'Track orders in real-time with comprehensive metrics dashboard',
                image_src: '/admin1.png',
                alt_text: 'Admin Dashboard View 1',
                carousel_type: 'order-management',
                order: 0
            },
            {
                title: 'Menu Management',
                description: 'Analyze your top-performing menu items and optimize your offerings',
                image_src: '/admin2.png',
                alt_text: 'Admin Dashboard View 2',
                carousel_type: 'order-management',
                order: 1
            },
            {
                title: 'Customer Management',
                description: 'Efficiently manage your waiting list and ensure a smooth customer experience',
                image_src: '/admin3.png',
                alt_text: 'Admin Dashboard View 3',
                carousel_type: 'order-management',
                order: 2
            }
        ];

        // Initial testimonials
        const initialTestimonials = [
            {
                name: 'Michael Johnson',
                role: 'Restaurant Owner',
                quote: 'This platform has transformed the way we manage reservations. Our bookings have increased by 30% and the interface is intuitive for both staff and customers.',
                image_src: null,
                order: 0
            },
            {
                name: 'Sarah Chen',
                role: 'Cafe Manager',
                quote: 'The order management system has streamlined our operations completely. What used to take hours now takes minutes, and we\'ve seen customer satisfaction improve dramatically.',
                image_src: null,
                order: 1
            },
            {
                name: 'David Rodriguez',
                role: 'Restaurant Chain Director',
                quote: 'Managing multiple locations has never been easier. The analytics provide valuable insights that have helped us optimize staffing and inventory across all our restaurants.',
                image_src: null,
                order: 2
            }
        ];

        // Insert initial carousel images if none exist
        const existingCarouselImages = await sql`SELECT COUNT(*) FROM carousel_images`;
        if (existingCarouselImages[0].count === 0) {
            console.log('Seeding initial carousel images...');
            for (const image of initialCarouselImages) {
                await sql`
                    INSERT INTO carousel_images (title, description, image_src, alt_text, carousel_type, "order")
                    VALUES (${image.title}, ${image.description}, ${image.image_src}, ${image.alt_text}, ${image.carousel_type}, ${image.order})
                `;
            }
            console.log('Initial carousel images seeded successfully!');
        }

        // Insert initial testimonials if none exist
        const existingTestimonials = await sql`SELECT COUNT(*) FROM testimonials`;
        if (existingTestimonials[0].count === 0) {
            console.log('Seeding initial testimonials...');
            for (const testimonial of initialTestimonials) {
                await sql`
                    INSERT INTO testimonials (name, role, quote, image_src, "order")
                    VALUES (${testimonial.name}, ${testimonial.role}, ${testimonial.quote}, ${testimonial.image_src}, ${testimonial.order})
                `;
            }
            console.log('Initial testimonials seeded successfully!');
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        await sql.end();
    }
}

main(); 