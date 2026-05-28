
import { accent, card, cardHover, muted, shadow, radius, font, transition, border } from "../data/theme";
import { days } from "../data/exercises";
import { proteinSources } from "../data/nutrition";

export default function OverviewTab({
  weight,
  setWeight,
  height,
  setHeight,
  activity,
  setActivity,
  deficit,
  setDeficit
}) {
  // Calculations based on Mifflin-St Jeor formula
  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
  const bmr = 10 * weight + 6.25 * height - 5 * 27 + 5; // Age 27
  const activityMultiplier = activity === "light" ? 1.375 : activity === "heavy" ? 1.725 : 1.55;
  const tdee = Math.round(bmr * activityMultiplier);
  const calorieGoal = tdee - (deficit === "aggressive" ? 750 : 500);
  const proteinGoal = Math.round(weight * 1.5);

  const stats = [
    { label: "Current Weight", value: `${weight} kg`, icon: "⚖️", color: "#f5a623" },
    { label: "Height", value: `${height} cm`, icon: "📏", color: "#50e3c2" },
    { label: "BMI Ratio", value: `${bmi} (${bmi >= 30 ? "Obese" : bmi >= 25 ? "Overweight" : "Normal"})`, icon: "📊", color: accent },
    { label: "Goal Weight", value: "90–93 kg", icon: "🎯", color: "#2ecc71", highlight: true },
    { label: "Daily Calories", value: `~${calorieGoal} kcal`, icon: "🔥", color: "#f5a623" },
    { label: "Protein Target", value: `${proteinGoal}g`, icon: "💪", color: "#7b68ee" },
  ];

  return (
    <div>
      {/* Dynamic Calculator Panel */}
      <div style={{
        background: "linear-gradient(135deg, #161616, #0e0e0e)",
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 22,
        marginBottom: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>🧮</span>
          <span style={{
            fontSize: 11,
            color: accent,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            Belly Fat Loss Calculator
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Weight Slider */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: "#aaa" }}>Current Weight</span>
              <span style={{ fontFamily: font.mono, color: "#fff", fontWeight: 700 }}>{weight} kg</span>
            </div>
            <input
              type="range"
              min="70"
              max="130"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </div>

          {/* Height Slider */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: "#aaa" }}>Height</span>
              <span style={{ fontFamily: font.mono, color: "#fff", fontWeight: 700 }}>{height} cm</span>
            </div>
            <input
              type="range"
              min="150"
              max="210"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#50e3c2" }}
            />
          </div>

          {/* Activity dropdown & Deficit Toggle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: muted, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                style={{
                  width: "100%",
                  background: "#0f0f0f",
                  border: `1px solid ${border}`,
                  borderRadius: radius.md,
                  padding: "8px 10px",
                  color: "#fff",
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                <option value="light">Lightly Active (1-2 days/wk)</option>
                <option value="moderate">Moderately Active (3-5 days/wk)</option>
                <option value="heavy">Highly Active (6-7 days/wk)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: 11, color: muted, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Deficit Intensity</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setDeficit("moderate")}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    background: deficit === "moderate" ? `${accent}18` : "#0f0f0f",
                    border: `1px solid ${deficit === "moderate" ? accent : border}`,
                    borderRadius: radius.md,
                    color: deficit === "moderate" ? "#fff" : "#777",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: transition.fast,
                  }}
                >
                  Safe (-500)
                </button>
                <button
                  onClick={() => setDeficit("aggressive")}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    background: deficit === "aggressive" ? `${accent}18` : "#0f0f0f",
                    border: `1px solid ${deficit === "aggressive" ? accent : border}`,
                    borderRadius: radius.md,
                    color: deficit === "aggressive" ? "#fff" : "#777",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: transition.fast,
                  }}
                >
                  Aggressive (-750)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: s.highlight
                ? `linear-gradient(135deg, ${accent}22, ${accent}11)`
                : card,
              borderRadius: radius.lg,
              padding: "18px 16px",
              border: s.highlight
                ? `1px solid ${accent}44`
                : `1px solid ${border}`,
              boxShadow: shadow.sm,
              cursor: "default",
              transition: transition.base,
              animation: `fadeInUp 0.4s ease ${i * 0.07}s both`,
            }}
            onMouseEnter={(e) => {
              if (!s.highlight) e.currentTarget.style.background = cardHover;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = shadow.md;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = s.highlight
                ? `linear-gradient(135deg, ${accent}22, ${accent}11)`
                : card;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = shadow.sm;
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span style={{
                fontSize: 10,
                color: muted,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontFamily: font.mono,
                fontWeight: 500,
              }}>
                {s.label}
              </span>
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: s.highlight ? accent : "#f0f0f0",
              fontFamily: font.body,
            }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Protein Sources */}
      <div style={{
        background: "linear-gradient(135deg, #0a1a00, #051000)",
        border: "1px solid #1a4000",
        borderRadius: radius.lg,
        padding: 20,
        marginBottom: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>🌿</span>
          <span style={{
            fontSize: 11,
            color: "#2ecc71",
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            Your Egg-Free Protein Sources
          </span>
        </div>

        {proteinSources.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 0",
              borderBottom: i < proteinSources.length - 1 ? "1px solid #1a2a10" : "none",
              transition: transition.fast,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#e0e0e0" }}>{p.source}</div>
              <div style={{ fontSize: 11, color: "#6a8a5a", marginTop: 3 }}>{p.note}</div>
            </div>
            <div style={{
              color: "#2ecc71",
              fontFamily: font.mono,
              fontSize: 16,
              fontWeight: 700,
              background: "rgba(46,204,113,0.08)",
              padding: "4px 12px",
              borderRadius: radius.sm,
              border: "1px solid rgba(46,204,113,0.15)",
            }}>
              {p.protein}
            </div>
          </div>
        ))}
      </div>

      {/* Doctor's Note */}
      <div style={{
        background: "linear-gradient(135deg, #1a0800, #120500)",
        border: `1px solid ${accent}33`,
        borderRadius: radius.lg,
        padding: 20,
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
        boxShadow: shadow.sm,
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(180deg, ${accent}, ${accent}88)`,
          borderRadius: "0 2px 2px 0",
        }} />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 16 }}>📋</span>
          <span style={{
            fontSize: 11,
            color: accent,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            Doctor's Note
          </span>
        </div>
        <p style={{ margin: "0 0 10px", lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>
          Chicken is actually <strong style={{ color: "#fff" }}>superior to eggs</strong> — 100g chicken breast gives 31g protein vs 13g in 2 eggs. Combined with your natural love for sprouts bhel, you have two excellent daily protein anchors without any eggs.
        </p>
        <p style={{ margin: 0, lineHeight: 1.8, color: "#bbb", fontSize: 14 }}>
          All meals now use chicken, paneer, dal, and sprouts — foods that integrate seamlessly with Indian home cooking.
        </p>
      </div>

      {/* Weekly Workout Split */}
      <div style={{
        background: card,
        borderRadius: radius.lg,
        padding: 20,
        border: `1px solid ${border}`,
        boxShadow: shadow.sm,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 16 }}>📅</span>
          <span style={{
            fontSize: 11,
            color: accent,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            Weekly Workout Split
          </span>
        </div>

        {days.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              padding: "12px 0",
              borderBottom: i < days.length - 1 ? `1px solid ${border}` : "none",
              transition: transition.fast,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
          >
            {/* Color indicator with glow */}
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: d.color,
              flexShrink: 0,
              boxShadow: `0 0 8px ${d.color}44`,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{d.day}</div>
              <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{d.focus}</div>
            </div>
            {/* Small pill for training/rest */}
            <span style={{
              fontSize: 9,
              padding: "3px 10px",
              borderRadius: 9999,
              background: i === 6 ? "#2a2a2a" : `${d.color}18`,
              border: `1px solid ${i === 6 ? "#3a3a3a" : `${d.color}44`}`,
              color: i === 6 ? "#666" : d.color,
              fontFamily: font.mono,
              fontWeight: 600,
              letterSpacing: 0.5,
              flexShrink: 0,
            }}>
              {i === 6 ? "REST" : "TRAIN"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
