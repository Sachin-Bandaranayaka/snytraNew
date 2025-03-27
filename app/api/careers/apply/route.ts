import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobApplications } from '@/lib/schema';
import { z } from 'zod';

// Input validation schema
const applicationSchema = z.object({
    jobId: z.string(),
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    resumeUrl: z.string().optional(),
    coverLetter: z.string().optional(),
    experienceYears: z.number().optional(),
    howDidYouHear: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input data
        const validation = applicationSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.format() },
                { status: 400 }
            );
        }

        const applicationData = validation.data;

        // Insert job application into database
        const result = await db.insert(jobApplications).values({
            ...applicationData,
            status: 'submitted',
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning({ id: jobApplications.id });

        // Return success response
        return NextResponse.json({
            message: 'Application submitted successfully',
            applicationId: result[0].id
        }, { status: 201 });

    } catch (error) {
        console.error('Job application error:', error);
        return NextResponse.json(
            { error: 'Something went wrong during application submission' },
            { status: 500 }
        );
    }
} 