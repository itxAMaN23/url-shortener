import React, { useState } from "react";
import axios from "axios";
import "./QRCodeGenerator.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const QRCodeGenerator = () => {
  const [qrCodeText, setQrCodeText] = useState("");
  const [imageFormat, setImageFormat] = useState("PNG");
  const [imageWidth, setImageWidth] = useState(500);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [frameColor, setFrameColor] = useState("#000000");
  const [qrCodeLogo, setQrCodeLogo] = useState("no-logo");
  const [frameName, setFrameName] = useState("no-frame");
  const [frameText, setFrameText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const VALID_FORMATS = ["PNG", "SVG", "JPG"];
  const VALID_LOGOS = ["no-logo", "scan-me", "scan-me-square"];
  const VALID_FRAMES = ["no-frame", "bottom-frame", "top-header"];

  const generateQRCode = async () => {
    if (!qrCodeText.trim()) {
      setError("Please enter a valid URL or text.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/generate-qr`, {
        qr_code_text: qrCodeText,
        image_format: imageFormat,
        image_width: Math.max(100, Math.min(imageWidth, 800)),
        foreground_color: foregroundColor,
        background_color: backgroundColor,
        qr_code_logo: VALID_LOGOS.includes(qrCodeLogo) ? qrCodeLogo : "no-logo",
        frame_name: VALID_FRAMES.includes(frameName) ? frameName : "no-frame",
        frame_text: frameText,
        frame_color: frameColor,
      });

      if (response.data?.qrCodeUrl) {
        setQrCodeUrl(response.data.qrCodeUrl);
      } else {
        setError("Failed to generate QR Code.");
      }
    } catch (err) {
      console.error(err);
      setError("Error generating QR Code. Check API key or subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qr-container">
      <div className="controls-section">
        <h2 className="title">📌 QR Code Generator</h2>
        <p className="subtitle">Customize your QR code easily.</p>

        <input
          type="text"
          placeholder="Enter URL or Text"
          value={qrCodeText}
          onChange={(e) => setQrCodeText(e.target.value)}
          className="form-control"
        />

        <div className="option-section">
          <label>File Format</label>
          <div className="badge-container">
            {VALID_FORMATS.map((format) => (
              <span
                key={format}
                className={`badge ${imageFormat === format ? "active" : ""}`}
                onClick={() => setImageFormat(format)}
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <div className="option-section">
          <label>Size ({imageWidth}px)</label>
          <input
            type="range"
            min="100"
            max="800"
            value={imageWidth}
            onChange={(e) => setImageWidth(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="option-section">
          <label>QR Code Logo</label>
          <div className="badge-container">
            {VALID_LOGOS.map((logo) => (
              <span
                key={logo}
                className={`badge ${qrCodeLogo === logo ? "active" : ""}`}
                onClick={() => setQrCodeLogo(logo)}
              >
                {logo.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

        <div className="option-section">
          <label>Frame Style</label>
          <div className="badge-container">
            {VALID_FRAMES.map((frame) => (
              <span
                key={frame}
                className={`badge ${frameName === frame ? "active" : ""}`}
                onClick={() => setFrameName(frame)}
              >
                {frame.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter Frame Text (Optional)"
          value={frameText}
          onChange={(e) => setFrameText(e.target.value)}
          className="form-control"
        />

        <div className="color-selection">
          <label>Colors (FG, BG, Frame)</label>
          <div className="color-boxes">
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
            />
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
            <input
              type="color"
              value={frameColor}
              onChange={(e) => setFrameColor(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn-generate"
          onClick={generateQRCode}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {!qrCodeUrl && (
        <div className="preview-info">
          <p>Your QR Code will be previewed here after generation.</p>
        </div>
      )}

      {qrCodeUrl && (
        <div className="qr-preview">
          <img src={qrCodeUrl} alt="QR Code" className="qr-image" />
          <a
            href={qrCodeUrl}
            download={`QRCode.${imageFormat.toLowerCase()}`}
            className="btn-download"
          >
            ⬇ Download
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
