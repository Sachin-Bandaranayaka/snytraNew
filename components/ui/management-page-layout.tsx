"use client"

import React from "react"

interface ManagementPageLayoutProps {
    children: React.ReactNode
    title: string
    description?: string
    headerAction?: React.ReactNode
}

export function ManagementPageLayout({
    children,
    title,
    description,
    headerAction,
}: ManagementPageLayoutProps) {
    return (
        <div className="bg-orange-50/50 min-h-screen">
            <div className="container mx-auto py-6 px-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                        {description && (
                            <p className="text-gray-500 mt-1">{description}</p>
                        )}
                    </div>
                    {headerAction && <div>{headerAction}</div>}
                </div>
                {children}
            </div>
        </div>
    )
}

// Button styles consistent with the orange theme
export function PrimaryButton({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`px-4 py-2 bg-[#e85c2c] hover:bg-[#d04d20] text-white rounded-md transition-colors ${className || ""}`}
            {...props}
        >
            {children}
        </button>
    )
}

export function SecondaryButton({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md transition-colors ${className || ""}`}
            {...props}
        >
            {children}
        </button>
    )
}

export function Card({
    children,
    className,
    title,
}: {
    children: React.ReactNode
    className?: string
    title?: string
}) {
    return (
        <div className={`bg-white rounded-lg shadow p-6 ${className || ""}`}>
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            {children}
        </div>
    )
}

export function LoadingSpinner({ className }: { className?: string }) {
    return (
        <div className={`flex justify-center items-center ${className || ""}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e85c2c]"></div>
        </div>
    )
}

export function Badge({
    children,
    variant = "default",
    className,
}: {
    children: React.ReactNode
    variant?: "default" | "success" | "warning" | "error"
    className?: string
}) {
    const variantClasses = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-orange-100 text-orange-800",
        error: "bg-red-100 text-red-800",
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${variantClasses[variant]} ${className || ""}`}>
            {children}
        </span>
    )
} 