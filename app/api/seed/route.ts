import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import { sampleProducts } from '@/lib/data/products';

export async function GET() {
    try {
        await connectToDatabase();

        // Clear existing products
        await Product.deleteMany({});

        // insertMany validates the array against the schema
        const insertedProducts = await Product.insertMany(sampleProducts);

        return NextResponse.json(
            {
                message: 'Database seeded successfully',
                count: insertedProducts.length,
                products: insertedProducts.map(p => p.name)
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json(
            { message: 'Error seeding database', error: String(error) },
            { status: 500 }
        );
    }
}
