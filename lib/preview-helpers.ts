/**
 * Utility functions for managing preview window refreshes
 */

/**
 * Triggers a refresh in all preview windows
 */
export function refreshAllPreviews(): void {
    // Use localStorage to trigger refresh in other tabs/windows
    localStorage.setItem('previewRefresh', Date.now().toString());

    // Find any preview iframes in the current page and refresh them directly
    const previewIframes = document.querySelectorAll('iframe.preview-frame');
    previewIframes.forEach(iframe => {
        try {
            // Try to refresh via postMessage
            (iframe as HTMLIFrameElement).contentWindow?.postMessage('refreshPreview', window.location.origin);
        } catch (e) {
            console.error('Failed to refresh preview iframe:', e);
        }
    });
}

/**
 * Sets up a listener for preview iframe ready messages
 * @param callback Function to call when a preview iframe is ready
 */
export function listenForPreviewReady(callback: () => void): () => void {
    const handler = (event: MessageEvent) => {
        if (event.data === 'previewReady') {
            callback();
        }
    };

    window.addEventListener('message', handler);

    // Return cleanup function
    return () => window.removeEventListener('message', handler);
} 