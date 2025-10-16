import mongoose from "mongoose";

// Log scans here (optional now; useful once DB is connected)
const ThreatLogSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["url", "file"], required: true },
    input: { type: String, required: true }, // URL or file hash
    verdict: { type: String, required: true }, // e.g., Malicious/Suspicious/Safe
    source: { type: String, default: "local" }, // e.g., virustotal, phishtank, local
  },
  { timestamps: true }
);

export default mongoose.model("ThreatLog", ThreatLogSchema);
