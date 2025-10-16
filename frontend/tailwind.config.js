/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // scan all files in src
  theme: {
    extend: {
      colors: {
        "cyber-bg": "#0f172a",    // background (dark blue/gray)
        "cyber-card": "#1e293b",  // card background
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 255, 0.6)", // neon glow
      },
      borderRadius: {
        xxl: "1.5rem", // custom rounded-xxl
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 30%, #0ea5e9, transparent 25%), radial-gradient(circle at 80% 70%, #8b5cf6, transparent 25%)",
        grid: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px", // grid spacing
      },
    },
  },
  plugins: [],
}
