import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        // Delete the auth token cookie
        cookies().delete('auth-token');

        return NextResponse.json({
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Something went wrong during logout' },
            { status: 500 }
        );
    }
}
