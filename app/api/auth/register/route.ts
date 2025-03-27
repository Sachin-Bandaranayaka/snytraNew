import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, companies } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';

// Input validation schema
const companySchema = z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    industry: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    businessSize: z.string().optional(),
    numberOfLocations: z.number().optional(),
    taxId: z.string().optional(),
    businessRegistration: z.string().optional(),
    expectedOrderVolume: z.string().optional(),
});

const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    jobTitle: z.string().optional(),
    phoneNumber: z.string().optional(),
    twoFactorEnabled: z.boolean().optional().default(false),
    company: companySchema,
    acceptedTerms: z.boolean().refine(val => val === true, {
        message: 'You must accept the terms and conditions'
    }),
    subscriptionPlan: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input data
        const validation = userSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const {
            name,
            email,
            password,
            jobTitle,
            phoneNumber,
            twoFactorEnabled,
            company,
            acceptedTerms,
            subscriptionPlan
        } = validation.data;

        // Check if user with email already exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create company first
        const companyResult = await db.insert(companies).values({
            name: company.name,
            industry: company.industry,
            address: company.address,
            city: company.city,
            state: company.state,
            postalCode: company.postalCode,
            country: company.country,
            businessSize: company.businessSize,
            numberOfLocations: company.numberOfLocations,
            taxId: company.taxId,
            businessRegistration: company.businessRegistration,
            expectedOrderVolume: company.expectedOrderVolume,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning({ id: companies.id });

        const companyId = companyResult[0].id;

        // Create user with reference to company
        const userResult = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            companyId,
            jobTitle,
            phoneNumber,
            twoFactorEnabled,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            companyId: users.companyId
        });

        // Return success response with user data (excluding password)
        return NextResponse.json({
            message: 'User registered successfully',
            user: userResult[0],
            companyId
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Something went wrong during registration' },
            { status: 500 }
        );
    }
} 