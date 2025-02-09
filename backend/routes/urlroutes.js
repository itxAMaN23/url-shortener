import express from 'express';
import urlModel from '../models/url.js';
import trackModel from '../models/track.js';
import { nanoid } from 'nanoid';
import useragent from "useragent";
import geoip from "geoip-lite";

const router = express.Router();

// Shorten URL
router.post('/shorten', async (req, res) => {
    const { originalURL } = req.body;
    try {
        let url = await urlModel.findOne({ originalURL });
        if (url) {
            res.json(url);
        } else {
            const shortURL = nanoid(8);
            url = new urlModel({ originalURL, shortURL });
            await url.save();
            res.json(url);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

// Redirect to Original URL and Track Analytics
router.get("/:shortURL", async (req, res) => {
    try {
        const url = await urlModel.findOne({ shortURL: req.params.shortURL });

        if (!url) {
            return res.status(404).json("URL not found");
        }

        // Extract user agent details
        const agent = useragent.parse(req.headers["user-agent"]);
        const browser = agent.family;
        const device = agent.device.family;

        // Extract client IP address
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

        // Extract geolocation details
        const geo = geoip.lookup(ip);
        const country = geo ? geo.country : "Unknown";

        // Store analytics in trackModel
        await trackModel.create({
            shortURL: url.shortURL, // Store only the shortURL string
            clicks: 1,  // Each visit counts as 1 click in analytics
            browser,
            device,
            country,
            ip, // Optionally store the IP for debugging
        });

        // Increment click count in urlModel
        url.clicks++;
        await url.save();

        return res.redirect(url.originalURL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Server error");
    }
});

export default router;
