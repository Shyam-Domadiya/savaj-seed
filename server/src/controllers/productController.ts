import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const category = req.query.category
        ? { category: req.query.category }
        : {};

    // Combine filters
    const filter = { ...keyword, ...category };

    // If 'featured' param is present
    if (req.query.featured) {
        Object.assign(filter, { featured: true });
    }

    const products = await Product.find(filter as any);

    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    // Search by slug (preferred) or ID
    const product = await Product.findOne({
        $or: [
            { slug: id },
            // Only check _id if it's a valid ObjectId to avoid cast errors
            ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])
        ]
    });

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
