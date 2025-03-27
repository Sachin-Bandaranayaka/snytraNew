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

async function ContactSubmissionsPage() {
    // Fetch contact submissions from the database, newest first
    const submissions = await db.select()
        .from(contactSubmissions)
        .orderBy(desc(contactSubmissions.createdAt));

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
                                            <form action={`/api/admin/contacts/${submission.id}/mark-as-read`} method="POST">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    type="submit"
                                                    disabled={submission.status !== 'new'}
                                                >
                                                    Mark as Read
                                                </Button>
                                            </form>
                                            <a href={`mailto:${submission.email}?subject=Re: Contact from ${submission.name}`}>
                                                <Button size="sm" variant="default">
                                                    Reply
                                                </Button>
                                            </a>
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

export default ContactSubmissionsPage; 