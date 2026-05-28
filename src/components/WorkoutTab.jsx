import { card, cardHover, muted, shadow, radius, font, transition, border } from "../data/theme";
import { days } from "../data/exercises";
import MuscleBadge from "./MuscleBadge";
import ExerciseDemo from "./ExerciseDemo";

export default function WorkoutTab({ activeDay, setActiveDay }) {
  const d = days[activeDay];

  return (
    <div>
      {/* Info Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0a1020, #080818)",
        border: "1px solid #1a2040",
        borderRadius: radius.lg,
        padding: "14px 18px",
        marginBottom: 20,
        display: "flex",
        gap: 14,
        alignItems: "center",
        boxShadow: shadow.sm,
      }}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "rgba(123,104,238,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
        }}>
          🎬
        </div>
        <div>
          <div style={{ fontSize: 14, color: "#e0e0e0", fontWeight: 600 }}>Professional HD Exercise Demos</div>
          <div style={{ fontSize: 12, color: muted, marginTop: 3 }}>
            Tap <span style={{ color: "#bbb", fontWeight: 600, fontFamily: font.mono, fontSize: 11 }}>WATCH DEMO</span> on any exercise
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {days.map((day, i) => {
          const isActive = activeDay === i;
          return (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                padding: "8px 14px",
                borderRadius: radius.pill,
                border: `1.5px solid ${isActive ? day.color : border}`,
                background: isActive
                  ? `linear-gradient(135deg, ${day.color}22, ${day.color}11)`
                  : "transparent",
                color: isActive ? day.color : "#666",
                fontFamily: font.mono,
                fontSize: 11,
                fontWeight: isActive ? 600 : 400,
                letterSpacing: 0.5,
                cursor: "pointer",
                transition: transition.base,
                boxShadow: isActive ? `0 0 16px ${day.color}22` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "#999";
                  e.currentTarget.style.borderColor = "#555";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#666";
                  e.currentTarget.style.borderColor = border;
                }
              }}
            >
              {i === 0 ? "Mon" : i === 1 ? "Tue" : i === 2 ? "Wed" : i === 3 ? "Thu" : i === 4 ? "Fri" : i === 5 ? "Sat" : "Sun"}
            </button>
          );
        })}
      </div>

      {/* Active Day Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
        padding: "14px 18px",
        background: `${d.color}08`,
        borderRadius: radius.lg,
        border: `1px solid ${d.color}22`,
      }}>
        <div style={{
          width: 4,
          height: 36,
          background: `linear-gradient(180deg, ${d.color}, ${d.color}66)`,
          borderRadius: 2,
        }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, fontFamily: font.display, letterSpacing: -0.3 }}>{d.day}</div>
          <div style={{ color: d.color, fontSize: 12, fontFamily: font.mono, marginTop: 4, letterSpacing: 0.5 }}>
            {d.focus}
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 28, opacity: 0.3 }}>
          {activeDay === 0 ? "💪" : activeDay === 1 ? "🔥" : activeDay === 2 ? "🦵" : activeDay === 3 ? "🧘" : activeDay === 4 ? "⚡" : activeDay === 5 ? "🚀" : "😴"}
        </div>
      </div>

      {/* Exercise Cards */}
      {d.exercises.map((ex, i) => (
        <div
          key={i}
          style={{
            background: card,
            borderRadius: radius.lg,
            padding: "16px 18px",
            marginBottom: 12,
            border: `1px solid ${border}`,
            boxShadow: shadow.sm,
            transition: transition.base,
            animation: `fadeInUp 0.3s ease ${i * 0.05}s both`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = cardHover;
            e.currentTarget.style.boxShadow = shadow.md;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = card;
            e.currentTarget.style.boxShadow = shadow.sm;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 600, fontSize: 14.5 }}>{ex.name}</span>
                {ex.muscle && <MuscleBadge muscle={ex.muscle} color={d.color} />}
              </div>
              {ex.note && (
                <div style={{
                  fontSize: 12,
                  color: muted,
                  marginTop: 5,
                  fontStyle: "italic",
                }}>
                  {ex.note}
                </div>
              )}
            </div>
            <div style={{
              fontSize: 13,
              color: d.color,
              fontFamily: font.mono,
              fontWeight: 600,
              textAlign: "right",
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: `${d.color}10`,
              padding: "4px 12px",
              borderRadius: radius.sm,
              border: `1px solid ${d.color}22`,
            }}>
              {ex.sets} × {ex.reps}
            </div>
          </div>
          <ExerciseDemo name={ex.name} color={d.color} />
        </div>
      ))}

      {/* Cardio Section */}
      {d.cardio && (
        <div style={{
          background: `linear-gradient(135deg, ${d.color}10, ${d.color}05)`,
          border: `1px solid ${d.color}33`,
          borderRadius: radius.lg,
          padding: "16px 18px",
          marginTop: 4,
          boxShadow: shadow.sm,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 14 }}>🏃</span>
            <span style={{
              fontSize: 10,
              color: d.color,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 600,
            }}>
              Cardio
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, paddingLeft: 22 }}>{d.cardio}</div>
        </div>
      )}
    </div>
  );
}
