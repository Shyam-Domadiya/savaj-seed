import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';

export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json(
            { status: 'ok', message: 'Database connected successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database connection failed:', error);
        return NextResponse.json(
            { status: 'error', message: 'Database connection failed', error: String(error) },
            { status: 500 }
        );
    }
}
