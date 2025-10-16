import { motion } from "framer-motion";


export default function StatCard({ title, value, subtitle, tone = "neutral" }) {
const toneClass = {
neutral: "border-white/10",
good: "border-emerald-500/30",
warn: "border-amber-500/30",
bad: "border-rose-500/30",
}[tone];


return (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
className={`glass p-4 border ${toneClass}`}
>
<p className="text-sm text-slate-400">{title}</p>
<p className="text-3xl font-bold mt-1">{value}</p>
{subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
</motion.div>
);
}