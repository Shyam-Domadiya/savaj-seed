import { Product } from '@/lib/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {
            cache: 'no-store', // Ensure fresh data or use 'force-cache' based on needs
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await res.json();

        // Map DB fields to Frontend Product Interface
        // Specifically map _id or slug to id for frontend routing
        return products.map((p: any) => ({
            ...p,
            id: p.slug, // Use slug as the main ID for clean URLs
            mongoId: p._id // Keep reference to real ID just in case
        }));

    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const product = await res.json();
        return {
            ...product,
            id: product.slug,
            mongoId: product._id
        };

    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
}

export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products?featured=true`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch featured products');
        }

        const products = await res.json();
        // Return only top 4 if API returns more, though filtering should happen on backend ideally
        return products.slice(0, 4).map((p: any) => ({
            ...p,
            id: p.slug
        }));

    } catch (error) {
        console.warn('Error fetching featured products:', error);
        return [];
    }
}

export async function getUniqueCropCategories(): Promise<string[]> {
    // We can fetch all and extract, or make a specific API endpoint.
    // For now, fetching all is fine unless dataset is huge.
    const products = await getAllProducts();
    const categories = new Set(products.map(p => p.cropName || 'Other'));
    return Array.from(categories).filter(c => c && c !== 'Other').sort();
}
