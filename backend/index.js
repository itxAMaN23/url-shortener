import express from 'express';
import urlRoutes from './routes/urlroutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import generateQrRoutes from './routes/generateQr.js';
import connectDB from './connect.js';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', urlRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/generate-qr', generateQrRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
    connectDB();
});

module.exports = app;