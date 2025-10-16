import React, { useState } from "react";
import { scanURL } from "../api";

export default function URLScanner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    try {
      const res = await scanURL(input);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const badgeColor = {
    safe: "bg-green-600",
    suspicious: "bg-yellow-600",
    phishing: "bg-red-600",
  };

  return (
    <div className="bg-slate-900/70 p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-white">🔍 URL Scanner</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none"
          placeholder="Enter URL..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleScan}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Scan
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${badgeColor[result.label] || "bg-gray-600"}`}
          >
            {result?.label ? result.label.toUpperCase() : "UNKNOWN"}
          </div>
          <p className="mt-2 text-gray-300">
            Risk Score: <span className="font-mono">{result.score ?? "N/A"}</span>
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-400">
            {Array.isArray(result.reasons) &&
              result.reasons.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
