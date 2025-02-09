import express from 'express'
import trackModel from '../models/track.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const links = await trackModel.find();
        res.json(links);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;