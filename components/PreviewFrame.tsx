'use client';

import { useState, useEffect, useRef } from 'react';

interface PreviewFrameProps {
    url: string;
    refreshKey: number;
    onReady: () => void;
}

export default function PreviewFrame({ url, refreshKey, onReady }: PreviewFrameProps) {
    const [loading, setLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Reset loading state when refresh key changes
        setLoading(true);

        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            setLoading(false);
            onReady();
        };

        iframe.addEventListener('load', handleLoad);

        return () => {
            iframe.removeEventListener('load', handleLoad);
        };
    }, [refreshKey, onReady]);

    return (
        <div className="relative w-full h-full min-h-[300px] border rounded overflow-hidden">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                        <p className="mt-2 text-sm text-gray-600">Loading preview...</p>
                    </div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                src={`${url}?refresh=${refreshKey}`}
                className="w-full h-full min-h-[300px]"
                title={`Preview of ${url}`}
            />
        </div>
    );
} 