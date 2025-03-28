import React from 'react';
import { db } from '@/lib/db';
import { systemSettings } from '@/lib/schema';
import { eq } from 'drizzle-orm';

async function getMaintenanceMessage() {
    try {
        const messageSetting = await db
            .select()
            .from(systemSettings)
            .where(eq(systemSettings.key, 'maintenance_message'));

        return messageSetting.length > 0
            ? messageSetting[0].value
            : 'We are currently performing scheduled maintenance. Please check back soon.';
    } catch (error) {
        console.error('Error getting maintenance message:', error);
        return 'We are currently performing scheduled maintenance. Please check back soon.';
    }
}

export default async function MaintenancePage() {
    const message = await getMaintenanceMessage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-primary p-4 text-white text-center">
                    <h1 className="text-2xl font-bold">Site Maintenance</h1>
                </div>
                <div className="p-6">
                    <div className="mb-6 flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-20 h-20 text-primary"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-700 text-center mb-6">
                        {message}
                    </p>
                    <div className="text-sm text-gray-500 text-center">
                        If you believe this is an error, please contact our support team.
                    </div>
                </div>
            </div>
        </div>
    );
} 