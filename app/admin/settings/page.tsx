import React from 'react';
import { db } from '@/lib/db';
import { systemSettings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';
import SettingsForm from './settings-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Admin | Site Settings',
    description: 'Manage site settings',
};

// Fetch the settings data from the database
async function getSettings() {
    try {
        const settings = await db.select().from(systemSettings);
        return { settings, error: null };
    } catch (error) {
        console.error('Error fetching settings:', error);
        return { settings: [], error };
    }
}

export default async function AdminSettingsPage() {
    const { settings, error } = await getSettings();

    // If there's an error (likely the table doesn't exist yet), show guidance
    if (error) {
        return (
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 mb-6">
                        <h3 className="text-lg font-medium mb-2">Database Setup Required</h3>
                        <p className="mb-4">
                            The system_settings table doesn't exist in your database yet. This is likely because the migration hasn't been run.
                        </p>
                        <p className="mb-2">To fix this issue:</p>
                        <ol className="list-decimal pl-5 mb-4 space-y-1">
                            <li>Make sure your database connection is properly configured in .env.local</li>
                            <li>Run the migration script: <code className="bg-yellow-100 px-1 py-0.5 rounded">node --experimental-json-modules scripts/migrate-settings.js</code></li>
                            <li>Refresh this page after the migration completes</li>
                        </ol>
                        <p>
                            If you continue to see this message after running the migration, there might be an issue with your database connection.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Button asChild>
                            <Link href="/admin">Return to Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Group settings by category
    const groupedSettings = settings.reduce((groups: Record<string, any[]>, setting) => {
        const category = setting.category || 'general';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(setting);
        return groups;
    }, {});

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
                <p className="text-gray-600">
                    Manage your site configuration and features
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <SettingsForm
                    settings={settings}
                    groupedSettings={groupedSettings}
                />
            </div>
        </div>
    );
} 