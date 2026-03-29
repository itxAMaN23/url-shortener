import express from "express";
import urlRoutes from "./routes/urlroutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import generateQrRoutes from "./routes/generateQr.js";
import connectDB from "./connect.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: "Too many URLs created. Please try again later." },
});
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Ensure MongoDB connects before starting server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // Exit if DB fails
  });

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api", urlRoutes, limiter);
app.use("/analytics", analyticsRoutes);
app.use("/generate-qr", generateQrRoutes, limiter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[${new Date().toISOString()}] ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
