export const meals = [
  { time: "7:30 AM – Pre-Workout", icon: "☀️", label: "Wake-Up Boost", items: [
    { food: "Soaked Almonds",         qty: "5–6 nos",  tag: "veg",     note: "Good fats + energy" },
    { food: "Black Coffee / Green Tea",qty: "1 cup",   tag: "veg",     note: "No sugar – natural fat burner" },
    { food: "Banana",                 qty: "1 medium", tag: "veg",     note: "Quick carbs before workout" },
  ], tip: "Have 30 min before gym. Banana gives energy, coffee boosts fat burning during workout." },
  { time: "9:00 AM – Breakfast", icon: "🍗", label: "High-Protein Breakfast", items: [
    { food: "Wheat Roti",             qty: "2 nos",           tag: "veg",     note: "Same as now – keep it" },
    { food: "Chicken Keema Bhaji",    qty: "100–120g chicken",tag: "chicken", note: "Cook with onion, tomato, spices – minimal oil. BEST option." },
    { food: "OR Paneer Bhurji",       qty: "100g paneer",     tag: "veg",     note: "If no chicken available that morning" },
    { food: "OR Moong Dal Chilla",    qty: "2 chillas",       tag: "veg",     note: "High protein veg alternative" },
    { food: "Curd / Dahi",            qty: "150g bowl",       tag: "veg",     note: "Always include – adds 8g protein" },
  ], tip: "Chicken keema bhaji replaces eggs perfectly. Cook in batches on Sunday for the whole week – saves time every morning." },
  { time: "1:00 PM – Lunch", icon: "🍱", label: "Balanced Power Lunch", items: [
    { food: "Wheat Roti",                   qty: "3 nos (↓ from 4)", tag: "veg",     note: "Reduce by 1 roti" },
    { food: "Chicken Curry / Dry Sabji",    qty: "150g chicken",      tag: "chicken", note: "Low-oil, home-cooked. Use 3–4 days/week" },
    { food: "OR Toor / Masoor Dal",         qty: "1 large bowl",      tag: "veg",     note: "Non-chicken days – essential protein" },
    { food: "Vegetable Sabji",              qty: "1 bowl",            tag: "veg",     note: "Keep as is" },
    { food: "Rice",                         qty: "½ small bowl",      tag: "veg",     note: "Halve current intake" },
    { food: "Salad (cucumber, onion, tomato)",qty: "1 plate",         tag: "veg",     note: "Eat FIRST before the meal" },
  ], tip: "Alternate chicken curry and dal across the week. Eating salad first is the trick to feeling full with fewer rotis." },
  { time: "4:00 PM – Afternoon Snack", icon: "🌱", label: "Sprouts Bhel (Your Favourite!)", items: [
    { food: "Moong Sprouts Bhel",       qty: "1 large bowl", tag: "veg", note: "Sprouts + onion + tomato + lemon + chaat masala + green chutney" },
    { food: "OR Sprouts + Kala Chana Chaat", qty: "1 bowl", tag: "veg", note: "Even higher protein version" },
    { food: "Buttermilk (Chaas)",       qty: "1 glass",      tag: "veg", note: "Jeera + salt. Protein + probiotic." },
  ], tip: "Sprouts bhel is PERFECT for fat loss – high protein, high fibre, very low calorie, and you love it! Make it your fixed daily snack." },
  { time: "6:30 PM – Evening Protein", icon: "💪", label: "Muscle-Building Snack", items: [
    { food: "Grilled / Tawa Chicken Strips", qty: "80–100g", tag: "chicken", note: "Marinate in curd + spices, cook on tawa dry. Takes 10 mins." },
    { food: "OR Paneer Tikka (Tawa)",        qty: "80–100g", tag: "veg",     note: "Paneer marinated in curd + spices, grilled on tawa" },
    { food: "OR Sprouts Chaat",              qty: "1 bowl",  tag: "veg",     note: "Moong + kala chana + lemon + masala" },
  ], tip: "This 6:30 PM protein snack is the most important change for muscle building. It feeds muscles from your workout and reduces dinner appetite." },
  { time: "9:00 PM – Dinner", icon: "🌙", label: "Light & Lean Dinner", items: [
    { food: "Wheat Roti",            qty: "2 nos (↓ from 3)", tag: "veg",     note: "Reduce by 1 roti" },
    { food: "Chicken Soup / Light Sabji", qty: "100g chicken",tag: "chicken", note: "Soup = best option. Very light, high protein." },
    { food: "OR Dal + Sabji",        qty: "1 bowl each",      tag: "veg",     note: "On days you had chicken twice already" },
    { food: "RICE",                  qty: "❌ REMOVE",         tag: "remove",  note: "No rice at night – biggest change for belly fat!" },
    { food: "Raita / Salad",         qty: "1 bowl",           tag: "veg",     note: "Curd + cucumber + jeera. Eat first." },
  ], tip: "Removing night rice alone saves 200–300 calories daily. Replace with raita and extra dal. You will NOT feel hungry with salad first + roti + sabji + soup." },
];

export const tagMeta = {
  chicken: { bg: "#1a0a00", border: "#6b3a00", text: "#f5a623", emoji: "🍗" },
  veg:     { bg: "#001a08", border: "#0a4020", text: "#2ecc71", emoji: "🌿" },
  remove:  { bg: "#1a0000", border: "#4a0000", text: "#e84545", emoji: "❌" },
};

export const proteinSources = [
  { source: "🍗 Chicken Breast (100g)", protein: "31g", note: "Primary source – use daily" },
  { source: "🧀 Paneer (100g)",          protein: "18g", note: "Great egg-free veg substitute" },
  { source: "🌱 Moong Sprouts (1 bowl)", protein: "9g",  note: "Your favourite – use daily!" },
  { source: "🫘 Dal / Lentils (1 bowl)", protein: "10g", note: "Add to every lunch/dinner" },
  { source: "🥛 Curd / Dahi (150g)",     protein: "8g",  note: "Easy daily addition" },
  { source: "🥜 Roasted Chana (30g)",    protein: "6g",  note: "Snack option" },
];

export const doctorTips = [
  { icon: "🍗", title: "Chicken is Your #1 Tool", body: "Chicken breast gives 31g protein per 100g — superior to eggs. Cook in batches on Sunday and store in fridge. Use in breakfast bhaji, lunch curry, evening snack strips, and dinner soup." },
  { icon: "🌱", title: "Sprouts Every Single Day", body: "Your love of sprouts bhel is a huge advantage. Moong sprouts bhel as your 4 PM snack every day. Add kala chana for extra protein. High protein, high fibre, very low calorie." },
  { icon: "💧", title: "Drink 3–4 Litres of Water", body: "Start every morning with 2 glasses of water before coffee. Keep a water bottle at your work desk. Proper hydration reduces bloating and supports fat metabolism." },
  { icon: "😴", title: "Sleep 7–8 Hours", body: "Poor sleep raises cortisol which directly stores fat around the belly. This is non-negotiable for belly fat reduction." },
  { icon: "🚫", title: "Cut These 5 Things", body: "Night-time rice, maida items, packaged biscuits, cold drinks, excess oil in cooking. These 5 changes alone will accelerate results dramatically." },
  { icon: "📈", title: "2-Month Expectation", body: "7–10 kg weight loss, significantly reduced belly, defined chest and arms, better posture, more stamina — a genuinely transformed physique for your wedding." },
];
