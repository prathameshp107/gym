# Body Transformation Plan

An egg-free, chicken-and-veg based **2-month fitness & diet planner** built with React. Designed for a 27-year-old male (178 cm, 100 kg) targeting 90–93 kg weight loss. The app combines a structured weekly gym split with a culturally tailored Indian meal plan — all without eggs.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Quick Start](#quick-start)
5. [Available Scripts](#available-scripts)
6. [Features](#features)
   - [Overview Tab — Dynamic Calculator](#1-overview-tab--dynamic-calculator)
   - [Workout Tab — Exercise Demos](#2-workout-tab--exercise-demos)
   - [Meal Tab — Interactive Protein Planner](#3-meal-tab--interactive-protein-planner)
   - [Daily Tracker — Progress Dashboard](#4-daily-tracker--progress-dashboard)
   - [HIIT Timer — Interval Assistant](#5-hiit-timer--interval-assistant)
   - [Tips Tab — Doctor Recommendations](#6-tips-tab--doctor-recommendations)
7. [Architecture](#architecture)
   - [Component Tree](#component-tree)
   - [Data Flow](#data-flow)
8. [Data Layer](#data-layer)
   - [Theme Constants](#theme-constants)
   - [Exercise Data](#exercise-data)
   - [Nutrition Data](#nutrition-data)
9. [Exercise Demo Videos](#exercise-demo-videos)
10. [Styling](#styling)
11. [Customization Guide](#customization-guide)
12. [Disclaimer](#disclaimer)

---

## Overview

This application was built for someone transitioning to an **egg-free diet** who needs a structured, gym-equipment-based workout plan paired with a **practical Indian home-cooked meal plan**. Key goals:

- **Weight loss:** 100 kg → 90–93 kg over 2 months
- **Muscle preservation:** 130–150g protein daily via chicken, paneer, sprouts, dal, and curd
- **Sustainability:** All meals use ingredients from Indian kitchens; no eggs, no expensive supplements
- **Interactive planning:** Dynamic calorie/protein calculator with adjustable inputs and meal swap system
- **Visual guidance:** Each exercise includes **animated loop diagrams** from free-exercise-db, a **professional HD demonstration video** from YMove's royalty-free library, **and** a **3D animated demo** from DEMIC's YouTube Shorts library

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework — component-based architecture |
| **Vite 6** | Build tool & dev server (fast HMR, ES modules) |
| **@vitejs/plugin-react** | React JSX transform & Fast Refresh |
| **free-exercise-db** (GitHub) | Royalty-free exercise animation frames (2-frame loop) |
| **YMove API** | Free HD exercise demonstration videos |
| **DEMIC (@officialdemic)** | 3D animated exercise demonstration Shorts (YouTube) |

No router, no CSS framework, no state management library — the app uses **inline styles** (JavaScript style objects) and **React state** (`useState`). This keeps the project simple, self-contained, and easy to customize.

---

## Project Structure

```
gym/
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite configuration (React plugin)
├── README.md                    # This file
└── src/
    ├── main.jsx                 # React entry — renders <FitnessPlan /> into #root
    ├── App.jsx                  # Root component — manages all state & tab routing
    ├── data/
    │   ├── theme.js             # Color constants, shadows, radii, fonts, transitions
    │   ├── exercises.js         # YMove UUIDs + free-exercise-db mappings + workout days
    │   └── nutrition.js         # Meals, tag styles, protein sources, doctor tips
    └── components/
        ├── Header.jsx           # Gradient header + 6-tab navigation buttons
        ├── MuscleBadge.jsx      # Small colored pill badge for muscle groups
        ├── ExerciseDemo.jsx     # Three-mode player (animated loop + HD video + 3D video)
        ├── OverviewTab.jsx      # Dynamic calculator, stats grid, protein sources, weekly split
        ├── WorkoutTab.jsx       # Day selector → exercise list with inline demos
        ├── MealTab.jsx          # Interactive meal cards with swap options & protein tracking
        ├── DailyTracker.jsx     # Exercise checklist, water intake, weight log, sleep monitor
        ├── HiitTimer.jsx        # HIIT interval timer with SVG countdown & audio beeps
        └── TipsTab.jsx          # Doctor recommendations & 2-month milestones
```

---

## Quick Start

```bash
# Prerequisites: Node.js 18+ and npm

# 1. Clone the repository
git clone <repo-url> gym
cd gym

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | Production build → outputs to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Features

### 1. Overview Tab — Dynamic Calculator

The dashboard doubles as a **personalized belly fat loss calculator** with interactive inputs.

- **Dynamic calculator panel:**
  - **Weight slider** (70–130 kg) — adjust your current weight
  - **Height slider** (150–210 cm) — adjust your height
  - **Activity level dropdown** — Lightly (1-2 days), Moderately (3-5 days), Highly Active (6-7 days)
  - **Deficit intensity toggle** — Safe (-500 kcal) or Aggressive (-750 kcal)
  - All calculations update in real-time: BMR (Mifflin-St Jeor), TDEE, calorie goal, protein target
- **Stats grid:** Current weight, height, BMI (with status), goal weight (90–93 kg), daily calories, protein target
- **Protein sources table:** 6 egg-free protein sources with per-serving protein counts (chicken breast 31g, paneer 18g, moong sprouts 9g, etc.)
- **Doctor's note:** Explains why chicken is superior to eggs for this plan
- **Weekly workout split:** A quick-reference list of all 7 days with color-coded dots

### 2. Workout Tab — Exercise Demos

The core training planner — 6 training days + 1 rest day with exercise breakdowns and **three-mode video demos**.

- **Day selector buttons:** Short weekday buttons (Mon–Sun) with active-day highlighting
- **Exercise cards:** Each exercise shows:
  - Name & muscle group badge (color-coded pill)
  - Coaches' notes (e.g., weight suggestions, form cues)
  - Sets × Reps in the day's accent color
  - **WATCH DEMO button** → inline demo viewer with three modes:
    - **🏃 ANIMATED LOOP** — 2-frame looping animation from free-exercise-db (fast-loading, clear line-art diagrams)
    - **🎬 HD VIDEO** — Full HD video from YMove's royalty-free library (autoplay, loop, muted)
    - **🎯 3D VIDEO** — 3D animated form demonstration from DEMIC via YouTube Shorts embed (autoplay, loop, muted, no controls)
- **Cardio section:** Post-workout cardio instructions per day

### 3. Meal Tab — Interactive Protein Planner

A complete egg-free daily meal plan with **interactive swap options** and **real-time protein tracking**.

- **Legend badges:** Chicken 🍗 / Veg 🌿 / Remove ❌ — color-coded for quick scanning
- **Interactive Protein Planner banner:**
  - Shows total protein from your selections vs. your personalized protein goal
  - Visual progress bar with color coding (green = goal met, amber = gap detected)
  - Dynamic feedback messages based on your selection
- **6 expandable meal cards** from 7:30 AM pre-workout to 9 PM dinner:
  - Click to expand → full item list with quantities and tags
  - **Swap selector** — choose between chicken, paneer, or dal/sprouts options (protein counts update instantly)
  - Each item shows quantity in a styled badge
  - 💡 Tip section at the bottom of each meal with actionable advice
- **Protein-optimized alternatives:** Every meal provides veg alternatives (paneer, sprouts, dal) for days without chicken

### 4. Daily Tracker — Progress Dashboard

A comprehensive daily tracking tool for workouts, hydration, weight, and sleep.

- **Workout Checklist:**
  - Check off each exercise as you complete it
  - SVG progress ring shows completion percentage
  - Strikethrough styling for completed exercises
- **Hydration Tracker:**
  - Animated water tumbler with fill level visualization
  - +1 Cup / -1 Cup controls (250ml per cup, target 16 cups / 4 litres)
  - Real-time litre display with bubble animations
- **Weight Log:**
  - Log daily weight with date stamp
  - Shows initial weight, current weight, and total weight lost
  - Scrollable log history
- **Sleep Monitor:**
  - Sleep hours slider (4–12 hours)
  - Visceral fat alert when sleep < 7 hours (cortisol warning)
  - Positive reinforcement when sleep ≥ 7 hours

### 5. HIIT Timer — Interval Assistant

A built-in HIIT interval timer for fat-burning cardio sessions.

- **3-phase structure:** Warm-up (60s) → Sprint (60s) → Recovery (60s) — repeated for configurable rounds
- **SVG countdown ring** with color-coded phases:
  - 🟠 Warm-up (amber) — steady pace
  - 🔴 Sprint (red) — maximum intensity
  - 🟢 Recovery (teal) — active recovery
- **Audio beeps** at 3, 2, 1 seconds before phase transitions
- **Controls:** Start/Pause, Reset, Skip Phase
- **EPOC science note:** Explains the afterburn effect and how HIIT targets visceral belly fat

### 6. Tips Tab — Doctor Recommendations

Doctor-curated advice for the 2-month transformation.

- **6 recommendation cards:** Chicken as #1 tool, daily sprouts, hydration (3–4L water), sleep hygiene, foods to cut, 2-month expectation
- **2-month milestones timeline:** Week-by-week expected progress (Week 1–2 through Week 7–8) with progress bars
- **Disclaimer:** Medical disclaimer and allergy notice

---

## Architecture

### Component Tree

```
<FitnessPlan>              (App.jsx — state owner)
├── <Header>               (Header.jsx — tab, setTab, weight)
└── Content area
    ├── <OverviewTab>      (OverviewTab.jsx — weight, height, activity, deficit, setters)
    ├── <WorkoutTab>       (WorkoutTab.jsx — activeDay, setActiveDay)
    │   ├── <MuscleBadge>  (× per exercise)
    │   └── <ExerciseDemo> (× per exercise — dual-mode player)
    ├── <MealTab>          (MealTab.jsx — expandedMeal, mealSelections, proteinGoal)
    ├── <DailyTracker>     (DailyTracker.jsx — water, workout, weight, sleep)
    ├── <HiitTimer>        (HiitTimer.jsx — standalone timer component)
    └── <TipsTab>          (TipsTab.jsx — no props)
```

### Data Flow

All application state lives in `App.jsx` via `useState` hooks:

1. **`tab`** (`"overview" | "workout" | "meal" | "tracker" | "timer" | "tips"`) — controls which tab is displayed
2. **`activeDay`** (`0–6`) — which workout day is selected in WorkoutTab
3. **`expandedMeal`** (`null | 0–5`) — which meal card is expanded in MealTab
4. **`weight`, `height`, `activity`, `deficit`** — interactive calculator inputs
5. **`waterCups`** — hydration tracker state
6. **`workoutChecked`** — exercise checklist state per day
7. **`weightLog`** — array of `{ date, w }` weight history entries
8. **`mealSelections`** — map of `{ mealIndex: swapIndex }` for meal plan customization

State is passed **down** via props. Key derived values (BMR, TDEE, calorie goal, protein goal) are calculated in `App.jsx` and passed to child components. Static data is imported directly from `src/data/` modules.

---

## Data Layer

All static content is separated into three data modules in `src/data/`:

### Theme Constants (`theme.js`)

Extended design system with utility exportables:

```js
accent     = "#e84545"   // Primary red accent
accentLight = "#ff6b6b"  // Lighter accent for gradients
dark       = "#0f0f0f"   // Page background
darkAlt    = "#141414"   // Alternate dark surface
card       = "#1a1a1a"   // Card surface color
cardHover  = "#1f1f1f"   // Card hover state
border     = "#2a2a2a"   // Standard border
borderLight= "#333"      // Lighter border
muted      = "#888"      // Secondary/muted text
textPrimary = "#f0f0f0"  // Primary text
textSecondary = "#bbb"   // Secondary text
textMuted   = "#777"     // Muted text

dayColors  = { red, orange, teal, purple, green }
shadow     = { sm, md, lg, glow(color) }
radius     = { sm, md, lg, xl, pill }
font       = { body, display, mono }
transition = { fast, base, slow }
```

### Exercise Data (`exercises.js`)

- **`YMOVE`** — Object mapping exercise names to UUIDs for YMove video API
- **`DEMIC`** — Object mapping exercise names to YouTube Shorts video IDs for 3D animated demos
- **`demicEmbedUrl(id)`** → `https://www.youtube.com/embed/{id}?autoplay=1&loop=1...`
- **`videoUrl(uuid)`** → `https://ymove.app/api/free/{uuid}?type=video`
- **`thumbUrl(uuid)`** → `https://ymove.app/api/free/{uuid}?type=thumbnail`
- **`days`** — Array of 7 day objects, each containing:
  - `day` (string), `focus` (string), `color` (hex string)
  - `exercises[]` — array of `{ name, sets, reps, note, muscle }`
  - `cardio` (string) — post-workout cardio instructions

### Nutrition Data (`nutrition.js`)

- **`meals`** — Array of 6 meal objects, each with `{ time, icon, label, items[], tip }`
- **`tagMeta`** — Style definitions for `chicken`, `veg`, and `remove` tags
- **`proteinSources`** — 6 protein sources with per-serving gram counts
- **`doctorTips`** — 6 expert recommendation objects `{ icon, title, body }`

To customize the plan, edit these data files — no component code changes needed.

---

## Exercise Demo Videos

The app integrates **three** visual demonstration sources for each exercise:

### 1. Animated Loop Diagrams (Primary)

Each exercise maps to a folder name in the [free-exercise-db](https://github.com/yuhonas/free-exercise-db) GitHub repository. The app loads a **2-frame looping animation** (two `.jpg` images swapped every 700ms) on a clean white background:

- **Extremely fast loading** — tiny image files from GitHub's CDN
- **Clear line-art style** — easy to understand form at a glance
- **Low bandwidth** — works instantly even on slow connections
- Shows frame number indicator overlay

### 2. HD Video (Secondary)

Each exercise also maps to a UUID in the [YMove](https://ymove.app) royalty-free HD library. When available, a **toggle bar** lets users switch between modes:

- **ANIMATED LOOP** (default) — fast, always works
- **HD VIDEO** — full demonstration with real motion
  - Autoplay, loop, muted (playsInline for iOS)
  - Shimmer spinner while loading
  - Falls back to thumbnail + "video unavailable" message on error

### 3. 3D Animation (DEMIC)

Each exercise can also map to a YouTube Shorts video ID from [DEMIC (@officialdemic)](https://www.youtube.com/@officialdemic) — a channel with 694K+ subscribers dedicated to **3D animated exercise demonstrations** showing proper form, muscle engagement, and movement mechanics. When available, a third toggle button (**🎯 3D VIDEO**) appears in the mode switcher:

- **3D character animation** — clear visual of every muscle group in action
- **YouTube iframe embed** — autoplay, loop, muted, no controls, no branding
- **Loading shimmer** — spinner overlay while the iframe loads
- **DEMIC attribution badge** — top-right corner credit overlay
- **Auto-cleanup** — iframe src is reset on close to stop playback

Mapped exercises include: Barbell Squat, Goblet Squat, Bench Press variations, Deadlift, Rows, Shoulder Press, Lat Pulldown, Curls, Tricep Pushdown, Lateral Raises, Lunges, Plank, Leg Extensions, and more.

### Adding a New Exercise

1. Add the exercise name to the `DB_MAP` in `ExerciseDemo.jsx` with its free-exercise-db folder name
2. Add the exercise name to the `YMOVE` map in `exercises.js` with its YMove UUID (optional for video mode)
3. Add the exercise name to the `DEMIC` map in `exercises.js` with its YouTube Shorts video ID (optional for 3D mode)
4. Create the exercise entry in the `days` array

---

## Styling

The app uses **React inline styles** (`style={{}}` props) exclusively — no CSS files, no CSS modules, no styled-components. Benefits:

- **Zero configuration** — no extra build setup
- **Co-location** — styles live next to the markup they style
- **Dynamic styling** — easy interpolation of theme colors and state-based styles
- **Portability** — copy any component anywhere and it works

A centralized design system lives in `src/data/theme.js` with colors, shadows, border radii, font stacks, and transition presets imported throughout the app.

---

## Customization Guide

Here are common customizations you might want to make:

### Change User Stats
Use the interactive sliders and dropdowns in the Overview tab, or edit the default values in `src/App.jsx`.

### Modify the Workout Plan
Edit the `days` array in `src/data/exercises.js` — add/remove exercises, change sets/reps, adjust cardio.

### Update the Meal Plan
Edit the `mealData` array in `src/components/MealTab.jsx` — add/remove meals, change quantities, update tips, or add new swap options.

### Change Colors
Edit `src/data/theme.js` to change the accent, background, or card colors. Each workout day also has its own `color` property in the `days` array.

### Add a New Exercise Demo
1. Find the exercise in `free-exercise-db` folder structure and add its name to `DB_MAP` in `ExerciseDemo.jsx`
2. Find the YMove UUID for your exercise and add it to the `YMOVE` map in `src/data/exercises.js`
3. Find the DEMIC YouTube Shorts video ID for your exercise and add it to the `DEMIC` map in `src/data/exercises.js`

### Add More Tabs
1. Create a new component in `src/components/`
2. Add the tab name to the `tabs` array in `src/components/Header.jsx`
3. Import and render it conditionally in `src/App.jsx`

---

## Disclaimer

This application provides a personalized fitness and diet plan based on the specific user profile (27 yrs, 178 cm, 100 kg, egg-free). **Consult a physician or registered dietitian before beginning any new exercise or diet program.** All exercise demo content is provided by free-exercise-db (MIT-licensed) and YMove (royalty-free) and used under their respective terms.

---

## License

MIT — feel free to use, modify, and share.
