import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(5000, () => console.log('Server running on port 5000 ....'));