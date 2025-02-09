import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    shortURL: { type: String, required: true },
    clicks: { type: Number, required: true, default: 1 },
    browser: { type: String, required: true },
    device: { type: String, required: true },
    country: { type: String, required: true },
    ip: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const trackModel = mongoose.model('analytics', trackSchema);

export default trackModel;
