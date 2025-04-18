'use client';

import { useState } from 'react';
import PreviewManager from '@/components/PreviewManager';

export default function PreviewDemoPage() {
    const defaultUrls = [
        'https://example.com',
        'https://www.google.com'
    ];

    const [urls, setUrls] = useState<string[]>(defaultUrls);
    const [newUrl, setNewUrl] = useState('');

    const handleAddUrl = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUrl && !urls.includes(newUrl)) {
            setUrls([...urls, newUrl]);
            setNewUrl('');
        }
    };

    const handleRemoveUrl = (url: string) => {
        setUrls(urls.filter(u => u !== url));
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Preview Manager Demo</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Manage Preview URLs</h2>

                <form onSubmit={handleAddUrl} className="flex gap-2 mb-4">
                    <input
                        type="url"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="Enter URL (https://...)"
                        className="flex-1 px-3 py-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Add URL
                    </button>
                </form>

                <div className="space-y-2">
                    {urls.map(url => (
                        <div key={url} className="flex justify-between items-center p-2 border rounded">
                            <span className="truncate">{url}</span>
                            <button
                                onClick={() => handleRemoveUrl(url)}
                                className="ml-2 text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <PreviewManager urls={urls} />
            </div>
        </div>
    );
} 