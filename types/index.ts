// User Types
export type User = {
    id: number;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
};

// Reservation Types
export type Reservation = {
    id: number;
    userId: number;
    date: string;
    time: string;
    partySize: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    specialRequests?: string;
    createdAt: string;
    updatedAt: string;
};

// Job Application Types
export type JobApplication = {
    id: number;
    jobId: string;
    fullName: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    coverLetter?: string;
    experienceYears?: number;
    howDidYouHear?: string;
    status: 'submitted' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
    createdAt: string;
    updatedAt: string;
};

// Contact Form Types
export type ContactSubmission = {
    id: number;
    name: string;
    email: string;
    subject?: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: string;
    updatedAt: string;
}; 