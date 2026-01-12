import mongoose, { Schema } from 'mongoose';

const ImageSchema = new Schema({
    id: String,
    url: String,
    altText: String,
    caption: String,
    isPrimary: Boolean,
    sortOrder: Number,
});

const SpecificationSchema = new Schema({
    id: String,
    name: String,
    value: String,
    category: String,
});

const SectionSchema = new Schema({
    id: String,
    title: String,
    content: String,
    order: Number,
});

const GrowingGuideSchema = new Schema({
    id: String,
    title: String,
    pdfUrl: String,
    sections: [SectionSchema],
});

const ResourceSchema = new Schema({
    id: String,
    title: String,
    description: String,
    type: String,
    url: String,
    fileSize: String,
    downloadCount: Number,
    featured: Boolean,
});

const SeoSchema = new Schema({
    title: String,
    description: String,
    keywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    structuredData: Schema.Types.Mixed,
});

const ProductSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        subcategory: String,
        description: String,
        longDescription: String,
        images: [ImageSchema],
        specifications: [SpecificationSchema],
        growingGuide: GrowingGuideSchema,
        downloadableResources: [ResourceSchema],
        seasonality: [String],
        difficultyLevel: String,
        yieldExpectation: String,
        maturityTime: String,
        plantingInstructions: String,
        careInstructions: String,
        harvestingTips: String,
        storageGuidance: String,
        nutritionalInfo: Schema.Types.Mixed,
        certifications: [String],
        availability: { type: Boolean, default: true },
        featured: { type: Boolean, default: false },
        seoMetadata: SeoSchema,
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite of model if already compiled
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
