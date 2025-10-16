import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend server
});

// Health
export const getHealth = () => API.get("/health");

// URL Scan
export const scanURL = (url) => API.post("/threats/scan/url", { url });

// CVEs
export const getCVEs = () => API.get("/threats/cve/latest");

// Threat stats
export const getThreatStats = () => API.get("/threats/stats");
