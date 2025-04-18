/**
 * Preview Refresher Script
 * 
 * This script helps ensure that the preview window responds to refresh signals
 * from the management interface.
 */

(function() {
  if (typeof window === 'undefined') return;

  console.log('Preview refresher initialized');
  
  // Listen for localStorage changes from the management page
  window.addEventListener('storage', function(event) {
    if (event.key === 'previewRefresh') {
      console.log('Refresh triggered via localStorage');
      window.location.reload();
    }
  });

  // Listen for direct messages from parent window
  window.addEventListener('message', function(event) {
    // Check if message is from our own origin for security
    if (event.origin === window.location.origin) {
      if (event.data === 'refreshPreview') {
        console.log('Refresh triggered via postMessage');
        window.location.reload();
      }
    }
  });

  // Mark that we're ready to receive refresh signals
  if (window.parent !== window) {
    // We're in an iframe, notify parent we're ready
    try {
      window.parent.postMessage('previewReady', '*');
    } catch (e) {
      console.error('Failed to notify parent window', e);
    }
  }
})(); 