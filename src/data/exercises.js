// ─── REAL Professional Exercise Videos from YMove (free, royalty-free HD) ───
// Each UUID maps to an HD white-background professional exercise demo video
export const YMOVE = {
  "Barbell Squat":                      "d65feff4-9891-4ff8-a9f9-64965da7b69c",
  "Goblet Squat":                       "d65feff4-9891-4ff8-a9f9-64965da7b69c",
  "Flat Bench Dumbbell Press":          "d09e0ed7-21dd-4f1c-b5cf-3e345e9304ec",
  "Barbell Bench Press":                "d09e0ed7-21dd-4f1c-b5cf-3e345e9304ec",
  "Chest Press Machine":                "0c178070-b799-4e6e-bfd0-332a0dc06ffe",
  "Dumbbell Deadlift":                  "f96d5f24-c9b0-4782-bbd9-41d383a6b633",
  "Dumbbell Row":                       "ae1f15b4-61f9-4da7-9ffe-0d8e72e6f097",
  "Dumbbell Bent-Over Row":             "ae1f15b4-61f9-4da7-9ffe-0d8e72e6f097",
  "Push-Up + DB Row Superset":          "ae1f15b4-61f9-4da7-9ffe-0d8e72e6f097",
  "Dumbbell Shoulder Press":            "fb62140e-87c2-41f0-ada2-1d9be58664cf",
  "Barbell Upright Row":                "d725ad5a-e0dd-4fca-8b9e-0016aaa757a0",
  "Lat Pulldown (Machine)":             "ed1ca95e-2642-4551-a477-17485e486bfc",
  "Lat Pulldown":                       "ed1ca95e-2642-4551-a477-17485e486bfc",
  "Dumbbell Bicep Curl":                "2a0529a0-be74-4b88-bf1c-6b67c8f12ef8",
  "Hammer Curl":                        "2a0529a0-be74-4b88-bf1c-6b67c8f12ef8",
  "Tricep Cable Pushdown":              "9a550e2c-c55e-495d-b59e-b676c3d48a41",
  "Dumbbell Overhead Tricep Extension": "9a550e2c-c55e-495d-b59e-b676c3d48a41",
  "Dumbbell Lateral Raises":            "1cce8f37-dd9f-442f-995e-be02b98a35ad",
  "Seated Cable Row":                   "499ccaa4-719d-40bd-b441-511291482471",
  "Incline Bench Dumbbell Press":       "ece55528-9855-49cf-a970-cf47c662e45d",
  "Dumbbell Lunges":                    "166bf038-1670-4c52-9f32-cf6463556d99",
  "Plank":                              "be8f26b0-4948-4f48-b851-1a9d2cfd953c",
  "Plank to Push-up":                   "be8f26b0-4948-4f48-b851-1a9d2cfd953c",
  "Leg Extension Machine":              "3d0e78d0-1125-4d25-8bd4-9ca7ba3799e8",
  "Cable Crossover (Machine)":          "82760b28-30e2-4311-a4c5-42da40082079",
  "Dumbbell Flyes":                     "82760b28-30e2-4311-a4c5-42da40082079",
};

// ─── 3D Animated Exercise Shorts from DEMIC (@officialdemic) ──────────────
// Each YouTube Shorts video ID maps to a 3D-animated form demonstration
export const DEMIC = {
  "Barbell Squat":                       "Px7pW7cSPis",
  "Goblet Squat":                        "54_1Zga0eJo",
  "Flat Bench Dumbbell Press":           "GsbHjNXnDUg",
  "Barbell Bench Press":                 "ZNUgpjhvahs",
  "Dumbbell Deadlift":                   "ITT_Jrww4rM",
  "Dumbbell Row":                        "APk4N1-Vot4",
  "Dumbbell Bent-Over Row":              "APk4N1-Vot4",
  "Push-Up + DB Row Superset":           "YqpC9v4HcF4",
  "Dumbbell Shoulder Press":             "Oi2IvqrE-m4",
  "Barbell Upright Row":                 "dBHFK5Kx-o8",
  "Lat Pulldown (Machine)":              "POqCB94g2YI",
  "Lat Pulldown":                        "POqCB94g2YI",
  "Dumbbell Bicep Curl":                 "8MSRc2_b2d4",
  "Hammer Curl":                         "eo5c1t5xnRs",
  "Tricep Cable Pushdown":               "EaaCKywZJOU",
  "Dumbbell Overhead Tricep Extension":  "EaaCKywZJOU",
  "Dumbbell Lateral Raises":             "ACehKVOIAnU",
  "Seated Cable Row":                    "bP6mGpgE2iM",
  "Incline Bench Dumbbell Press":        "dOYPl4tMFrs",
  "Dumbbell Lunges":                     "CbGIKGvBJU8",
  "Plank":                               "OW4vjY0vFq0",
  "Plank to Push-up":                    "YqpC9v4HcF4",
  "Leg Extension Machine":               "Y_X-C8V0qKY",
  "Cable Crossover (Machine)":           "s5FW8DQYtgg",
  "Dumbbell Flyes":                      "s5FW8DQYtgg",
};

