"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Product_1 = __importDefault(require("../models/Product"));
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = (0, express_async_handler_1.default)(async (req, res) => {
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
    const products = await Product_1.default.find(filter);
    res.json(products);
});
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    // Search by slug (preferred) or ID
    const product = await Product_1.default.findOne({
        $or: [
            { slug: id },
            // Only check _id if it's a valid ObjectId to avoid cast errors
            ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])
        ]
    });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});
