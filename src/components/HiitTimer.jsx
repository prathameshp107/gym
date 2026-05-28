import { useState, useEffect, useRef } from "react";
import { accent, card, muted, shadow, radius, font, transition, border } from "../data/theme";

export default function HiitTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setIsPhase] = useState("warmup"); // warmup (60s), sprint (60s), recovery (60s)
  const [timeLeft, setTimeLeft] = useState(60); // 60s per phase
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(10);
  const timerRef = useRef(null);

  // Synthesize warning beeps using browser AudioContext
  const triggerAudioBeep = (freq, duration) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      console.warn("AudioContext beep failed (browser restrictions):", err);
    }
  };

  // Warning beeps at 3, 2, 1, and shift at 0
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 3 || timeLeft === 2 || timeLeft === 1) {
      triggerAudioBeep(440, 0.1); // low note warning
    } else if (timeLeft === 0) {
      triggerAudioBeep(880, 0.4); // high note action
    }
  }, [timeLeft, isRunning]);

  // Main timer tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseTransition();
            return 60; // reset to 60s for next phase
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, phase, round]);

  const handlePhaseTransition = () => {
    if (phase === "warmup") {
      setIsPhase("sprint");
      setTimeLeft(60);
    } else if (phase === "sprint") {
      setIsPhase("recovery");
      setTimeLeft(60);
    } else if (phase === "recovery") {
      if (round < totalRounds) {
        setRound((prev) => prev + 1);
        setIsPhase("sprint");
        setTimeLeft(60);
      } else {
        // Workout Finished
        setIsRunning(false);
        setIsPhase("finished");
        setTimeLeft(0);
      }
    }
  };

  const startPause = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPhase("warmup");
    setTimeLeft(60);
    setRound(1);
  };

  const skipPhase = () => {
    handlePhaseTransition();
  };

  // Define colors based on active phase
  const getPhaseStyles = () => {
    switch (phase) {
      case "warmup":
        return {
          color: "#f5a623",
          bg: "rgba(245,166,35,0.06)",
          borderColor: "rgba(245,166,35,0.25)",
          shadowColor: "rgba(245,166,35,0.15)",
          title: "WARM-UP WALK",
          note: "Warm up legs, steady pace 5–6 km/h",
        };
      case "sprint":
        return {
          color: "#ff3e3e",
          bg: "rgba(255,62,62,0.08)",
          borderColor: "rgba(255,62,62,0.3)",
          shadowColor: "rgba(255,62,62,0.25)",
          title: "RUN HARD! SPRINT",
          note: "Sprint at 9–10 km/h — absolute intensity!",
        };
      case "recovery":
        return {
          color: "#50e3c2",
          bg: "rgba(80,227,194,0.08)",
          borderColor: "rgba(80,227,194,0.3)",
          shadowColor: "rgba(80,227,194,0.2)",
          title: "WALK & BREATHE",
          note: "Active recovery at 5 km/h — lower heart rate",
        };
      case "finished":
        return {
          color: "#2ecc71",
          bg: "rgba(46,204,113,0.08)",
          borderColor: "rgba(46,204,113,0.3)",
          shadowColor: "rgba(46,204,113,0.25)",
          title: "HIIT CARDIO COMPLETE!",
          note: "EPOC mode activated. Visceral belly fat is burning!",
        };
      default:
        return {
          color: "#999",
          bg: "rgba(255,255,255,0.02)",
          borderColor: border,
          shadowColor: "rgba(0,0,0,0)",
          title: "STANDBY",
          note: "",
        };
    }
  };

  const style = getPhaseStyles();

  // SVG Progress Ring calculations
  const radiusCircle = 72;
  const circumference = 2 * Math.PI * radiusCircle;
  const progressRatio = phase === "finished" ? 1 : timeLeft / 60;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* HIIT Header */}
      <div style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
      }}>
        <span style={{
          fontSize: 10,
          color: accent,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: font.mono,
          fontWeight: 600,
        }}>
          Fat-Burner Machine
        </span>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>HIIT Interval Assistant</h3>
        <p style={{ fontSize: 13, color: muted, marginTop: 6, lineHeight: 1.5 }}>
          Recommended for Friday and Saturday. This interval structure creates oxygen debt, kicking your metabolism into overdrive.
        </p>
      </div>

      {/* Main Timer Display */}
      <div style={{
        background: card,
        border: `1.5px solid ${style.borderColor}`,
        borderRadius: radius.lg,
        padding: "36px 20px",
        boxShadow: `0 0 40px ${style.shadowColor}, ${shadow.sm}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.5s ease",
      }}>
        {/* Round Counter */}
        <div style={{
          fontSize: 11,
          fontFamily: font.mono,
          color: style.color,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          background: style.bg,
          padding: "4px 14px",
          borderRadius: radius.pill,
          border: `1px solid ${style.borderColor}`,
          marginBottom: 20,
        }}>
          {phase === "finished" ? "Great Job" : `Round ${round} / ${totalRounds}`}
        </div>

        {/* Circular Countdown Gauge */}
        <div style={{ position: "relative", width: 180, height: 180, marginBottom: 20 }}>
          <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="90"
              cy="90"
              r={radiusCircle}
              stroke="#2a2a2a"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="90"
              cy="90"
              r={radiusCircle}
              stroke={style.color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.3s linear" }}
            />
          </svg>
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {phase === "finished" ? (
              <span style={{ fontSize: 32 }}>🏆</span>
            ) : (
              <span style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#fff",
                fontFamily: font.mono,
                letterSpacing: -1,
                lineHeight: 1,
              }}>
                0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            )}
            <span style={{
              fontSize: 10,
              fontFamily: font.mono,
              color: style.color,
              fontWeight: 700,
              letterSpacing: 1.5,
              marginTop: 6,
            }}>
              {style.title}
            </span>
          </div>
        </div>

        {/* Phase Action Guidance */}
        <div style={{
          fontSize: 14,
          fontWeight: 500,
          textAlign: "center",
          color: "#e2e8f0",
          marginBottom: 24,
        }}>
          {style.note}
        </div>

        {/* Control Row */}
        <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 300 }}>
          <button
            onClick={resetTimer}
            style={{
              padding: "12px 18px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${border}`,
              borderRadius: radius.md,
              color: "#ccc",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Reset
          </button>
          <button
            onClick={startPause}
            style={{
              padding: "12px 24px",
              background: isRunning
                ? "linear-gradient(135deg, #e84545, #b83232)"
                : `linear-gradient(135deg, ${style.color}, ${style.color}cc)`,
              border: "none",
              borderRadius: radius.md,
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: `0 4px 16px ${style.shadowColor}`,
              flex: 2,
              transition: transition.fast,
            }}
          >
            {isRunning ? "PAUSE" : "START HIIT"}
          </button>
          {phase !== "finished" && (
            <button
              onClick={skipPhase}
              style={{
                padding: "12px 14px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${border}`,
                borderRadius: radius.md,
                color: "#888",
                fontSize: 13,
                cursor: "pointer",
              }}
              title="Skip to next phase"
            >
              ➔
            </button>
          )}
        </div>
      </div>

      {/* EPOC Fat Burner Science Note */}
      <div style={{
        background: "linear-gradient(135deg, #120500, #0a0200)",
        border: "1px solid rgba(232,69,69,0.15)",
        borderRadius: radius.lg,
        padding: 20,
        boxShadow: shadow.sm,
      }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>🔥</span>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 14.5 }}>The EPOC Fat-Burning Secret</h4>
            <p style={{ fontSize: 13, color: muted, marginTop: 6, lineHeight: 1.6 }}>
              Belly fat (visceral fat) is sensitive to catecholamines (fat-burning hormones) released during high-intensity stress. By sprinting for 1 minute and walking for 1 minute, you elevate growth hormone and trigger **EPOC (Afterburn Effect)**.
            </p>
            <p style={{ fontSize: 13, color: muted, marginTop: 6, lineHeight: 1.6 }}>
              This keeps your body consuming oxygen and burning stubborn abdominal fat for **up to 24 hours** after you step off the treadmill, even while resting or sleeping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
