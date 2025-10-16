import React from "react";
import URLScanner from "../components/URLScanner";
import CVETable from "../components/CVETable";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Middle Row - Chart + Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <URLScanner />
        <CVETable />
      </div>

    </div>
  );
}