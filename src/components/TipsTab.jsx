import { accent, card, muted, shadow, radius, font, transition, border } from "../data/theme";
import { doctorTips } from "../data/nutrition";

const milestones = [
  { week: "Week 1–2", desc: "Build routine: remove night rice, add chicken/sprouts to every meal", progress: 25 },
  { week: "Week 3–4", desc: "2–3 kg lost, less bloating, visible energy boost", progress: 50 },
  { week: "Week 5–6", desc: "5–6 kg lost, waistline reducing, endurance improving", progress: 75 },
  { week: "Week 7–8", desc: "7–10 kg total loss, defined body, wedding-ready physique ✓", progress: 100 },
];

export default function TipsTab() {
  return (
    <div>
      {/* Doctor's Recommendations */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
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
          Doctor's Recommendations
        </span>
      </div>

      {doctorTips.map((t, i) => (
        <div
          key={i}
          style={{
            background: card,
            borderRadius: radius.lg,
            padding: "16px 18px",
            marginBottom: 12,
            border: `1px solid ${border}`,
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            boxShadow: shadow.sm,
            transition: transition.base,
            animation: `fadeInUp 0.35s ease ${i * 0.08}s both`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${accent}44`;
            e.currentTarget.style.boxShadow = shadow.md;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.boxShadow = shadow.sm;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            width: 48,
            height: 48,
            borderRadius: radius.md,
            background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            flexShrink: 0,
            border: `1px solid ${accent}22`,
          }}>
            {t.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{t.title}</div>
            <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7 }}>{t.body}</div>
          </div>
        </div>
      ))}

      {/* 2-Month Milestones */}
      <div style={{
        background: "linear-gradient(135deg, #1a0800, #1a0500)",
        border: `1px solid ${accent}44`,
        borderRadius: radius.lg,
        padding: 22,
        marginBottom: 16,
        boxShadow: shadow.sm,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 18,
        }}>
          <span style={{ fontSize: 16 }}>📈</span>
          <span style={{
            fontSize: 11,
            color: accent,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontFamily: font.mono,
            fontWeight: 600,
          }}>
            2-Month Milestones
          </span>
        </div>

        {milestones.map((m, i) => (
          <div key={i} style={{ marginBottom: i < milestones.length - 1 ? 18 : 0 }}>
            <div style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}>
              {/* Progress circle */}
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `conic-gradient(${accent} ${m.progress}%, #2a2a2a ${m.progress}%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#1a0800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontFamily: font.mono,
                  fontWeight: 700,
                  color: accent,
                }}>
                  {i + 1}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: accent,
                  fontFamily: font.mono,
                  letterSpacing: 0.3,
                }}>
                  {m.week}
                </div>
                <div style={{
                  fontSize: 13,
                  color: "#ccc",
                  lineHeight: 1.5,
                  marginTop: 3,
                }}>
                  {m.desc}
                </div>
                {/* Progress bar */}
                <div style={{
                  marginTop: 8,
                  height: 4,
                  borderRadius: 2,
                  background: "#2a2a2a",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${m.progress}%`,
                    height: "100%",
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                    transition: "width 0.6s ease",
                    animation: i === milestones.length - 1 ? "pulse-glow 2s ease infinite" : "none",
                  }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        background: "linear-gradient(135deg, #0a0a1a, #080818)",
        border: "1px solid #1a1a3a",
        borderRadius: radius.lg,
        padding: "16px 18px",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
        <div style={{
          fontSize: 13,
          color: "#777",
          lineHeight: 1.7,
          fontStyle: "italic",
        }}>
          <strong style={{ color: "#999" }}>Disclaimer:</strong> All egg items have been removed. If you have additional allergies, please disclose them. Consult a physician before starting any new exercise or diet program.
        </div>
      </div>
    </div>
  );
}
