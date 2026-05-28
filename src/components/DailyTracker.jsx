import { useState } from "react";
import { accent, card, cardHover, muted, shadow, radius, font, transition, border } from "../data/theme";
import { days } from "../data/exercises";
import WeightChart from "./WeightChart";

export default function DailyTracker({
  activeDay,
  waterCups,
  setWaterCups,
  workoutChecked,
  setWorkoutChecked,
  weightLog,
  setWeightLog,
  weight,
  setWeight
}) {
  const [newWeight, setNewWeight] = useState("");
  const [sleepHours, setSleepHours] = useState(8);

  const d = days[activeDay];
  const exercises = d.exercises || [];

  // Toggle exercise checkbox
  const toggleExercise = (exIdx) => {
    setWorkoutChecked((prev) => {
      const dayChecked = { ...prev[activeDay] };
      dayChecked[exIdx] = !dayChecked[exIdx];
      return {
        ...prev,
        [activeDay]: dayChecked,
      };
    });
  };

  // Calculate percentage of checked exercises for the active day
  const activeDayChecked = workoutChecked[activeDay] || {};
  const checkedCount = Object.keys(activeDayChecked).filter((k) => activeDayChecked[k]).length;
  const totalCount = exercises.length || 1;
  const percentComplete = Math.round((checkedCount / totalCount) * 100);

  // Handle adding weight log entry
  const handleLogWeight = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;
    const val = parseFloat(newWeight);
    setWeight(val);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    
    setWeightLog((prev) => {
      // Avoid duplicate logs for the same date in list, just overwrite or append
      const filtered = prev.filter(item => item.date !== formattedDate);
      return [...filtered, { date: formattedDate, w: val }];
    });
    setNewWeight("");
  };

  // Calculate weight lost since first log
  const initialWeight = weightLog[0] ? weightLog[0].w : 100;
  const currentWeight = weight;
  const totalWeightLost = (initialWeight - currentWeight).toFixed(1);

  // SVG Progress circle values
  const radiusCircle = 36;
  const circumference = 2 * Math.PI * radiusCircle;
  const strokeDashoffset = circumference - (percentComplete / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Exercise Checklist & SVG Progress */}
      <div style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <span style={{
              fontSize: 10,
              color: d.color,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 600,
            }}>
              Workout Checklist
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{d.day.split(" – ")[0]}'s Training</h3>
          </div>

          {/* SVG Progress Ring */}
          <div style={{ position: "relative", width: 90, height: 90, display: "flex", alignItems: "center", justifyItems: "center" }}>
            <svg width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx="45"
                cy="45"
                r={radiusCircle}
                stroke="#2a2a2a"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="45"
                cy="45"
                r={radiusCircle}
                stroke={d.color}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.4s ease-out" }}
              />
            </svg>
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: d.color, fontFamily: font.mono }}>
                {percentComplete}%
              </span>
              <span style={{ fontSize: 8, color: muted, letterSpacing: 0.5 }}>DONE</span>
            </div>
          </div>
        </div>

        {/* Exercises Checklist Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {exercises.map((ex, idx) => {
            const isChecked = !!activeDayChecked[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleExercise(idx)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: isChecked ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
                  borderRadius: radius.md,
                  border: `1px solid ${isChecked ? `${d.color}33` : border}`,
                  cursor: "pointer",
                  transition: transition.base,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isChecked ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)"; }}
              >
                {/* Custom Checkbox */}
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: `2px solid ${isChecked ? d.color : "#555"}`,
                  background: isChecked ? d.color : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "#fff",
                  transition: transition.fast,
                  flexShrink: 0,
                }}>
                  {isChecked && "✓"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    textDecoration: isChecked ? "line-through" : "none",
                    color: isChecked ? muted : "#f0f0f0",
                    transition: transition.fast,
                  }}>
                    {ex.name}
                  </div>
                  <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>
                    {ex.sets} × {ex.reps} {ex.note ? `· ${ex.note}` : ""}
                  </div>
                </div>
                {ex.muscle && (
                  <span style={{
                    fontSize: 9,
                    padding: "2px 8px",
                    borderRadius: 9999,
                    background: `${d.color}15`,
                    border: `1px solid ${d.color}22`,
                    color: d.color,
                    fontFamily: font.mono,
                  }}>
                    {ex.muscle}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Water Tracker & Sleep Tracker */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        
        {/* Animated Water Tracker */}
        <div style={{
          background: card,
          border: `1px solid ${border}`,
          borderRadius: radius.lg,
          padding: 20,
          boxShadow: shadow.sm,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <div style={{ width: "100%", marginBottom: 16 }}>
            <span style={{
              fontSize: 10,
              color: "#3498db",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 600,
            }}>
              Hydration Tracker
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>Drink 3–4 Litres</h3>
          </div>

          {/* Animated Water Tumbler */}
          <div style={{
            width: 120,
            height: 180,
            border: "4px solid rgba(255,255,255,0.12)",
            borderTop: "2px solid rgba(255,255,255,0.2)",
            borderRadius: "0 0 24px 24px",
            position: "relative",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            boxShadow: "inset 0 0 16px rgba(0,0,0,0.6)",
            marginBottom: 20,
          }}>
            {/* Water Fill Layer */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: `${Math.min(100, (waterCups / 16) * 100)}%`,
              background: "linear-gradient(180deg, #3498db, #1d6fa5)",
              boxShadow: "0 0 20px rgba(52,152,219,0.5)",
              transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              {/* Bubbles */}
              {waterCups > 0 && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle, rgba(255,255,255,0.15) 10%, transparent 10%)",
                  backgroundSize: "20px 20px",
                  animation: "float 6s ease-in-out infinite",
                }} />
              )}
            </div>

            {/* Display Text inside Tumbler */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              textShadow: "0 2px 6px rgba(0,0,0,0.8)",
            }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: font.mono }}>
                {((waterCups * 250) / 1000).toFixed(2)}L
              </span>
              <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 500, letterSpacing: 0.5, marginTop: 2 }}>
                {waterCups} / 16 Cups
              </span>
            </div>
          </div>

          {/* Plus and Minus buttons */}
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <button
              onClick={() => setWaterCups(prev => Math.max(0, prev - 1))}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${border}`,
                borderRadius: radius.md,
                color: "#e84545",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: transition.fast,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,69,69,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            >
              - 1 Cup
            </button>
            <button
              onClick={() => setWaterCups(prev => Math.min(24, prev + 1))}
              style={{
                flex: 2,
                padding: "10px 14px",
                background: "linear-gradient(135deg, #3498db, #2980b9)",
                border: "none",
                borderRadius: radius.md,
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(52,152,219,0.3)",
                transition: transition.fast,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              + 1 Cup (250ml)
            </button>
          </div>
        </div>

        {/* Weight Log & Sleep Quality */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Weight Log */}
          <div style={{
            background: card,
            border: `1px solid ${border}`,
            borderRadius: radius.lg,
            padding: 20,
            boxShadow: shadow.sm,
          }}>
            <span style={{
              fontSize: 10,
              color: "#f5a623",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 600,
            }}>
              Weight Progression
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4, marginBottom: 14 }}>Log Daily Weight</h3>

            {/* Input Form */}
            <form onSubmit={handleLogWeight} style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <input
                type="number"
                step="0.1"
                placeholder="Weight in kg (e.g. 99.4)"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                style={{
                  flex: 1,
                  background: "#0f0f0f",
                  border: `1px solid ${border}`,
                  borderRadius: radius.md,
                  padding: "10px 14px",
                  color: "#fff",
                  fontSize: 13.5,
                  fontFamily: font.mono,
                }}
              />
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #f5a623, #d97706)",
                  border: "none",
                  borderRadius: radius.md,
                  padding: "10px 18px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(245,166,35,0.2)",
                }}
              >
                Log
              </button>
            </form>

            {/* Stats Summary */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: radius.md,
              marginBottom: 12,
              border: `1px solid ${border}`,
              fontSize: 13,
            }}>
              <span>Initial: <strong style={{ color: "#fff" }}>{initialWeight} kg</strong></span>
              <span>Current: <strong style={{ color: "#fff" }}>{currentWeight} kg</strong></span>
              <span>Total Lost: <strong style={{ color: "#2ecc71" }}>-{totalWeightLost} kg</strong></span>
            </div>

            {/* Weight Trend Chart */}
            {weightLog.length >= 2 && <div style={{ marginBottom: 14, marginTop: 4 }}><WeightChart weightLog={weightLog} /></div>}

            {/* Log List */}
            <div style={{
              maxHeight: 120,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column-reverse",
              gap: 6,
              paddingRight: 4,
            }}>
              {weightLog.map((log, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  color: "#aaa",
                  padding: "4px 8px",
                  borderBottom: `1px solid rgba(255,255,255,0.04)`,
                }}>
                  <span>{log.date}</span>
                  <span style={{ fontFamily: font.mono, color: "#fff", fontWeight: 600 }}>{log.w} kg</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sleep & Cortisol Alert */}
          <div style={{
            background: card,
            border: `1px solid ${border}`,
            borderRadius: radius.lg,
            padding: 20,
            boxShadow: shadow.sm,
          }}>
            <span style={{
              fontSize: 10,
              color: "#7b68ee",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 600,
            }}>
              Sleep Monitor (Cortisol Key)
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4, marginBottom: 12 }}>Did you sleep well?</h3>

            {/* Sleep Input */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 24 }}>😴</span>
              <div style={{ flex: 1 }}>
                <input
                  type="range"
                  min="4"
                  max="12"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "#7b68ee" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: muted, marginTop: 4 }}>
                  <span>4 hrs</span>
                  <span><strong>{sleepHours} Hours</strong></span>
                  <span>12 hrs</span>
                </div>
              </div>
            </div>

            {/* Warning logic for poor sleep */}
            {sleepHours < 7 ? (
              <div style={{
                background: "linear-gradient(135deg, #2a0a0a, #1a0505)",
                border: "1px solid #e8454555",
                borderRadius: radius.md,
                padding: "10px 12px",
                fontSize: 12,
                color: "#ff6b6b",
                lineHeight: 1.5,
              }}>
                <strong>⚠️ Visceral Fat Alert:</strong> Under 7 hours of sleep triggers high cortisol, which signals your body to specifically store visceral fat around the belly. Aim for 7–8 hours tonight!
              </div>
            ) : (
              <div style={{
                background: "linear-gradient(135deg, #051a08, #001000)",
                border: "1px solid #2ecc7155",
                borderRadius: radius.md,
                padding: "10px 12px",
                fontSize: 12,
                color: "#7ec897",
                lineHeight: 1.5,
              }}>
                <strong>✓ Excellent Rest:</strong> 7+ hours of sleep stabilizes cortisol levels, facilitating efficient fat oxidation and keeping muscle repair active!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
