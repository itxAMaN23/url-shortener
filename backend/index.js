import express from 'express';
import urlRoutes from './routes/urlroutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import generateQrRoutes from './routes/generateQr.js'
import connectDB from './connect.js';
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.end('GET request.');
})

app.use('/api', urlRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/generate-qr', generateQrRoutes);

app.listen(PORT, () => {
    console.log(`Server started: ${PORT}`);
    connectDB();
})