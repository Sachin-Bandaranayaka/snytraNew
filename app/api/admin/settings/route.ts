import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { systemSettings } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const key = searchParams.get('key');
        const category = searchParams.get('category');

        let query = db.select().from(systemSettings);

        if (key) {
            query = query.where(eq(systemSettings.key, key));
        }

        if (category) {
            query = query.where(eq(systemSettings.category, category));
        }

        const settings = await query;

        // Convert to key:value format if requested
        const format = searchParams.get('format');
        if (format === 'keyValue') {
            const keyValueSettings = settings.reduce((acc, setting) => {
                acc[setting.key] = setting.value;
                return acc;
            }, {} as Record<string, string>);

            return NextResponse.json({ success: true, settings: keyValueSettings });
        }

        return NextResponse.json({ success: true, settings });
    } catch (error) {
        console.error('Error getting settings:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to get settings' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { key, value, description, category, userId } = body;

        if (!key || value === undefined) {
            return NextResponse.json(
                { success: false, message: 'Key and value are required' },
                { status: 400 }
            );
        }

        // Check if setting exists
        const existingSetting = await db
            .select()
            .from(systemSettings)
            .where(eq(systemSettings.key, key));

        if (existingSetting.length > 0) {
            // Update existing setting
            await db
                .update(systemSettings)
                .set({
                    value,
                    description: description || existingSetting[0].description,
                    category: category || existingSetting[0].category,
                    updatedBy: userId || null,
                    updatedAt: new Date(),
                })
                .where(eq(systemSettings.key, key));

            const updated = await db
                .select()
                .from(systemSettings)
                .where(eq(systemSettings.key, key));

            return NextResponse.json({
                success: true,
                message: 'Setting updated successfully',
                setting: updated[0]
            });
        } else {
            // Create new setting
            const newSetting = await db
                .insert(systemSettings)
                .values({
                    key,
                    value,
                    description,
                    category: category || 'general',
                    updatedBy: userId || null,
                })
                .returning();

            return NextResponse.json({
                success: true,
                message: 'Setting created successfully',
                setting: newSetting[0]
            });
        }
    } catch (error) {
        console.error('Error updating setting:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update setting' },
            { status: 500 }
        );
    }
} 