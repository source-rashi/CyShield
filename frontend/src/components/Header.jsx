import { motion } from "framer-motion";


export default function Header() {
return (
<motion.header
initial={{ opacity: 0, y: -12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="glass p-4 md:p-6 mb-6 flex items-center justify-between"
>
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyber-accent to-cyber-accent2 flex items-center justify-center shadow-glow">
<span className="font-black">🛡️</span>
</div>
<div>
<h1 className="text-2xl md:text-3xl font-extrabold grad-title leading-tight">cyShield</h1>
<p className="text-xs text-slate-400 -mt-1">Threat Intelligence & Phishing Detection</p>
</div>
</div>


<div className="hidden md:flex items-center gap-3">
<a className="btn" href="https://owasp.org/www-community/attacks/Phishing" target="_blank">Learn Phishing</a>
<a className="btn" href="https://nvd.nist.gov/vuln" target="_blank">NVD</a>
<a className="btn" href="https://virustotal.com" target="_blank">VirusTotal</a>
</div>
</motion.header>
);
}