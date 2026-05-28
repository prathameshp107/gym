import { card, muted, shadow, radius, font, transition, border, accent } from "../data/theme";
import { tagMeta } from "../data/nutrition";

const legendItems = [
  { label: "🍗 Chicken", bg: "#1a0a00", border: "#6b3a00", text: "#f5a623" },
  { label: "🌿 Veg",     bg: "#001a08", border: "#0a4020", text: "#2ecc71" },
  { label: "❌ Remove",  bg: "#1a0000", border: "#4a0000", text: "#e84545" },
];

const mealColors = ["#e84545", "#f5a623", "#50e3c2", "#7b68ee", "#2ecc71", "#e84545"];

// Interactive meal definitions with values
const mealData = [
  {
    time: "7:30 AM – Pre-Workout Boost",
    icon: "☀️",
    label: "Wake-Up Boost",
    tip: "Have 30 min before gym. Banana gives energy, coffee boosts fat burning during workout.",
    fixed: [
      { food: "Soaked Almonds", qty: "5–6 nos", tag: "veg", note: "Good fats + energy", p: 2 },
      { food: "Black Coffee / Green Tea", qty: "1 cup", tag: "veg", note: "No sugar – natural fat burner", p: 0 },
      { food: "Banana", qty: "1 medium", tag: "veg", note: "Quick carbs before workout", p: 1.5 }
    ],
    swaps: []
  },
  {
    time: "9:00 AM – Breakfast",
    icon: "🍳",
    label: "High-Protein Breakfast",
    tip: "Chicken keema bhaji replaces eggs perfectly. Cook in batches on Sunday for the whole week.",
    fixed: [
      { food: "Wheat Roti", qty: "2 nos", tag: "veg", note: "Same as now – keep it", p: 6 },
      { food: "Curd / Dahi", qty: "150g bowl", tag: "veg", note: "Always include – adds 8g protein", p: 8 }
    ],
    swaps: [
      { label: "🍗 Chicken Keema Bhaji", food: "Chicken Keema Bhaji", qty: "120g", tag: "chicken", note: "Cook with onion, tomato, minimal oil. BEST option.", p: 31 },
      { label: "🌿 Paneer Bhurji", food: "Paneer Bhurji", qty: "100g", tag: "veg", note: "Veg alternative", p: 18 },
      { label: "🌿 Moong Dal Chilla", food: "Moong Dal Chilla", qty: "2 chillas", tag: "veg", note: "High protein dal alternative", p: 12 }
    ]
  },
  {
    time: "1:00 PM – Lunch",
    icon: "🍱",
    label: "Balanced Power Lunch",
    tip: "Eating salad first is the secret key to feeling full with fewer rotis and maintaining calorie deficits.",
    fixed: [
      { food: "Wheat Roti", qty: "3 nos (↓ from 4)", tag: "veg", note: "Reduced by 1 roti to cut carbs", p: 9 },
      { food: "Vegetable Sabji", qty: "1 bowl", tag: "veg", note: "Keep as is", p: 2 },
      { food: "Rice", qty: "½ small bowl", tag: "veg", note: "Halved current intake to optimize fat loss", p: 2 },
      { food: "Salad (cucumber, onion, tomato)", qty: "1 plate", tag: "veg", note: "Eat FIRST before the meal", p: 0 }
    ],
    swaps: [
      { label: "🍗 Chicken Curry", food: "Chicken Curry / Dry Sabji", qty: "150g", tag: "chicken", note: "Low-oil, home-cooked.", p: 35 },
      { label: "🌿 Toor / Masoor Dal", food: "Toor / Masoor Dal", qty: "1 large bowl", tag: "veg", note: "Non-chicken days – essential protein", p: 12 }
    ]
  },
  {
    time: "4:00 PM – Afternoon Snack",
    icon: "🌱",
    label: "Sprouts Bhel (Your Favourite!)",
    tip: "Sprouts bhel is PERFECT for fat loss – high protein, high fibre, and very low calorie!",
    fixed: [
      { food: "Buttermilk (Chaas)", qty: "1 glass", tag: "veg", note: "Jeera + salt. Protein + probiotic.", p: 3 }
    ],
    swaps: [
      { label: "🌱 Moong Sprouts Bhel", food: "Moong Sprouts Bhel", qty: "1 large bowl", tag: "veg", note: "Sprouts + onion + tomato + lemon", p: 9 },
      { label: "🌱 Sprouts + Kala Chana", food: "Sprouts + Kala Chana Chaat", qty: "1 bowl", tag: "veg", note: "Even higher protein density", p: 14 }
    ]
  },
  {
    time: "6:30 PM – Evening Protein",
    icon: "💪",
    label: "Muscle-Building Snack",
    tip: "This snack feeds muscles post-workout and reduces dinner appetite dramatically.",
    fixed: [],
    swaps: [
      { label: "🍗 Grilled Chicken Strips", food: "Grilled / Tawa Chicken Strips", qty: "100g", tag: "chicken", note: "Marinate in curd + spices, dry grill", p: 31 },
      { label: "🧀 Paneer Tikka (Tawa)", food: "Paneer Tikka (Tawa)", qty: "100g", tag: "veg", note: "Paneer marinated in curd + spices", p: 18 },
      { label: "🌱 Sprouts Chaat", food: "Sprouts Chaat", qty: "1 bowl", tag: "veg", note: "Moong + kala chana + lemon", p: 9 }
    ]
  },
  {
    time: "9:00 PM – Dinner",
    icon: "🌙",
    label: "Light & Lean Dinner",
    tip: "Removing dinner rice alone saves 300 calories daily. Replace with raita and soup.",
    fixed: [
      { food: "Wheat Roti", qty: "2 nos (↓ from 3)", tag: "veg", note: "Reduced by 1 roti", p: 6 },
      { food: "RICE", qty: "❌ REMOVE", tag: "remove", note: "No rice at night – critical for belly fat reduction!", p: 0 },
      { food: "Raita / Salad", qty: "1 bowl", tag: "veg", note: "Curd + cucumber + jeera. Eat first.", p: 4 }
    ],
    swaps: [
      { label: "🍗 Chicken Soup", food: "Chicken Soup / Light Sabji", qty: "100g", tag: "chicken", note: "Light, high protein breast chicken", p: 24 },
      { label: "🌿 Dal + Sabji", food: "Dal + Sabji", qty: "1 bowl each", tag: "veg", note: "On days you had chicken twice already", p: 10 }
    ]
  }
];

