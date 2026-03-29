import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    shortURL: { type: String, required: true, index: true },
    clicks: { type: Number, required: true, default: 1 },
    browser: { type: String, default: "Unknown" },
    device: { type: String, default: "Desktop" },
    country: { type: String, default: "Unknown" },
    ip: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const trackModel = mongoose.model("analytics", trackSchema);

export default trackModel;
