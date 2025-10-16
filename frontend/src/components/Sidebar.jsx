import React from "react";
import { Shield, Home, BarChart, Search, Bug } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col">
      <div className="flex items-center gap-2 text-indigo-400 mb-10">
        <Shield size={28} />
        <h1 className="text-xl font-bold">CyShield</h1>
      </div>

      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-2 hover:text-indigo-400">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-indigo-400">
          <Search size={20} /> URL Scanner
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-indigo-400">
          <BarChart size={20} /> Threats
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-indigo-400">
          <Bug size={20} /> Vulnerabilities
        </a>
      </nav>

      <div className="mt-auto text-xs text-slate-500">
        © 2025 CyShield
      </div>
    </div>
  );
}
