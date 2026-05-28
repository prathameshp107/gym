import { useState, useEffect, useRef } from "react";
import { YMOVE, DEMIC, videoUrl, thumbUrl, demicEmbedUrl } from "../data/exercises";
import { muted, font, transition, radius, card, border, shadow } from "../data/theme";

// Mapping program exercises to standard folder names in GitHub raw yuhonas/free-exercise-db
const DB_MAP = {
  "Treadmill Warm-Up": "Treadmill",
  "Treadmill Walk/Jog": "Treadmill",
  "Treadmill HIIT": "Treadmill",
  "Elliptical Warm-Up": "Elliptical_Trainer",
  "Elliptical": "Elliptical_Trainer",
  "Upright Bike": "Stationary_Bike",
  "Flat Bench Dumbbell Press": "Dumbbell_Bench_Press",
  "Incline Bench Dumbbell Press": "Incline_Dumbbell_Bench_Press",
  "Chest Press Machine": "Machine_Chest_Press",
  "Tricep Cable Pushdown": "Cable_Tricep_Pushdown",
  "Dumbbell Overhead Tricep Extension": "Dumbbell_Tricep_Extension",
  "Plank": "Plank",
  "Plank to Push-up": "Pushups",
  "Leg Raises": "Flat_Bench_Lying_Leg_Raise",
  "Lat Pulldown (Machine)": "Wide-Grip_Lat_Pulldown",
  "Lat Pulldown": "Wide-Grip_Lat_Pulldown",
  "Seated Cable Row": "Seated_Cable_Row",
  "Dumbbell Bent-Over Row": "Dumbbell_Row",
  "Dumbbell Row": "Dumbbell_Row",
  "Dumbbell Bicep Curl": "Dumbbell_Bicep_Curl",
  "Hammer Curl": "Hammer_Curl",
  "Bicycle Crunches": "Bicycle_Crunch",
  "Russian Twists": "Russian_Twist",
  "Barbell Squat": "Barbell_Squat",
  "Dumbbell Lunges": "Dumbbell_Lunge",
  "Leg Extension Machine": "Leg_Extensions",
  "Dumbbell Shoulder Press": "Dumbbell_Shoulder_Press",
  "Dumbbell Lateral Raises": "Dumbbell_Lateral_Raise",
  "Barbell Upright Row": "Upright_Row",
  "Dead Bugs": "Dead_Bug",
  "Full Body Stretching": "Butterfly",
  "Stretching / Yoga": "Butterfly",
  "Light Walk (Optional)": "Walking",
  "Barbell Bench Press": "Barbell_Bench_Press",
  "Dumbbell Flyes": "Dumbbell_Fly",
  "Cable Crossover (Machine)": "Cable_Crossover",
  "Dumbbell Deadlift": "Dumbbell_Deadlift",
  "Goblet Squat": "Goblet_Squat",
  "Push-Up + DB Row Superset": "Pushups",
  "Mountain Climbers": "Mountain_Climber",
  "Knee Raises / Leg Raises": "Hanging_Leg_Raise"
};

