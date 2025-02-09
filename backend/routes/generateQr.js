import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Supported image formats
const VALID_FORMATS = ["PNG", "SVG", "JPG"];
const VALID_LOGOS = ["no-logo", "scan-me", "scan-me-square"];
const VALID_FRAMES = ["no-frame", "bottom-frame", "top-header"];

// Generate QR Code
router.post("/", async (req, res) => {
    let {
        qr_code_text,
        image_format = "PNG",
        image_width = 500,
        foreground_color = "#000000",
        background_color = "#FFFFFF",
        qr_code_logo = "no-logo",
        frame_name = "no-frame",
        frame_text = "",
        frame_color = "#000000"
    } = req.body;

    // Validate required input
    if (!qr_code_text) {
        return res.status(400).json({ error: "QR Code text is required." });
    }

    // Validate image format
    if (!VALID_FORMATS.includes(image_format.toUpperCase())) {
        return res.status(400).json({ error: `Invalid image format. Supported formats: ${VALID_FORMATS.join(", ")}` });
    }

    try {
        const response = await axios.post(`${process.env.API_URL}?access-token=${process.env.ACCESS_TOKEN}`, {
            qr_code_text,
            image_format: image_format.toUpperCase(),
            image_width,
            foreground_color,
            background_color,
            qr_code_logo,
            frame_name,
            frame_text,
            frame_color
        }, {
            responseType: 'arraybuffer'
        });

        // Convert binary data to base64
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        
        // Create appropriate data URL based on image format
        const mimeType = image_format.toLowerCase() === 'svg' ? 'image/svg+xml' : `image/${image_format.toLowerCase()}`;
        const dataUrl = `data:${mimeType};base64,${base64Image}`;

        return res.json({ 
            success: true, 
            qrCodeUrl: dataUrl
        });

    } catch (error) {
        console.error("QR Code API Error:", {
            status: error.response?.status,
            message: error.message
        });
        
        if (error.response?.status === 401) {
            return res.status(401).json({ 
                error: "Invalid API key or subscription issue."
            });
        }
        
        return res.status(500).json({ 
            error: "QR Code generation failed. Please try again later.",
            details: error.message
        });
    }
});

export default router;