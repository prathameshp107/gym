import { useState, useEffect, useCallback } from "react";
import { accent, muted, font, radius, border, shadow, card, cardHover, transition, dark } from "../data/theme";
import { loadStreaks, updateStreak, ACHIEVEMENTS, getUnlockedIds } from "../utils/storage";

const streakMeta = {
  workout: { icon: "🏋️", label: "Workout", color: "#e84545", desc: "Days completing your training" },
  water:   { icon: "💧", label: "Hydration", color: "#3498db", desc: "Days hitting 16 cups of water" },
  sleep:   { icon: "😴", label: "Sleep", color: "#7b68ee", desc: "Days with 7+ hours of sleep" },
  weight:  { icon: "⚖️", label: "Weight Log", color: "#f5a623", desc: "Days logging your weight" },
};

export default function StreakAchievements({ onUpdateStreaks }) {
  const [streaks, setStreaks] = useState(loadStreaks);
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    const ids = getUnlockedIds(streaks);
    setUnlocked(ids);
  }, [streaks]);

  // Allow parent to trigger streak updates (e.g. after logging water/weight)
  const handleStreakUpdate = useCallback((type, todayStr) => {
    const updated = updateStreak(type, todayStr);
    setStreaks(updated);
    if (onUpdateStreaks) onUpdateStreaks(updated);
  }, [onUpdateStreaks]);

  // Expose the handler via a global callback so DailyTracker can call it
  useEffect(() => {
    window.__streakUpdate = handleStreakUpdate;
    return () => { delete window.__streakUpdate; };
  }, [handleStreakUpdate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Streak Cards */}
      <div style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>🔥</span>
          <span style={{
            fontSize: 10,
            color: accent,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            Your Streaks
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          {Object.entries(streakMeta).map(([key, meta]) => {
            const s = streaks[key] || { count: 0, lastDate: null };
            const isActive = s.lastDate === new Date().toISOString().slice(0, 10);
            return (
              <div
                key={key}
                style={{
                  background: isActive ? `${meta.color}10` : "rgba(255,255,255,0.02)",
                  borderRadius: radius.md,
                  padding: "14px 12px",
                  border: `1px solid ${isActive ? `${meta.color}33` : border}`,
                  textAlign: "center",
                  transition: transition.base,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = shadow.md; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{meta.icon}</div>
                <div style={{
                  fontSize: 28,
                  fontWeight: 800,
                  fontFamily: font.mono,
                  color: isActive ? meta.color : "#666",
                  lineHeight: 1.2,
                }}>
                  {s.count}
                  <span style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: muted,
                    fontFamily: font.body,
                    marginLeft: 2,
                  }}>
                    {s.count === 1 ? "day" : "days"}
                  </span>
                </div>
                <div style={{
                  fontSize: 11,
                  color: isActive ? "#ccc" : muted,
                  fontWeight: 500,
                  marginTop: 4,
                }}>
                  {meta.label}
                </div>
                <div style={{
                  fontSize: 9,
                  color: muted,
                  fontFamily: font.mono,
                  marginTop: 4,
                }}>
                  {isActive ? "✓ Today" : s.lastDate ? "Last: " + s.lastDate.slice(5) : "Not started"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements / Badges */}
      <div style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>🏆</span>
          <span style={{
            fontSize: 10,
            color: accent,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            Achievements ({unlocked.length}/{ACHIEVEMENTS.length})
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
          {ACHIEVEMENTS.map(a => {
            const isUnlocked = unlocked.includes(a.id);
            return (
              <div
                key={a.id}
                style={{
                  padding: "12px 10px",
                  borderRadius: radius.md,
                  background: isUnlocked ? `linear-gradient(135deg, ${accent}22, ${accent}11)` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isUnlocked ? `${accent}44` : border}`,
                  textAlign: "center",
                  opacity: isUnlocked ? 1 : 0.4,
                  transition: transition.base,
                  cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  fontSize: isUnlocked ? 28 : 24,
                  marginBottom: 4,
                  filter: isUnlocked ? "none" : "grayscale(1)",
                  opacity: isUnlocked ? 1 : 0.5,
                }}>
                  {isUnlocked ? a.icon : "🔒"}
                </div>
                <div style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: isUnlocked ? "#fff" : "#666",
                  fontFamily: font.mono,
                  letterSpacing: 0.3,
                }}>
                  {a.label}
                </div>
                <div style={{
                  fontSize: 9,
                  color: muted,
                  marginTop: 3,
                  lineHeight: 1.3,
                }}>
                  {a.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
