import { useState } from "react";
import { accent, accentLight, font } from "../data/theme";

const tabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "workout", label: "Workout", icon: "🏋️" },
  { id: "meal", label: "Meal Plan", icon: "🍗" },
  { id: "macros", label: "Macros", icon: "🔥" },
  { id: "tracker", label: "Daily Tracker", icon: "💧" },
  { id: "streaks", label: "Streaks", icon: "🏆" },
  { id: "timer", label: "HIIT Timer", icon: "⏱️" },
  { id: "tips", label: "Tips", icon: "💡" },
];

export default function Header({ tab, setTab, weight = 100 }) {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <header
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(135deg,#120000,#1a0505,#0d0d0d)",
        padding: "36px 20px 28px",
        borderBottom: `1px solid ${accent}33`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated ambient glow */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${accent}15 0%, transparent 60%)`,
          transition: "background 0.3s ease",
          pointerEvents: "none",
        }}
      />
      {/* Decorative accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}, ${accent}88, transparent)`,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 14px",
          background: "linear-gradient(135deg, #1a0a00, #2a1000)",
          border: "1px solid #6b3a00",
          borderRadius: 9999,
          fontSize: 10,
          letterSpacing: 2,
          color: "#f5a623",
          fontFamily: font.mono,
          textTransform: "uppercase",
          marginBottom: 12,
          animation: "fadeIn 0.5s ease",
        }}>
          <span style={{ display: "inline-block", animation: "pulse-glow 2s ease infinite" }}>●</span>
          Egg-Free · Chicken + Veg · 2-Month Plan
        </div>

        {/* Title */}
        <h1 style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 800,
          fontFamily: font.display,
          letterSpacing: -0.5,
          lineHeight: 1.2,
          background: `linear-gradient(135deg, #fff, ${accentLight}ee)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Body Transformation Plan
        </h1>

        {/* Subtitle */}
        <div style={{ marginTop: 8, color: "#999", fontSize: 14, fontFamily: font.body, fontWeight: 400 }}>
          27 yrs · 178 cm · <span style={{ color: "#fff", fontWeight: 600 }}>{weight} kg</span> ·{" "}
          <span style={{ color: accent, fontWeight: 600 }}>Target: 90–93 kg</span>
        </div>

        {/* Tag badges */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {[
            ["⚠️ No Eggs", "#6b3a00", "#1a0a00"],
            ["🍗 Chicken ✓", "#6b3a00", "#1a0a00"],
            ["🌿 Veg ✓", "#0a4020", "#001a08"],
            ["🌱 Sprouts ✓", "#0a4020", "#001a08"],
          ].map(([label, borderColor, bgColor]) => (
            <span key={label} style={{
              padding: "3px 10px",
              borderRadius: 9999,
              background: bgColor,
              border: `1px solid ${borderColor}`,
              fontSize: 10,
              color: "#f5a623",
              fontFamily: font.mono,
              letterSpacing: 0.5,
            }}>
              {label}
            </span>
          ))}
        </div>

        {/* Tab navigation */}
        <nav style={{ marginTop: 20, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tabs.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 20px",
                  borderRadius: 9999,
                  border: `1.5px solid ${isActive ? accent : "transparent"}`,
                  background: isActive
                    ? `linear-gradient(135deg, ${accent}, ${accent}dd)`
                    : "rgba(255,255,255,0.04)",
                  color: isActive ? "#fff" : "#888",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: 0.3,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  boxShadow: isActive ? "0 4px 16px rgba(232,69,69,0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#ccc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#888";
                  }
                }}
              >
                <span style={{ fontSize: 15 }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
