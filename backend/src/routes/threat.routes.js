// routes/threat.routes.js
import express from "express";
import { scanURLWithML } from "../services/ml.service.js";
// You'll need to import a new controller function here
import { getThreatStats } from "../controllers/threat.controller.js";

const router = express.Router();

// Existing route, you can keep or remove this
router.get("/", (req, res) => {
  res.json({
    phishing: 2,
    malware: 5,
    suspicious: 1
  });
});

// Add this new endpoint for the threat chart
router.get("/stats", getThreatStats);

router.post("/scan/url", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL required" });

    // This is already set up to call your ml.service.js
    console.log(`[Threat Routes] Scanning URL: ${url}`);
    const result = await scanURLWithML(url);
    console.log(`[Threat Routes] Scan result:`, result);
    res.json(result);
  } catch (err) {
    console.error(`[Threat Routes] Error:`, err);
    res.status(500).json({ 
      error: "Scan failed", 
      details: err.message 
    });
  }
});

export default router;