export default function MealTab({
  expandedMeal,
  setExpandedMeal,
  mealSelections = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  setMealSelections,
  proteinGoal = 150
}) {
  
  // Calculate total selected protein
  let totalProtein = 0;
  mealData.forEach((m, idx) => {
    // Add fixed protein
    m.fixed.forEach(item => { totalProtein += item.p; });
    // Add swapped protein
    if (m.swaps.length > 0) {
      const selectedIdx = mealSelections[idx] || 0;
      const selectedSwap = m.swaps[selectedIdx] || m.swaps[0];
      totalProtein += selectedSwap.p;
    }
  });

  totalProtein = Math.round(totalProtein);
  const proteinPercent = Math.min(100, Math.round((totalProtein / proteinGoal) * 100));
  const isGoalMet = totalProtein >= proteinGoal;

  const handleSwapSelection = (mealIdx, swapIdx) => {
    setMealSelections(prev => ({
      ...prev,
      [mealIdx]: swapIdx
    }));
  };

  return (
    <div>
      {/* Legend */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {legendItems.map((item) => (
          <span key={item.label} style={{
            padding: "4px 12px",
            borderRadius: radius.pill,
            background: item.bg,
            border: `1px solid ${item.border}`,
            fontSize: 10,
            color: item.text,
            fontFamily: font.mono,
            letterSpacing: 0.5,
            fontWeight: 500,
          }}>
            {item.label}
          </span>
        ))}
      </div>

      {/* Dynamic Protein Goal Banner */}
      <div style={{
        background: isGoalMet ? "linear-gradient(135deg, #09200f, #05140a)" : "linear-gradient(135deg, #1b1609, #110e05)",
        border: `1px solid ${isGoalMet ? "#2ecc7155" : "#f5a62355"}`,
        borderRadius: radius.lg,
        padding: "18px 20px",
        marginBottom: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🎯</span>
            <span style={{
              fontSize: 10.5,
              color: isGoalMet ? "#2ecc71" : "#f5a623",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 700,
            }}>
              Interactive Protein Planner
            </span>
          </div>
          <span style={{
            fontSize: 12,
            fontFamily: font.mono,
            fontWeight: 700,
            color: isGoalMet ? "#2ecc71" : "#f5a623",
          }}>
            {totalProtein}g / {proteinGoal}g Goal
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: 8,
          borderRadius: 4,
          background: "#2a2a2a",
          overflow: "hidden",
          marginBottom: 8,
        }}>
          <div style={{
            width: `${proteinPercent}%`,
            height: "100%",
            background: isGoalMet ? "linear-gradient(90deg, #2ecc71, #27ae60)" : "linear-gradient(90deg, #f5a623, #d35400)",
            transition: "width 0.4s ease",
          }} />
        </div>

        <div style={{ fontSize: 12, color: "#aaa" }}>
          {isGoalMet ? (
            <span style={{ color: "#7ec897" }}>🎉 <strong>Awesome!</strong> Your current selection fully meets your customized visceral fat reduction protein target!</span>
          ) : (
            <span style={{ color: "#d9a05b" }}>💡 <strong>Protein Gap:</strong> Swap vegetarian alternatives back to Chicken, or log a Whey Shake (+25g) to hit your muscle retention threshold.</span>
          )}
        </div>
      </div>

      {/* Meal Cards */}
      {mealData.map((m, i) => {
        const isExpanded = expandedMeal === i;
        const selectedSwapIdx = mealSelections[i] || 0;
        const currentSwap = m.swaps[selectedSwapIdx];

        // Gather display items (Fixed + Selected Swap)
        const displayItems = [...m.fixed];
        if (currentSwap) {
          // Put the selected swap in the corresponding slot
          displayItems.splice(1, 0, {
            food: currentSwap.food,
            qty: currentSwap.qty,
            tag: currentSwap.tag,
            note: currentSwap.note
          });
        }

        return (
          <div
            key={i}
            style={{
              background: card,
              borderRadius: radius.lg,
              border: `1px solid ${isExpanded ? "#444" : border}`,
              marginBottom: 12,
              overflow: "hidden",
              transition: transition.base,
              boxShadow: isExpanded ? shadow.md : shadow.sm,
            }}
          >
            {/* Meal Header (clickable) */}
            <button
              onClick={() => setExpandedMeal(isExpanded ? null : i)}
              style={{
                width: "100%",
                padding: "16px 18px",
                cursor: "pointer",
                display: "flex",
                gap: 14,
                alignItems: "center",
                background: "none",
                border: "none",
                color: "#f0f0f0",
                fontFamily: font.body,
                textAlign: "left",
                transition: transition.fast,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              {/* Icon with colored background */}
              <div style={{
                width: 42,
                height: 42,
                borderRadius: radius.md,
                background: isExpanded ? `${mealColors[i]}22` : "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
                border: `1px solid ${isExpanded ? `${mealColors[i]}44` : border}`,
                transition: transition.base,
              }}>
                {m.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 11,
                  color: muted,
                  fontFamily: font.mono,
                  letterSpacing: 0.5,
                }}>
                  {m.time}
                </div>
                <div style={{
                  fontWeight: 600,
                  fontSize: 15,
                  marginTop: 3,
                  color: isExpanded ? "#fff" : "#ccc",
                  transition: transition.fast,
                }}>
                  {m.label}
                </div>
              </div>

              {/* Chevron */}
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: muted,
                fontSize: 12,
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}>
                ▼
              </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
              <div style={{
                padding: "0 18px 18px",
                animation: "slideDown 0.3s ease",
              }}>
                {/* Swap Options Selector */}
                {m.swaps.length > 0 && (
                  <div style={{
                    background: "#0f0f0f",
                    borderRadius: radius.md,
                    padding: 10,
                    marginBottom: 14,
                    border: `1px solid ${border}`,
                  }}>
                    <span style={{ fontSize: 10.5, color: muted, display: "block", marginBottom: 8, fontFamily: font.mono, textTransform: "uppercase" }}>
                      Choose Protein Option:
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {m.swaps.map((opt, sIdx) => {
                        const isSelected = selectedSwapIdx === sIdx;
                        const t = tagMeta[opt.tag];
                        return (
                          <button
                            key={sIdx}
                            onClick={() => handleSwapSelection(i, sIdx)}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 12px",
                              background: isSelected ? `${t.bg}cc` : "transparent",
                              border: `1px solid ${isSelected ? t.border : border}`,
                              borderRadius: radius.sm,
                              color: isSelected ? "#fff" : "#888",
                              fontSize: 12,
                              fontWeight: isSelected ? 600 : 400,
                              cursor: "pointer",
                              transition: transition.fast,
                              textAlign: "left",
                            }}
                            onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                            onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                          >
                            <span>{opt.label}</span>
                            <span style={{ fontFamily: font.mono, color: t.text, fontWeight: 700 }}>
                              +{opt.p}g Protein
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Render Final Plate List */}
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: 10, marginBottom: 14 }}>
                  {displayItems.map((item, j) => {
                    const t = tagMeta[item.tag] || tagMeta.veg;
                    return (
                      <div
                        key={j}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          padding: "10px 0",
                          borderBottom: j < displayItems.length - 1 ? `1px solid ${border}` : "none",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{item.food}</span>
                            <span style={{
                              fontSize: 9,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              background: t.bg,
                              border: `1px solid ${t.border}`,
                              color: t.text,
                              fontFamily: font.mono,
                              fontWeight: 600,
                            }}>
                              {t.emoji}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: muted, marginTop: 3 }}>{item.note}</div>
                        </div>
                        <div style={{
                          fontSize: 13,
                          color: "#2ecc71",
                          fontFamily: font.mono,
                          fontWeight: 600,
                          textAlign: "right",
                          paddingLeft: 12,
                          whiteSpace: "nowrap",
                          background: "rgba(46,204,113,0.06)",
                          padding: "4px 10px",
                          borderRadius: radius.sm,
                          border: "1px solid rgba(46,204,113,0.12)",
                        }}>
                          {item.qty}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tip */}
                <div style={{
                  background: "linear-gradient(135deg, #0a2010, #051808)",
                  borderRadius: radius.md,
                  padding: "12px 14px",
                  fontSize: 13,
                  color: "#7ec897",
                  lineHeight: 1.6,
                  border: "1px solid rgba(46,204,113,0.15)",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
                  <span>{m.tip}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
