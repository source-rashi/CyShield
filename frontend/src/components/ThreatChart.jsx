import React, { useEffect, useState } from "react";
import { getThreatStats } from "../api"; // This already calls /threats/stats
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ThreatChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // This function will now work correctly with the backend changes
    getThreatStats()
      .then((res) => {
        // The backend now returns a direct array, so we don't need res.data.data
        setData(res.data);
      })
      .catch((err) => console.error("Threat stats error:", err));
  }, []);


  return (
    <div className="p-4 bg-slate-800 rounded-2xl shadow-md h-80">
      <h2 className="text-lg font-semibold text-white mb-4">Threat Trends</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-400">No threat data available</p>
      )}
    </div>
  );
}
