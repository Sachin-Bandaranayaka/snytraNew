"use client";

import { db } from '@/lib/db';
import { contactSubmissions } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ContactSubmissionsPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await fetch('/api/admin/contacts');
                if (!response.ok) throw new Error('Failed to fetch submissions');
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                toast.error('Failed to load contact submissions');
            } finally {
                setLoading(false);
            }
        }

        fetchSubmissions();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            const response = await fetch(`/api/admin/contacts/${id}/mark-as-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to mark as read');

            // Update the local state to reflect the change
            setSubmissions(submissions.map(submission =>
                submission.id === id ? { ...submission, status: 'read' } : submission
            ));

            toast.success('Marked as read');
        } catch (error) {
            console.error('Error marking as read:', error);
            toast.error('Failed to update status');
        }
    };

    const handleReply = (email, name) => {
        // Using window.location for mailto link
        window.location.href = `mailto:${email}?subject=Re: Contact from ${name}`;
    };

    if (loading) {
        return <div className="flex justify-center p-8">Loading submissions...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Contact Form Submissions</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="ml-2">
                        {submissions.length} Total
                    </Badge>
                </div>
            </div>

            {submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white border rounded-lg shadow-sm">
                    <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No contact submissions yet</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Contact form submissions will appear here when customers reach out.
                    </p>
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.id} className={submission.status === 'new' ? 'bg-blue-50' : ''}>
                                    <TableCell className="font-medium">{submission.name}</TableCell>
                                    <TableCell>{submission.email}</TableCell>
                                    <TableCell>{submission.subject}</TableCell>
                                    <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                submission.status === 'new'
                                                    ? 'default'
                                                    : submission.status === 'read'
                                                        ? 'secondary'
                                                        : 'success'
                                            }
                                        >
                                            {submission.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleMarkAsRead(submission.id)}
                                                disabled={submission.status !== 'new'}
                                            >
                                                Mark as Read
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="default"
                                                onClick={() => handleReply(submission.email, submission.name)}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
} 