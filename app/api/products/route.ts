import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let query: any = {};

        if (category) {
            // Case-insensitive regex for category matching
            query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        if (featured === 'true') {
            query.featured = true;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, count: products.length, data: products },
            { status: 200 }
        );
    } catch (error) {
        console.error('Fetch products error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch products', error: String(error) },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        const product = await Product.create(body);

        return NextResponse.json(
            { success: true, data: product },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create product', error: String(error) },
            { status: 400 }
        );
    }
}
