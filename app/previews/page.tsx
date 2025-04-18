'use client';

import PreviewManager from '@/components/PreviewManager';

export default function PreviewsPage() {
    // Example preview URLs - replace these with your actual preview URLs
    const previewUrls = [
        'https://example.com/preview1',
        'https://example.com/preview2',
        'https://example.com/preview3',
        'https://example.com/preview4'
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Preview Dashboard</h1>
            <p className="mb-6 text-gray-600">
                This dashboard allows you to view and refresh multiple previews simultaneously.
            </p>

            <PreviewManager previewUrls={previewUrls} />
        </div>
    );
} 