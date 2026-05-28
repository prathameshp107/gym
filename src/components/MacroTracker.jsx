import { useState, useEffect, useCallback } from "react";
import { accent, muted, font, radius, border, shadow, card, cardHover, transition, borderLight } from "../data/theme";
import { QUICK_MEALS, getDayMacros, addFoodToDay, removeFoodFromDay } from "../utils/storage";

const macroColors = {
  calories: accent,
  protein: "#7b68ee",
  carbs: "#f5a623",
  fat: "#50e3c2",
};

const macroLabels = {
  calories: "Calories",
  protein: "Protein",
  carbs: "Carbs",
  fat: "Fat",
};

const macroUnits = {
  calories: "kcal",
  protein: "g",
  carbs: "g",
  fat: "g",
};

const mealCategories = [
  { id: "chicken", icon: "🍗", label: "Chicken" },
  { id: "paneer", icon: "🧀", label: "Paneer" },
  { id: "veg", icon: "🌱", label: "Veg" },
  { id: "protein", icon: "💪", label: "Protein" },
  { id: "carbs", icon: "🌾", label: "Carbs" },
];

export default function MacroTracker({ calorieGoal, proteinGoal }) {
  const today = new Date().toISOString().slice(0, 10);
  const [dayData, setDayData] = useState(() => getDayMacros(today));
  const [activeCategory, setActiveCategory] = useState("chicken");
  const [showCustom, setShowCustom] = useState(false);
  const [custom, setCustom] = useState({ label: "", cal: "", p: "", c: "", f: "" });

  // Refresh on mount and when day changes
  useEffect(() => {
    setDayData(getDayMacros(today));
  }, [today]);

  const logFood = useCallback((meal) => {
    const updated = addFoodToDay(today, meal);
    if (updated) setDayData(updated);
  }, [today]);

  const removeFood = useCallback((id) => {
    const updated = removeFoodFromDay(today, id);
    if (updated) setDayData(updated);
  }, [today]);

  const handleCustomAdd = (e) => {
    e.preventDefault();
    if (!custom.label || !custom.cal) return;
    const item = {
      label: custom.label,
      cal: parseFloat(custom.cal) || 0,
      p: parseFloat(custom.p) || 0,
      c: parseFloat(custom.c) || 0,
      f: parseFloat(custom.f) || 0,
      meal: "custom",
    };
    logFood(item);
    setCustom({ label: "", cal: "", p: "", c: "", f: "" });
    setShowCustom(false);
  };

  const t = dayData.totals;
  const carbGoal = Math.round(calorieGoal * 0.4 / 4);   // 40% carbs, 4 cal/g
  const fatGoal = Math.round(calorieGoal * 0.25 / 9);   // 25% fat, 9 cal/g

  const macros = [
    { key: "calories", current: t.calories, goal: calorieGoal, color: macroColors.calories },
    { key: "protein",  current: t.protein,  goal: proteinGoal, color: macroColors.protein },
    { key: "carbs",    current: t.carbs,    goal: carbGoal,    color: macroColors.carbs },
    { key: "fat",      current: t.fat,      goal: fatGoal,     color: macroColors.fat },
  ];

  const filteredMeals = QUICK_MEALS.filter(m => m.meal === activeCategory || activeCategory === "all");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Macro Progress Bars */}
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
          marginBottom: 14,
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
            Today's Macros
          </span>
          <span style={{
            marginLeft: "auto",
            fontSize: 11,
            color: muted,
            fontFamily: font.mono,
          }}>
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {macros.map(m => {
            const pct = Math.min(100, Math.round((m.current / m.goal) * 100));
            const isOver = m.current >= m.goal;
            return (
              <div key={m.key}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 4,
                }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    {macroLabels[m.key]}
                  </span>
                  <span style={{
                    fontFamily: font.mono,
                    fontWeight: 700,
                    color: isOver ? "#2ecc71" : "#fff",
                  }}>
                    {m.current}{macroUnits[m.key]} / {m.goal}{macroUnits[m.key]}
                  </span>
                </div>
                <div style={{
                  height: 6,
                  borderRadius: 3,
                  background: "#2a2a2a",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${pct}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: isOver
                      ? "linear-gradient(90deg, #2ecc71, #27ae60)"
                      : `linear-gradient(90deg, ${m.color}, ${m.color}cc)`,
                    transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: `0 0 8px ${m.color}44`,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Add Meals */}
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
          justifyContent: "space-between",
          marginBottom: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🍽️</span>
            <span style={{
              fontSize: 10,
              color: accent,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: font.mono,
              fontWeight: 600,
            }}>
              Log Food
            </span>
          </div>
          <button
            onClick={() => setShowCustom(!showCustom)}
            style={{
              padding: "5px 12px",
              borderRadius: radius.pill,
              border: `1px solid ${border}`,
              background: "transparent",
              color: muted,
              fontSize: 10,
              fontFamily: font.mono,
              cursor: "pointer",
              transition: transition.fast,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#aaa"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = muted; }}
          >
            + Custom
          </button>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
          {mealCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "6px 12px",
                borderRadius: radius.pill,
                border: `1px solid ${activeCategory === cat.id ? accent : border}`,
                background: activeCategory === cat.id ? `${accent}18` : "transparent",
                color: activeCategory === cat.id ? "#fff" : "#888",
                fontSize: 11,
                fontFamily: font.mono,
                fontWeight: activeCategory === cat.id ? 600 : 400,
                cursor: "pointer",
                transition: transition.fast,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Quick meal buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 6 }}>
          {filteredMeals.map((meal, i) => (
            <button
              key={i}
              onClick={() => logFood(meal)}
              style={{
                padding: "8px 12px",
                borderRadius: radius.md,
                border: `1px solid ${border}`,
                background: "rgba(255,255,255,0.02)",
                color: "#ccc",
                fontSize: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: transition.fast,
                fontFamily: font.body,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = borderLight; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = border; }}
            >
              <div style={{ fontWeight: 500, marginBottom: 3 }}>{meal.label}</div>
              <div style={{
                display: "flex",
                gap: 6,
                fontSize: 9,
                fontFamily: font.mono,
                color: muted,
              }}>
                <span style={{ color: macroColors.calories }}>{meal.cal}cal</span>
                <span style={{ color: macroColors.protein }}>{meal.p}gP</span>
                <span style={{ color: macroColors.carbs }}>{meal.c}gC</span>
                <span style={{ color: macroColors.fat }}>{meal.f}gF</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom food entry */}
        {showCustom && (
          <form onSubmit={handleCustomAdd} style={{
            marginTop: 12,
            padding: 14,
            background: "#0f0f0f",
            borderRadius: radius.md,
            border: `1px solid ${border}`,
            animation: "slideDown 0.25s ease",
          }}>
            <div style={{ fontSize: 11, color: muted, fontFamily: font.mono, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Custom Food Entry
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 6, marginBottom: 10 }}>
              <input
                placeholder="Food name"
                value={custom.label}
                onChange={e => setCustom(p => ({ ...p, label: e.target.value }))}
                required
                style={{
                  background: "#0a0a0a",
                  border: `1px solid ${border}`,
                  borderRadius: radius.sm,
                  padding: "7px 10px",
                  color: "#fff",
                  fontSize: 12,
                  fontFamily: font.body,
                }}
              />
              <input placeholder="Cal" type="number" step="1" value={custom.cal}
                onChange={e => setCustom(p => ({ ...p, cal: e.target.value }))}
                style={{ background: "#0a0a0a", border: `1px solid ${border}`, borderRadius: radius.sm, padding: "7px 10px", color: "#fff", fontSize: 12, fontFamily: font.mono }} />
              <input placeholder="P(g)" type="number" step="0.1" value={custom.p}
                onChange={e => setCustom(p => ({ ...p, p: e.target.value }))}
                style={{ background: "#0a0a0a", border: `1px solid ${border}`, borderRadius: radius.sm, padding: "7px 10px", color: "#fff", fontSize: 12, fontFamily: font.mono }} />
              <input placeholder="C(g)" type="number" step="0.1" value={custom.c}
                onChange={e => setCustom(p => ({ ...p, c: e.target.value }))}
                style={{ background: "#0a0a0a", border: `1px solid ${border}`, borderRadius: radius.sm, padding: "7px 10px", color: "#fff", fontSize: 12, fontFamily: font.mono }} />
              <input placeholder="F(g)" type="number" step="0.1" value={custom.f}
                onChange={e => setCustom(p => ({ ...p, f: e.target.value }))}
                style={{ background: "#0a0a0a", border: `1px solid ${border}`, borderRadius: radius.sm, padding: "7px 10px", color: "#fff", fontSize: 12, fontFamily: font.mono }} />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowCustom(false)}
                style={{ padding: "7px 14px", background: "transparent", border: `1px solid ${border}`, borderRadius: radius.md, color: muted, fontSize: 11, cursor: "pointer" }}>
                Cancel
              </button>
              <button type="submit"
                style={{ padding: "7px 18px", background: `linear-gradient(135deg, ${accent}, ${accent}dd)`, border: "none", borderRadius: radius.md, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                Add Food
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Logged Items */}
      <div style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
      }}>
        <span style={{
          fontSize: 10,
          color: muted,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: font.mono,
          fontWeight: 600,
        }}>
          Today's Food Log
        </span>

        {dayData.meals.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px 0", color: muted, fontSize: 13 }}>
            No food logged yet. Tap a meal above to get started.
          </div>
        ) : (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {dayData.meals.map(item => (
              <div key={item.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: radius.sm,
                border: `1px solid ${border}`,
                transition: transition.fast,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ display: "flex", gap: 8, fontSize: 10, fontFamily: font.mono, color: muted, marginTop: 2 }}>
                    <span style={{ color: macroColors.calories }}>{item.cal}cal</span>
                    <span style={{ color: macroColors.protein }}>{item.p}gP</span>
                    <span style={{ color: macroColors.carbs }}>{item.c}gC</span>
                    <span style={{ color: macroColors.fat }}>{item.f}gF</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFood(item.id)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: `1px solid #4a0000`,
                    background: "rgba(232,69,69,0.1)",
                    color: accent,
                    fontSize: 11,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: transition.fast,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,69,69,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,69,69,0.1)"; }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
