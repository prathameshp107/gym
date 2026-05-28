// Persistence layer for streaks, macro logs, and daily progress.
// All keys are namespaced under "gym_".

const NS = "gym_";

function get(key) {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function set(key, val) {
  try { localStorage.setItem(NS + key, JSON.stringify(val)); } catch { /* storage full */ }
}

// ─── Streaks ────────────────────────────────────────────────────────────────

const STREAK_KEY = "streaks";

export function loadStreaks() {
  return get(STREAK_KEY) || {
    workout: { count: 0, lastDate: null },
    water:   { count: 0, lastDate: null },
    sleep:   { count: 0, lastDate: null },
    weight:  { count: 0, lastDate: null },
  };
}

export function saveStreaks(s) {
  set(STREAK_KEY, s);
}

// Update a single streak type.  If the last date is yesterday we increment,
// if today we keep, otherwise reset to 1.
export function updateStreak(type, todayStr) {
  const s = loadStreaks();
  const cur = s[type];
  if (!cur) return s;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);

  if (cur.lastDate === todayStr) {
    // already logged today – no change
  } else if (cur.lastDate === yStr) {
    cur.count += 1;
  } else {
    cur.count = 1;
  }
  cur.lastDate = todayStr;
  s[type] = cur;
  saveStreaks(s);
  return s;
}

// ─── Achievements ───────────────────────────────────────────────────────────
// Unlock conditions: { id, label, icon, desc, check: (streaks) => bool }

export const ACHIEVEMENTS = [
  { id: "first_workout",     label: "First Sweat",         icon: "💪", desc: "Complete your first workout",              check: s => s.workout.count >= 1 },
  { id: "week_workout",      label: "Week Warrior",        icon: "🔥", desc: "7-day workout streak",                     check: s => s.workout.count >= 7 },
  { id: "month_workout",     label: "Iron Will",           icon: "🏋️", desc: "30-day workout streak",                    check: s => s.workout.count >= 30 },
  { id: "hydrated_3",        label: "Hydration Starter",   icon: "💧", desc: "3-day water goal streak",                  check: s => s.water.count >= 3 },
  { id: "hydrated_7",        label: "Hydration Hero",      icon: "🏆", desc: "7-day water goal streak",                  check: s => s.water.count >= 7 },
  { id: "sleeper_3",         label: "Early Bird",          icon: "😴", desc: "3-day sleep streak (7+ hrs)",              check: s => s.sleep.count >= 3 },
  { id: "sleeper_7",         label: "Rest Master",         icon: "🌟", desc: "7-day sleep streak (7+ hrs)",              check: s => s.sleep.count >= 7 },
  { id: "weigher_7",         label: "Scale Tracker",       icon: "⚖️", desc: "Log weight for 7 consecutive days",        check: s => s.weight.count >= 7 },
  { id: "all_streaks_3",     label: "Triple Threat",       icon: "🎯", desc: "All streaks active for 3+ days",           check: s => s.workout.count >= 3 && s.water.count >= 3 && s.sleep.count >= 3 },
  { id: "all_streaks_7",     label: "Consistency King",    icon: "👑", desc: "All streaks active for 7+ days",           check: s => s.workout.count >= 7 && s.water.count >= 7 && s.sleep.count >= 7 },
  { id: "ten_kg",            label: "Double Digits",       icon: "📉", desc: "Lose 10+ kg from starting weight",         check: s => s._tenKg || false },
];

export function getUnlockedIds(streaks) {
  return ACHIEVEMENTS.filter(a => a.check(streaks)).map(a => a.id);
}

// ─── Macro Logs ─────────────────────────────────────────────────────────────

const MACRO_KEY = "macro_logs";

export function loadMacroLogs() {
  return get(MACRO_KEY) || {};
}

export function saveMacroLogs(logs) {
  set(MACRO_KEY, logs);
}

export function getDayMacros(dateStr) {
  const logs = loadMacroLogs();
  return logs[dateStr] || { meals: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
}

// Quick-add meal presets (Indian / egg-free friendly)
export const QUICK_MEALS = [
  { label: "🍗 Chicken Breast",      cal: 165, p: 31, c: 0,  f: 3.6, meal: "chicken" },
  { label: "🍗 Chicken Keema Bhaji", cal: 220, p: 28, c: 4,  f: 10,  meal: "chicken" },
  { label: "🧀 Paneer (100g)",       cal: 265, p: 18, c: 1,  f: 21,  meal: "paneer" },
  { label: "🌱 Moong Sprouts Bowl",  cal: 130, p: 9,  c: 21, f: 0.5, meal: "veg" },
  { label: "🫘 Dal (1 bowl)",        cal: 180, p: 10, c: 28, f: 2,   meal: "veg" },
  { label: "🌾 Wheat Roti (1)",      cal: 100, p: 3,  c: 19, f: 0.8, meal: "carbs" },
  { label: "🍚 Rice (½ bowl)",       cal: 105, p: 2,  c: 23, f: 0.2, meal: "carbs" },
  { label: "🥛 Curd/Dahi (150g)",    cal: 85,  p: 8,  c: 4,  f: 4,   meal: "veg" },
  { label: "🥜 Roasted Chana (30g)",  cal: 120, p: 6,  c: 15, f: 2,   meal: "veg" },
  { label: "🍌 Banana",              cal: 105, p: 1.3,c: 27, f: 0.4, meal: "carbs" },
  { label: "🥛 Whey Shake",          cal: 120, p: 25, c: 3,  f: 1.5, meal: "protein" },
  { label: "🥗 Salad (veg)",         cal: 35,  p: 1,  c: 7,  f: 0.3, meal: "veg" },
  { label: "🥜 Almonds (5-6)",       cal: 42,  p: 1.5, c: 1.5, f: 3.5, meal: "veg" },
];

export function addFoodToDay(dateStr, foodItem) {
  const logs = loadMacroLogs();
  if (!logs[dateStr]) logs[dateStr] = { meals: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
  const day = logs[dateStr];
  day.meals.push({ ...foodItem, id: Date.now() + Math.random() });
  day.totals.calories = Math.round((day.totals.calories + foodItem.cal));
  day.totals.protein  = Math.round((day.totals.protein + foodItem.p) * 10) / 10;
  day.totals.carbs    = Math.round((day.totals.carbs + foodItem.c) * 10) / 10;
  day.totals.fat      = Math.round((day.totals.fat + foodItem.f) * 10) / 10;
  saveMacroLogs(logs);
  return day;
}

export function removeFoodFromDay(dateStr, foodId) {
  const logs = loadMacroLogs();
  if (!logs[dateStr]) return;
  const day = logs[dateStr];
  const idx = day.meals.findIndex(m => m.id === foodId);
  if (idx === -1) return;
  const removed = day.meals[idx];
  day.meals.splice(idx, 1);
  day.totals.calories = Math.max(0, Math.round(day.totals.calories - removed.cal));
  day.totals.protein  = Math.max(0, Math.round((day.totals.protein - removed.p) * 10) / 10);
  day.totals.carbs    = Math.max(0, Math.round((day.totals.carbs - removed.c) * 10) / 10);
  day.totals.fat      = Math.max(0, Math.round((day.totals.fat - removed.f) * 10) / 10);
  saveMacroLogs(logs);
  return day;
}
