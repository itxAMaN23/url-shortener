import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = new mongoose.Schema(
  {
    originalURL: { type: String, required: true, trim: true },
    shortURL: {
      type: String,
      unique: true,
      required: true,
      default: () => nanoid(8),
    },
    clicks: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;
