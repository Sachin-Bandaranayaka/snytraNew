"use client";

import { useEffect, useRef, useState } from "react";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";
import RestaurantHome from "@/app/[restaurant]/page";
import { useSearchParams } from "next/navigation";

export default function PreviewPage() {
  const { isLoading, refreshTheme, settings, theme } = useRestaurantTheme();
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoadedRef = useRef<boolean>(false);
  const searchParams = useSearchParams();
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(Date.now());

  // Set up listeners for various refresh signals
  useEffect(() => {
    // Function to force refresh theme data
    const forceRefresh = () => {
      console.log("Force refreshing theme data at", new Date().toISOString());
      refreshTheme();
      setLastRefreshTime(Date.now());
    };

    // Poll-based refresh with shorter interval (2s) for more responsive updates
    const pollRefresh = () => {
      refreshTheme();
      refreshTimerRef.current = setTimeout(pollRefresh, 2000);
    };

    // Handle localStorage-based refresh
    const handleStorageChange = (event) => {
      if (event.key === 'snytra_preview_refresh') {
        console.log("Storage-based refresh triggered");
        forceRefresh();
      }
    };

    // Handle postMessage-based refresh (from parent window)
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'RELOAD_PREVIEW') {
        console.log("PostMessage-based refresh triggered");
        forceRefresh();
      }
    };

    // Check URL parameters for cache busting
    const cacheBust = searchParams.get('cache_bust');
    if (cacheBust && parseInt(cacheBust) > lastRefreshTime) {
      console.log("URL cache bust parameter detected:", cacheBust);
      forceRefresh();
    }

    // Add all event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('message', handleMessage);

    // Initial setup
    if (!hasLoadedRef.current) {
      console.log("Initial preview load, starting poll refresh");
      pollRefresh();
      hasLoadedRef.current = true;
    }

    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [refreshTheme, searchParams, lastRefreshTime]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e85c2c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your restaurant preview...</p>
          <p className="text-sm text-gray-500 mt-2">This is a development preview of your restaurant website</p>
          <p className="text-xs text-gray-400 mt-1">Last refreshed: {new Date(lastRefreshTime).toLocaleTimeString()}</p>
        </div>
      </div>
    );
  }

  // Once loaded, render the actual restaurant homepage
  return (
    <div className="preview-container" data-last-refresh={lastRefreshTime}>
      <RestaurantHome />

      {/* Debug info overlay that can be toggled */}
      <div className="fixed bottom-2 right-2 bg-black/70 text-white text-xs p-2 rounded pointer-events-none">
        Preview · Last refreshed: {new Date(lastRefreshTime).toLocaleTimeString()}
      </div>
    </div>
  );
}