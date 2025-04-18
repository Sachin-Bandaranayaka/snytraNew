'use client';

import { useState } from 'react';
import PreviewFrame from './PreviewFrame';

interface PreviewManagerProps {
    urls: string[];
}

export default function PreviewManager({ urls }: PreviewManagerProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [refreshKeys, setRefreshKeys] = useState<Record<number, number>>({});
    const [loadingFrames, setLoadingFrames] = useState<Record<number, boolean>>(
        Object.fromEntries(urls.map((_, i) => [i, true]))
    );

    const handleRefresh = (index: number) => {
        setRefreshKeys(prev => ({
            ...prev,
            [index]: (prev[index] || 0) + 1
        }));
        setLoadingFrames(prev => ({
            ...prev,
            [index]: true
        }));
    };

    const handleFrameReady = (index: number) => {
        setLoadingFrames(prev => ({
            ...prev,
            [index]: false
        }));
    };

    const refreshAllFrames = () => {
        urls.forEach((_, index) => {
            handleRefresh(index);
        });
    };

    // Check if we have any URLs to display
    if (urls.length === 0) {
        return (
            <div className="p-8 text-center border rounded bg-gray-50">
                <p className="text-gray-500">No URLs to preview. Add some URLs to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Preview</h3>
                <button
                    onClick={refreshAllFrames}
                    className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                    Refresh All
                </button>
            </div>

            {/* Tabs for each URL */}
            <div className="flex overflow-x-auto border-b">
                {urls.map((url, index) => (
                    <button
                        key={url}
                        onClick={() => setActiveIndex(index)}
                        className={`px-4 py-2 text-sm whitespace-nowrap relative ${activeIndex === index
                                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        {new URL(url).hostname}
                        {loadingFrames[index] && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Preview Frames */}
            <div className="h-[500px]">
                {urls.map((url, index) => (
                    <div
                        key={url}
                        className={index === activeIndex ? 'block h-full' : 'hidden'}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                {url}
                            </a>
                            <button
                                onClick={() => handleRefresh(index)}
                                className="p-1 text-sm text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                        <PreviewFrame
                            url={url}
                            refreshKey={refreshKeys[index] || 0}
                            onReady={() => handleFrameReady(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
} 