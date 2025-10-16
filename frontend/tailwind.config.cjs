module.exports = {
darkMode: "class",
content: [
"./index.html",
"./src/**/*.{js,jsx}",
],
theme: {
extend: {
colors: {
cyber: {
bg: "#0B0F1A",
card: "#0F1628",
accent: "#6EE7F9",
accent2: "#A78BFA",
danger: "#F87171",
success: "#34D399",
},
},
boxShadow: {
glow: "0 0 40px rgba(110,231,249,0.15)",
},
backgroundImage: {
mesh: "radial-gradient(1000px 500px at 100% 0%, rgba(167,139,250,0.08), transparent 60%), radial-gradient(800px 400px at 0% 100%, rgba(110,231,249,0.08), transparent 60%)",
grid: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
},
backgroundSize: {
grid: "24px 24px",
},
borderRadius: {
xxl: "1.25rem",
}
},
},
plugins: [],
}