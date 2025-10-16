import axios from "axios";

/**
 * Fetch latest CVEs from a public feed.
 * Using CIRCL CVE "last" endpoint (returns recent vulnerabilities).
 * Docs meaning: API documentation (guide for how to call a service).
 */
export async function fetchLatestCVEs() {
  const url = "https://cve.circl.lu/api/last"; // no key needed
  const { data } = await axios.get(url, { timeout: 15000 });
  // Limit to 50 to keep payload small
  return Array.isArray(data) ? data.slice(0, 50) : [];
}
