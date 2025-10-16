// backend/src/routes/vuln.routes.js
import express from "express";
import axios from "axios";

const router = express.Router();

// Fetch latest vulnerabilities from NVD API
router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=5"
    );

    const vulns = data.vulnerabilities.map((v) => ({
      id: v.cve.id,
      description: v.cve.descriptions[0]?.value || "No description",
      published: v.cve.published,
    }));

    res.json(vulns);
  } catch (err) {
    console.error("Error fetching CVEs:", err.message);
    res.status(500).json({ error: "Failed to fetch CVEs" });
  }
});

export default router;
