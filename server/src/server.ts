import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import contactRoutes from './routes/contactRoutes';
import productRoutes from './routes/productRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
