import React from "react";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="flex h-screen bg-slate-950 text-white flex-col">
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Dashboard />
      </div>
    </div>
  );
}