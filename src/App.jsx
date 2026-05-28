import { useState } from "react";
import Header from "./components/Header";
import OverviewTab from "./components/OverviewTab";
import WorkoutTab from "./components/WorkoutTab";
import MealTab from "./components/MealTab";
import DailyTracker from "./components/DailyTracker";
import HiitTimer from "./components/HiitTimer";
import TipsTab from "./components/TipsTab";
import { dark } from "./data/theme";

export default function FitnessPlan() {
  const [tab, setTab] = useState("overview");
  const [activeDay, setActiveDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);

  // Dynamic user data & calculator states
  const [weight, setWeight] = useState(100); // default 100 kg
  const [height, setHeight] = useState(178); // default 178 cm
  const [activity, setActivity] = useState("moderate"); // light, moderate, heavy
  const [deficit, setDeficit] = useState("moderate"); // moderate (500), aggressive (750)

  // Tracker states
  const [waterCups, setWaterCups] = useState(0);
  const [workoutChecked, setWorkoutChecked] = useState({});
  const [weightLog, setWeightLog] = useState([
    { date: "May 22", w: 101.2 },
    { date: "May 24", w: 100.5 },
    { date: "May 26", w: 100.0 },
  ]);

  // Meal swap index mappings: { mealIndex: selectedSwapIndex }
  const [mealSelections, setMealSelections] = useState({
    1: 0, // Breakfast (Chicken Keema)
    2: 0, // Lunch (Chicken Curry)
    3: 0, // Afternoon (Moong Sprouts Bhel)
    4: 0, // Evening (Grilled Chicken Strips)
    5: 0  // Dinner (Chicken Soup)
  });

  // Calculate targets centrally
  const bmr = 10 * weight + 6.25 * height - 5 * 27 + 5;
  const activityMultiplier = activity === "light" ? 1.375 : activity === "heavy" ? 1.725 : 1.55;
  const tdee = Math.round(bmr * activityMultiplier);
  const calorieGoal = tdee - (deficit === "aggressive" ? 750 : 500);
  const proteinGoal = Math.round(weight * 1.5);

  return (
    <div style={{ background: dark, minHeight: "100vh", color: "#f0f0f0", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", paddingBottom: 60 }}>
      <Header tab={tab} setTab={setTab} weight={weight} />

      <div style={{ padding: "20px 16px", maxWidth: 720, margin: "0 auto", animation: "fadeIn 0.3s ease" }}>
        {tab === "overview" && (
          <div key="overview" style={{ animation: "fadeInUp 0.35s ease" }}>
            <OverviewTab
              weight={weight}
              setWeight={setWeight}
              height={height}
              setHeight={setHeight}
              activity={activity}
              setActivity={setActivity}
              deficit={deficit}
              setDeficit={setDeficit}
            />
          </div>
        )}
        
        {tab === "workout" && (
          <div key="workout" style={{ animation: "fadeInUp 0.35s ease" }}>
            <WorkoutTab activeDay={activeDay} setActiveDay={setActiveDay} />
          </div>
        )}
        
        {tab === "meal" && (
          <div key="meal" style={{ animation: "fadeInUp 0.35s ease" }}>
            <MealTab
              expandedMeal={expandedMeal}
              setExpandedMeal={setExpandedMeal}
              mealSelections={mealSelections}
              setMealSelections={setMealSelections}
              proteinGoal={proteinGoal}
            />
          </div>
        )}

        {tab === "tracker" && (
          <div key="tracker" style={{ animation: "fadeInUp 0.35s ease" }}>
            <DailyTracker
              activeDay={activeDay}
              waterCups={waterCups}
              setWaterCups={setWaterCups}
              workoutChecked={workoutChecked}
              setWorkoutChecked={setWorkoutChecked}
              weightLog={weightLog}
              setWeightLog={setWeightLog}
              weight={weight}
              setWeight={setWeight}
            />
          </div>
        )}

        {tab === "timer" && (
          <div key="timer" style={{ animation: "fadeInUp 0.35s ease" }}>
            <HiitTimer />
          </div>
        )}
        
        {tab === "tips" && (
          <div key="tips" style={{ animation: "fadeInUp 0.35s ease" }}>
            <TipsTab />
          </div>
        )}
      </div>
    </div>
  );
}