export default function ExerciseDemo({ name, color }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("loop"); // "loop" | "video" | "3d"
  const [frameIdx, setFrameIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const uuid = YMOVE[name];
  const dbFolder = DB_MAP[name];
  const demicId = DEMIC[name];

  const hasLoop = !!dbFolder;
  const hasVideo = !!uuid;
  const has3d = !!demicId;
  const availableModes = [hasLoop, hasVideo, has3d].filter(Boolean).length;

  // If no visual exists, don't render anything
  if (!hasLoop && !hasVideo && !has3d) return null;

  // Toggle demo view
  const toggle = () => {
    setOpen(prev => {
      const nextOpen = !prev;
      if (!nextOpen) {
        if (videoRef.current) videoRef.current.pause();
        // Remove iframe src to stop video when closing
        if (iframeRef.current) {
          iframeRef.current.src = "";
        }
      }
      return nextOpen;
    });
  };

  // 2-frame animation looping interval
  useEffect(() => {
    if (!open || mode !== "loop" || !dbFolder) return;
    const interval = setInterval(() => {
      setFrameIdx(prev => (prev === 0 ? 1 : 0));
    }, 700);

    return () => clearInterval(interval);
  }, [open, mode, dbFolder]);

  // Fallback default mode
  useEffect(() => {
    if (!hasLoop && hasVideo) {
      setMode("video");
    } else if (!hasLoop && has3d) {
      setMode("3d");
    } else {
      setMode("loop");
    }
  }, [name, hasLoop, hasVideo, has3d]);

  // Reset loaded state when mode changes
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [mode]);

  return (
    <div style={{ marginTop: 12 }}>
      {/* WATCH DEMO Button */}
      <button
        onClick={toggle}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: open ? `${color}18` : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${open ? color : "rgba(255,255,255,0.1)"}`,
          borderRadius: radius.pill,
          padding: "7px 18px",
          color: open ? color : muted,
          fontFamily: font.mono,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1,
          cursor: "pointer",
          transition: transition.base,
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "#bbb";
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.color = muted;
          }
        }}
      >
        <span style={{
          fontSize: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: open ? `${color}33` : "rgba(255,255,255,0.1)",
        }}>
          {open ? "⏸" : "▶"}
        </span>
        {open ? "HIDE DEMO" : "WATCH DEMO"}
      </button>

      {/* Expanded Demo Viewer */}
      {open && (
        <div style={{
          marginTop: 12,
          borderRadius: 14,
          overflow: "hidden",
          border: `1px solid ${color}44`,
          background: "#000",
          position: "relative",
          boxShadow: `0 0 30px ${color}15, 0 4px 16px rgba(0,0,0,0.5)`,
          animation: "scaleIn 0.25s ease",
        }}>
          {/* Toggler Bar (if at least 2 modes exist) */}
          {availableModes > 1 && (
            <div style={{
              display: "flex",
              background: "#121212",
              borderBottom: `1px solid ${border}`,
              padding: 4,
              gap: 4,
            }}>
              {hasLoop && (
                <button
                  onClick={() => setMode("loop")}
                  style={{
                    flex: 1,
                    padding: "8px 8px",
                    background: mode === "loop" ? "rgba(255,255,255,0.05)" : "transparent",
                    border: "none",
                    borderRadius: 8,
                    color: mode === "loop" ? color : "#888",
                    fontSize: 10,
                    fontFamily: font.mono,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: transition.fast,
                    whiteSpace: "nowrap",
                  }}
                >
                  🏃 ANIMATED LOOP
                </button>
              )}
              {hasVideo && (
                <button
                  onClick={() => setMode("video")}
                  style={{
                    flex: 1,
                    padding: "8px 8px",
                    background: mode === "video" ? "rgba(255,255,255,0.05)" : "transparent",
                    border: "none",
                    borderRadius: 8,
                    color: mode === "video" ? color : "#888",
                    fontSize: 10,
                    fontFamily: font.mono,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: transition.fast,
                    whiteSpace: "nowrap",
                  }}
                >
                  🎬 HD VIDEO
                </button>
              )}
              {has3d && (
                <button
                  onClick={() => setMode("3d")}
                  style={{
                    flex: 1,
                    padding: "8px 8px",
                    background: mode === "3d" ? "rgba(255,255,255,0.05)" : "transparent",
                    border: "none",
                    borderRadius: 8,
                    color: mode === "3d" ? color : "#888",
                    fontSize: 10,
                    fontFamily: font.mono,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: transition.fast,
                    whiteSpace: "nowrap",
                  }}
                >
                  🎯 3D VIDEO
                </button>
              )}
            </div>
          )}

          {/* MODE: Animated Loop */}
          {mode === "loop" && dbFolder && (
            <div style={{
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 12px",
              minHeight: 220,
              position: "relative",
            }}>
              <img
                src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${dbFolder}/${frameIdx}.jpg`}
                alt={`${name} animation`}
                style={{
                  maxHeight: 180,
                  maxWidth: "90%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                fontSize: 9,
                color: "#999",
                fontFamily: font.mono,
                letterSpacing: 0.5,
                background: "rgba(0,0,0,0.05)",
                padding: "2px 8px",
                borderRadius: 4,
              }}>
                FRAME {frameIdx + 1}
              </div>
            </div>
          )}

          {/* MODE: HD Video Player */}
          {mode === "video" && uuid && (
            <div style={{ position: "relative" }}>
              {!loaded && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  background: "#0a0a0a",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  minHeight: 220,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `3px solid ${color}33`,
                    borderTopColor: color,
                    animation: "spin 0.8s linear infinite",
                  }} />
                  <span style={{
                    color: muted,
                    fontSize: 10,
                    fontFamily: font.mono,
                    letterSpacing: 2,
                    fontWeight: 500,
                  }}>
                    LOADING HD VIDEO…
                  </span>
                </div>
              )}

              {!errored ? (
                <video
                  ref={videoRef}
                  src={videoUrl(uuid)}
                  poster={thumbUrl(uuid)}
                  autoPlay loop muted playsInline
                  onLoadedData={() => setLoaded(true)}
                  onError={() => { setErrored(true); setLoaded(true); }}
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                    display: "block",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                />
              ) : (
                <div>
                  <img
                    src={thumbUrl(uuid)}
                    alt={`${name} demo`}
                    onError={e => { e.target.style.display = "none"; }}
                    style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    padding: "10px 16px",
                    fontSize: 11,
                    color: muted,
                    fontFamily: font.mono,
                    background: "#0a0a0a",
                  }}>
                    Preview — video connection timed out
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE: 3D YouTube Video from DEMIC */}
          {mode === "3d" && demicId && (
            <div style={{ position: "relative" }}>
              {/* Loading shimmer */}
              {!loaded && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  background: "#0a0a0a",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  minHeight: 220,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `3px solid ${color}33`,
                    borderTopColor: color,
                    animation: "spin 0.8s linear infinite",
                  }} />
                  <span style={{
                    color: muted,
                    fontSize: 10,
                    fontFamily: font.mono,
                    letterSpacing: 2,
                    fontWeight: 500,
                  }}>
                    LOADING 3D DEMO…
                  </span>
                </div>
              )}

              {/* YouTube embed container */}
              <div style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 aspect ratio
                background: "#000",
              }}>
                <iframe
                  ref={iframeRef}
                  src={demicEmbedUrl(demicId)}
                  title={`${name} - 3D Demo`}
                  allow="autoplay; encrypted-media"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  onLoad={() => setLoaded(true)}
                  onError={() => { setErrored(true); setLoaded(true); }}
                />
              </div>

              {/* Attribution badge */}
              <div style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 2,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 9,
                color: "#aaa",
                fontFamily: font.mono,
                letterSpacing: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}>
                <span style={{ color: "#fff", fontWeight: 600 }}>DEMIC</span>
                <span>3D</span>
              </div>
            </div>
          )}

          {/* Bottom Caption Bar */}
          <div style={{
            padding: "10px 16px",
            background: "linear-gradient(0deg, #0a0a0a, #111)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${color}22`,
          }}>
            <span style={{
              fontSize: 11,
              color,
              fontFamily: font.mono,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}>
              {name.toUpperCase()}
            </span>
            <span style={{
              fontSize: 9,
              padding: "3px 10px",
              borderRadius: 9999,
              background: `${color}15`,
              border: `1px solid ${color}33`,
              color,
              fontFamily: font.mono,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}>
              {mode === "loop" ? "LOOPING DIAGRAM" : mode === "video" ? "HD VIDEO LOOP" : "3D ANIMATION"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
