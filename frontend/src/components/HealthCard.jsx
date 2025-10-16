import React, { useEffect, useState } from "react";
import { getHealth } from "../api";

export default function HealthCard() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    getHealth()
      .then((res) => setHealth(res.data))
      .catch((err) => console.error("Health API error:", err));
  }, []);

  return (
    <div className="p-4 bg-slate-800 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-white">System Health</h2>
      {health ? (
        <p className="text-green-400">✅ {health.message}</p>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </div>
  );
}
