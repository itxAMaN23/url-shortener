import express from "express";
import urlModel from "../models/url.js";
import trackModel from "../models/track.js";
import { nanoid } from "nanoid";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

const router = express.Router();

// Shorten URL
router.post("/shorten", async (req, res) => {
  const { originalURL } = req.body;

  if (!originalURL) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    new URL(originalURL);
  } catch (err) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    let url = await urlModel.findOne({ originalURL });
    if (url) {
      return res.status(200).json(url);
    } else {
      const shortURL = nanoid(8);
      url = new urlModel({ originalURL, shortURL });
      await url.save();
      return res.status(201).json(url);
    }
  } catch (error) {
    console.error("Shorten Error:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

// Redirect to Original URL and Track Analytics
router.get("/:shortURL", async (req, res) => {
  try {
    const { shortURL } = req.params;
    const url = await urlModel.findOne({ shortURL });

    if (!url) return res.status(404).send({ error: "URL not found" });

    // 1. Initialize parser FIRST
    const parser = new UAParser(req.headers["user-agent"]);
    const browser = parser.getBrowser().name || "Unknown";
    const device = parser.getDevice().type || "Desktop";

    // 2. Safe IP extraction
    const xForwarded = req.headers["x-forwarded-for"];
    const ip = xForwarded ? xForwarded.split(",")[0] : req.socket.remoteAddress;

    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : "Unknown";

    // Store analytics in trackModel
    trackModel
      .create({
        shortURL, // Store only the shortURL string
        clicks: 1, // Each visit counts as 1 click in analytics
        browser,
        device,
        country,
        ip, // Optionally store the IP for debugging
      })
      .catch((err) => console.error("Tracking Error:", err));

    urlModel
      .updateOne({ shortURL }, { $inc: { clicks: 1 } })
      .catch((err) => console.error("Counter Error:", err));

    return res.redirect(url.originalURL);
  } catch (error) {
    console.error("Redirect Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
  }
});

export default router;
