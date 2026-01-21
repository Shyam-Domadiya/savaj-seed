"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to Database
(0, db_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/contact', contactRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error Handling
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
// Start Server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
