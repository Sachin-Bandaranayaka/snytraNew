"use client";

import { ReactNode, useEffect } from "react";
import { RestaurantThemeProvider } from "@/context/restaurant-theme-context";
import Script from "next/script";

export default function PreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  const restaurantSlug = "preview";

  useEffect(() => {
    // Mark the window as a preview window
    if (typeof window !== 'undefined') {
      window.isPreviewWindow = true;
    }
  }, []);

  return (
    <RestaurantThemeProvider restaurantSlug={restaurantSlug}>
      <Script src="/preview-refresher.js" strategy="beforeInteractive" />
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </RestaurantThemeProvider>
  );
} 