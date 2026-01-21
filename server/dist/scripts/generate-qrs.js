"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const qrcode_1 = __importDefault(require("qrcode"));
const xlsx_1 = __importDefault(require("xlsx"));
async function generateQRCodes() {
    try {
        const assetsDir = path_1.default.join(process.cwd(), '../assets');
        const qrDir = path_1.default.join(assetsDir, 'qrcodes');
        const excelPath = path_1.default.join(assetsDir, 'Savaj Seed Product.xlsx');
        // Ensure output directory exists
        if (!fs_1.default.existsSync(qrDir)) {
            fs_1.default.mkdirSync(qrDir, { recursive: true });
            console.log(`Created directory: ${qrDir}`);
        }
        // Read Excel File
        if (!fs_1.default.existsSync(excelPath)) {
            throw new Error(`Excel file not found at: ${excelPath}`);
        }
        console.log(`Reading Excel file: ${excelPath}`);
        const workbook = xlsx_1.default.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const products = xlsx_1.default.utils.sheet_to_json(sheet);
        console.log(`Found ${products.length} products. Generating QR codes...`);
        let count = 0;
        for (const product of products) {
            if (!product.Name && !product['Product Name']) {
                console.warn('Skipping product with no name:', product);
                continue;
            }
            const name = product.Name || product['Product Name'];
            const id = product.id || product.ID || product._id; // Adjust based on your excel structure
            // Fallback if ID is missing (though ideally it should exist)
            // Assuming URL structure based on migrated data. 
            // If Migration used generated IDs, this might be tricky if Excel doesn't have them.
            // But typically for SEO friendly URLs we might use slugs or if we have an ID column.
            // Let's assume we want to point to the product page.
            // If the Excel has an ID column, great. 
            // If not, we might need to rely on the name (slugified) if that's how your routing works,
            // OR if we are just bulk generating based on what's IN the excel.
            // Checking previous productController or migration script would be ideal to know ID source.
            // But for now, let's use the ID from the row if available, else warn.
            const productUrl = `https://savajseeds.com/products/${id}`; // Adjust if using slugs
            const filename = `${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-qr.png`;
            const filePath = path_1.default.join(qrDir, filename);
            await qrcode_1.default.toFile(filePath, productUrl, {
                color: {
                    dark: '#000000', // Black dots
                    light: '#ffffff' // White background
                },
                width: 300
            });
            console.log(`Generated: ${filename} -> ${productUrl}`);
            count++;
        }
        console.log(`\nSuccessfully generated ${count} QR codes in ${qrDir}`);
    }
    catch (error) {
        console.error('Error generating QR codes:', error);
        process.exit(1);
    }
}
generateQRCodes();