export const demicEmbedUrl = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`;

export const videoUrl = (uuid) => `https://ymove.app/api/free/${uuid}?type=video`;
export const thumbUrl = (uuid) => `https://ymove.app/api/free/${uuid}?type=thumbnail`;

// ─── Weekly Workout Schedule ────────────────────────────────────────────────
export const days = [
  { day: "Day 1 – Monday", focus: "Chest + Triceps + Core", color: "#e84545", exercises: [
    { name: "Treadmill Warm-Up",               sets: "1", reps: "10 min at 6 km/h", note: "Incline 2%",           muscle: "Cardio" },
    { name: "Flat Bench Dumbbell Press",        sets: "4", reps: "12, 10, 10, 8",  note: "Use 12.5–17.5 kg DBs", muscle: "Chest" },
    { name: "Incline Bench Dumbbell Press",     sets: "3", reps: "12, 10, 10",     note: "Adjust bench to incline",muscle: "Upper Chest" },
    { name: "Chest Press Machine",              sets: "3", reps: "12, 10, 8",      note: "Multi-gym station",     muscle: "Chest" },
    { name: "Tricep Cable Pushdown",            sets: "3", reps: "15, 12, 12",     note: "Cable on multi-gym",   muscle: "Triceps" },
    { name: "Dumbbell Overhead Tricep Extension",sets:"3", reps: "12",             note: "10 kg DBs",            muscle: "Triceps" },
    { name: "Plank",                            sets: "3", reps: "45 sec hold",    note: "Yoga mat",             muscle: "Core" },
    { name: "Leg Raises",                       sets: "3", reps: "15 reps",        note: "",                     muscle: "Core" },
  ], cardio: "Post-workout: 20 min elliptical, moderate pace" },

  { day: "Day 2 – Tuesday", focus: "Back + Biceps + Core", color: "#f5a623", exercises: [
    { name: "Treadmill Warm-Up",       sets: "1", reps: "10 min at 6 km/h", note: "",              muscle: "Cardio" },
    { name: "Lat Pulldown (Machine)",  sets: "4", reps: "12, 10, 10, 8",  note: "Wide grip",       muscle: "Back" },
    { name: "Seated Cable Row",        sets: "4", reps: "12, 10, 10, 8",  note: "",                muscle: "Back" },
    { name: "Dumbbell Bent-Over Row",  sets: "3", reps: "12 each side",   note: "12.5–15 kg",      muscle: "Back" },
    { name: "Dumbbell Bicep Curl",     sets: "3", reps: "12, 10, 10",     note: "10–12.5 kg",      muscle: "Biceps" },
    { name: "Hammer Curl",             sets: "3", reps: "12",             note: "10 kg DBs",        muscle: "Biceps" },
    { name: "Bicycle Crunches",        sets: "3", reps: "20 reps",        note: "",                muscle: "Core" },
    { name: "Russian Twists",          sets: "3", reps: "20 reps",        note: "5 kg DB",          muscle: "Core" },
  ], cardio: "Post-workout: 20 min cycling (upright bike), resistance level 5" },

  { day: "Day 3 – Wednesday", focus: "Legs + Shoulders + Core", color: "#50e3c2", exercises: [
    { name: "Elliptical Warm-Up",      sets: "1", reps: "10 min",          note: "",              muscle: "Cardio" },
    { name: "Barbell Squat",           sets: "4", reps: "12, 10, 10, 8",  note: "Focus on form", muscle: "Quads / Glutes" },
    { name: "Dumbbell Lunges",         sets: "3", reps: "12 each leg",     note: "10 kg DBs",     muscle: "Legs" },
    { name: "Leg Extension Machine",   sets: "3", reps: "15, 12, 12",     note: "",              muscle: "Quads" },
    { name: "Dumbbell Shoulder Press", sets: "4", reps: "12, 10, 10, 8",  note: "10–12.5 kg",    muscle: "Shoulders" },
    { name: "Dumbbell Lateral Raises", sets: "3", reps: "15",             note: "5–7.5 kg",      muscle: "Side Delts" },
    { name: "Barbell Upright Row",     sets: "3", reps: "12",             note: "",              muscle: "Traps / Shoulders" },
    { name: "Dead Bugs",               sets: "3", reps: "12 each side",   note: "Yoga mat",      muscle: "Core" },
  ], cardio: "Post-workout: 20 min treadmill at 7 km/h" },

  { day: "Day 4 – Thursday", focus: "Active Recovery / Cardio", color: "#7b68ee", exercises: [
    { name: "Treadmill Walk/Jog",   sets: "1", reps: "30 min", note: "5–7 km/h, incline 3–5%", muscle: "Cardio" },
    { name: "Elliptical",           sets: "1", reps: "15 min", note: "Moderate pace",           muscle: "Cardio" },
    { name: "Upright Bike",         sets: "1", reps: "15 min", note: "Low resistance",          muscle: "Cardio" },
    { name: "Full Body Stretching", sets: "1", reps: "10 min", note: "Yoga mat",                muscle: "Flexibility" },
  ], cardio: "Total ~70 min light cardio. Heart rate 120–140 bpm." },

  { day: "Day 5 – Friday", focus: "Chest + Back (Compound Day)", color: "#e84545", exercises: [
    { name: "Treadmill Warm-Up",         sets: "1", reps: "10 min",         note: "",                  muscle: "Cardio" },
    { name: "Barbell Bench Press",       sets: "4", reps: "10, 8, 8, 6",   note: "Progressive overload",muscle: "Chest" },
    { name: "Dumbbell Flyes",            sets: "3", reps: "12",             note: "10–12.5 kg",        muscle: "Chest" },
    { name: "Lat Pulldown",              sets: "4", reps: "12, 10, 10, 8", note: "Close grip",         muscle: "Back" },
    { name: "Dumbbell Row",              sets: "3", reps: "10 each side",   note: "15–17.5 kg",        muscle: "Back" },
    { name: "Cable Crossover (Machine)", sets: "3", reps: "15",             note: "",                  muscle: "Chest" },
    { name: "Plank to Push-up",          sets: "3", reps: "10 reps",        note: "",                  muscle: "Core / Chest" },
  ], cardio: "Post-workout: 25 min elliptical HIIT – 1 min fast / 1 min slow" },

  { day: "Day 6 – Saturday", focus: "Full Body Strength + HIIT", color: "#f5a623", exercises: [
    { name: "Treadmill HIIT",            sets: "1", reps: "20 min",        note: "1 min sprint 9 km/h, 1 min walk 5 km/h", muscle: "Cardio" },
    { name: "Dumbbell Deadlift",         sets: "4", reps: "12, 10, 10, 8",note: "17.5–20 kg DBs",   muscle: "Full Body" },
    { name: "Goblet Squat",              sets: "3", reps: "12",            note: "12.5 kg DB",        muscle: "Quads / Glutes" },
    { name: "Push-Up + DB Row Superset", sets: "3", reps: "10+10",         note: "",                  muscle: "Chest / Back" },
    { name: "Dumbbell Shoulder Press",   sets: "3", reps: "10",            note: "",                  muscle: "Shoulders" },
    { name: "Knee Raises / Leg Raises",  sets: "3", reps: "15",            note: "",                  muscle: "Core" },
    { name: "Mountain Climbers",         sets: "3", reps: "30 sec",        note: "Yoga mat",          muscle: "Core / Cardio" },
  ], cardio: "HIIT is included above" },

  { day: "Day 7 – Sunday", focus: "REST", color: "#4a4a4a", exercises: [
    { name: "Complete Rest",         sets: "–", reps: "–",         note: "Sleep 7–8 hours", muscle: "Recovery" },
    { name: "Light Walk (Optional)", sets: "–", reps: "20–30 min", note: "",                muscle: "Active Rest" },
    { name: "Stretching / Yoga",     sets: "–", reps: "15 min",    note: "Yoga mat",        muscle: "Flexibility" },
  ], cardio: "No structured cardio today." },
];
