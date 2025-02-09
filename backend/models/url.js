import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = new mongoose.Schema({
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true, default: () => nanoid(8) },
    clicks: { type: Number, required: true, default: 0 }
});

const urlModel = mongoose.model('url', urlSchema);

export default urlModel;