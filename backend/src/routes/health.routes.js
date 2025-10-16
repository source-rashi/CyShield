// routes/health.routes.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    backend: true,
    database: !!process.env.MONGO_URI,
    virustotal: !!process.env.VIRUSTOTAL_API_KEY,
    phishtank: !!process.env.PHISHTANK_APP_KEY,
  });
});

export default router;
