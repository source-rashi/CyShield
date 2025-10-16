import React, { useEffect, useState } from "react";
import { getCVEs } from "../api";

export default function CVETable() {
  const [cves, setCves] = useState([]);

  useEffect(() => {
    getCVEs()
      .then((res) => setCves(res.data))
      .catch((err) => console.error("CVE fetch error:", err));
  }, []);

  return (
    <div className="p-4 bg-slate-800 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">
        Latest Vulnerabilities (CVEs)
      </h2>
      {cves.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-gray-300">
            <tr>
              <th className="px-2 py-1">CVE ID</th>
              <th className="px-2 py-1">Severity</th>
              <th className="px-2 py-1">Description</th>
            </tr>
          </thead>
          <tbody>
            {cves.map((cve, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="px-2 py-1">{cve.id}</td>
                <td className="px-2 py-1">{cve.severity}</td>
                <td className="px-2 py-1">{cve.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400">No CVEs available</p>
      )}
    </div>
  );
}
