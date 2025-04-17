"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loading } from "@/components/ui/loading"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Bell, CheckCheck } from "lucide-react"

interface NavbarProps {
    onMobileMenuToggle?: () => void;
    isMobileMenuOpen?: boolean;
    showMenuToggle?: boolean;
}

interface Notification {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    read: boolean;
}

export default function DashboardNavbar({
    onMobileMenuToggle,
    isMobileMenuOpen,
    showMenuToggle = true
}: NavbarProps) {
    const { user, logout } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [notificationsLoading, setNotificationsLoading] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        if (user) {
            setIsLoading(false)
            fetchNotifications()
        }
    }, [user])

    const fetchNotifications = async () => {
        if (!user?.id) return

        try {
            setNotificationsLoading(true)
            const response = await fetch(`/api/user/notifications?userId=${user.id}`)

            if (response.ok) {
                const data = await response.json()
                if (data.notifications && Array.isArray(data.notifications)) {
                    setNotifications(data.notifications)
                    // Count unread notifications
                    const unread = data.notifications.filter((n: Notification) => !n.read).length
                    setUnreadCount(unread)
                }
            } else {
                console.error("Failed to fetch notifications:", await response.text())
            }
        } catch (error) {
            console.error("Error fetching notifications:", error)
        } finally {
            setNotificationsLoading(false)
        }
    }

    const markAsRead = async (notificationId: number) => {
        // In a real app, you would call an API endpoint to mark as read in the database
        try {
            // Update the local state
            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            )

            // Update unread count
            setUnreadCount(prev => Math.max(0, prev - 1))

            // Call the API endpoint
            await fetch(`/api/user/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error("Error marking notification as read:", error)
        }
    }

    const markAllAsRead = async () => {
        // In a real app, you would call an API endpoint to mark all as read
        try {
            // Update the local state
            setNotifications(prev =>
                prev.map(notification => ({ ...notification, read: true }))
            )

            // Reset unread count
            setUnreadCount(0)

            // Call the API endpoint
            await fetch(`/api/user/notifications`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id })
            })
        } catch (error) {
            console.error("Error marking all notifications as read:", error)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
            window.location.href = "/signin"
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    const getUserInitials = () => {
        if (!user || !user.name) return "U"
        return user.name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    // Format time ago for notifications
    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMinutes = Math.floor(diffMs / (1000 * 60))

        if (diffDays > 7) {
            return date.toLocaleDateString()
        } else if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
        } else {
            return 'Just now'
        }
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center">
                    {/* Mobile menu button - only show when sidebar is enabled */}
                    {showMenuToggle && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={onMobileMenuToggle}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    )}

                    <Link href="/dashboard" className="flex items-center">
                        <Image src="/logo.png" alt="Snytra Logo" width={120} height={40} className="mr-2" />
                        <span className="text-xl font-semibold hidden md:inline-block">Snytra</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="block w-full p-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                            placeholder="Search..."
                        />
                    </div>

                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel className="font-normal flex justify-between items-center">
                                <span>Notifications</span>
                                {unreadCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={markAllAsRead}
                                        className="h-8 text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                    >
                                        <CheckCheck className="h-3 w-3" />
                                        Mark all as read
                                    </Button>
                                )}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {notificationsLoading ? (
                                <div className="p-4 flex justify-center">
                                    <Loading size="sm" />
                                </div>
                            ) : notifications.length > 0 ? (
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`px-3 py-2 ${!notification.read ? 'bg-blue-50' : ''} cursor-pointer hover:bg-gray-50`}
                                            onClick={() => !notification.read && markAsRead(notification.id)}
                                        >
                                            <div className="flex items-start">
                                                <div
                                                    className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notification.read ? 'bg-blue-500' : 'bg-gray-200'
                                                        }`}
                                                ></div>
                                                <div className="ml-3 flex-1">
                                                    <p className="text-sm font-medium">{notification.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{notification.content}</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {formatTimeAgo(notification.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    No notifications
                                </div>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard" className="text-center justify-center text-sm text-blue-600">
                                    View all notifications
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                                {isLoading ? (
                                    <Loading size="sm" />
                                ) : (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatar-placeholder.png" alt={user?.name || "User"} />
                                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                    </Avatar>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/billing">Billing</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
} 