import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import { Product as ProductType } from '@/lib/types/product';

export async function getAllProducts(): Promise<ProductType[]> {
    try {
        await connectToDatabase();

        // Lean queries are faster and return POJOs (Plain Old JavaScript Objects)
        // We need to Serialize JSON to pass to client components if they contain Date objects or ObjectIds
        // Mongoose .lean() returns _id as object, we might need to handle transformation if strict typing is needed.
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();

        // Transform _id to string or remove it if not in type
        // The existing type uses 'id' (string), which we have in our schema.
        // We need to ensure dates are serialized if passing to Client Components (Next.js automatically handles Date objects in SC -> CC props in recent versions, but better safe).

        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
}

export async function getProductById(id: string): Promise<ProductType | null> {
    try {
        await connectToDatabase();
        const product = await Product.findOne({ id }).lean();

        if (!product) return null;

        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
}

export async function getFeaturedProducts(): Promise<ProductType[]> {
    try {
        await connectToDatabase();
        const products = await Product.find({ featured: true }).lean();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}
