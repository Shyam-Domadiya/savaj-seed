"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const XLSX = __importStar(require("xlsx"));
const db_1 = __importDefault(require("../config/db"));
const Product_1 = __importDefault(require("../models/Product"));
dotenv_1.default.config();
// Helper to map Excel season to App Season
function mapSeason(season) {
    if (!season)
        return ['All-Season'];
    const s = season.toLowerCase();
    const seasons = [];
    if (s.includes('kharif') || s.includes('monsoon'))
        seasons.push('Monsoon');
    if (s.includes('rabi') || s.includes('winter'))
        seasons.push('Winter');
    if (s.includes('summer'))
        seasons.push('Summer');
    if (s.includes('all season') || s.includes('all-season'))
        seasons.push('All-Season');
    // Default fallback
    if (seasons.length === 0)
        seasons.push('All-Season');
    return seasons;
}
const seedProducts = async () => {
    try {
        await (0, db_1.default)();
        const excelPath = path_1.default.join(process.cwd(), '../Savaj Seed Product.xlsx');
        if (!fs_1.default.existsSync(excelPath)) {
            console.error('Excel file not found at:', excelPath);
            process.exit(1);
        }
        console.log('Reading Excel file from:', excelPath);
        const fileBuffer = fs_1.default.readFileSync(excelPath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let productsData = XLSX.utils.sheet_to_json(sheet);
        productsData = productsData.filter((item) => item['Product Name'] && item['Product Name'].toString().trim() !== '');
        console.log(`Found ${productsData.length} products in Excel. Starting migration...`);
        for (const item of productsData) {
            // Determine category based on 'Crop Name'
            let category = 'Other';
            const cropName = (item['Crop Name'] || '').toLowerCase().trim();
            const productName = (item['Product Name'] || '').toLowerCase(); // For vegetable detection
            if (cropName.includes('cotton'))
                category = 'Cotton';
            else if (cropName.includes('wheat'))
                category = 'Wheat';
            else if (cropName.includes('groundnut'))
                category = 'Groundnut';
            else if (cropName.includes('cumin'))
                category = 'Cumin';
            else if (cropName.includes('sesa'))
                category = 'Sesame';
            else if (cropName.includes('castor'))
                category = 'Castor';
            else if (cropName.includes('maize'))
                category = 'Maize';
            else if (cropName.includes('gram'))
                category = 'Gram';
            else if (cropName.includes('pigeon'))
                category = 'Pigeon Pea';
            else if (cropName.includes('millet') || cropName.includes('bajra'))
                category = 'Millet';
            else if (cropName.includes('cori'))
                category = 'Coriander';
            else if (productName.includes('okra') ||
                productName.includes('bottle') ||
                productName.includes('bitter') ||
                productName.includes('sponge') ||
                productName.includes('ridge') ||
                productName.includes('chilli') ||
                productName.includes('tomato') ||
                productName.includes('cucumber') ||
                productName.includes('bean')) {
                category = 'Vegetable';
            }
            // Helper to safely get value ignoring case/spaces
            const getValue = (keyPart) => {
                const key = Object.keys(item).find(k => k.toLowerCase().includes(keyPart.toLowerCase()));
                return key ? item[key] : '';
            };
            const seedColor = getValue('seed color') || getValue('fruit color');
            const flowerColor = getValue('flower color');
            const height = getValue('height');
            const fruitShape = getValue('fruit shape');
            const maturity = getValue('maturity days') || getValue('maturity') || 'Medium';
            const yieldVal = getValue('yield') || 'High';
            // Generate a stable ID from the name (slugify)
            const slug = item['Product Name'].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const productData = {
                name: item['Product Name'],
                slug: slug,
                category: category,
                cropName: item['Crop Name']?.trim() || 'Other',
                description: item['Morphological Characters'] || `Premium ${item['Product Name']} seeds.`,
                longDescription: `${item['Product Name']} is a premium quality seed. \n\nMorphological Characters: ${item['Morphological Characters']}\nSeed/Fruit Color: ${seedColor}`,
                // Attributes
                seedColor: seedColor,
                morphologicalCharacters: item['Morphological Characters'],
                flowerColor: flowerColor,
                plantHeight: height,
                fruitShape: fruitShape,
                // Farming
                seasonality: mapSeason(item['Season']),
                maturityTime: maturity,
                yieldExpectation: yieldVal,
                difficultyLevel: 'Intermediate',
                // Images 
                // Note: Excel doesn't have images. We'll set a placeholder or empty array.
                // In a real scenario, you'd map these to uploaded URLs.
                images: [{
                        url: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2000&auto=format&fit=crop',
                        altText: `${item['Product Name']} seeds`,
                        isPrimary: true
                    }],
                plantingInstructions: 'Sow at recommended depth and spacing. Ensure adequate moisture.',
                careInstructions: 'Regular weeding and irrigation recommended. Monitor for pests.',
                harvestingTips: 'Harvest when crop reaches physiological maturity.',
                storageGuidance: 'Store in cool, dry, and hygienic place.',
                availability: true,
                featured: false,
                seoMetadata: {
                    title: item['Product Name'],
                    description: item['Morphological Characters'] || '',
                    keywords: [item['Product Name'], category, cropName].filter(Boolean)
                }
            };
            // Upsert: Update if exists, Insert if not
            await Product_1.default.findOneAndUpdate({ name: item['Product Name'] }, productData, { upsert: true, new: true, setDefaultsOnInsert: true });
        }
        console.log('Data Migration Completed Successfully!');
        process.exit();
    }
    catch (error) {
        console.error('Error with data migration:', error);
        process.exit(1);
    }
};
seedProducts();
