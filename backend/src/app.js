// cyShield backend + API helpers in one file

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

// Routers
import healthRouter from "./routes/health.routes.js";
import threatRouter from "./routes/threat.routes.js";
import vulnRouter from "./routes/vuln.routes.js";

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = "mongodb://127.0.0.1:27017/cyshield";
if (!MONGO_URI) {
  console.warn("⚠️  MONGO_URI missing in .env (database). App will still run, but DB ops will fail.");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err.message));
}

// Backend Routes
app.use("/api/health", healthRouter);
app.use("/api/threats", threatRouter);
app.use("/api/vulns", vulnRouter);

// API Helpers (exported so frontend can import directly from backend/app.js)
const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const getHealth = () => API.get("/health");
export const getThreatStats = () => API.get("/threats");
export const scanURL = (url) => API.post("/threats/scan/url", { url });
export const getVulns = () => API.get("/vulns");

// Default health endpoint (basic check)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "backend" });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend + API running on port ${PORT}`));
