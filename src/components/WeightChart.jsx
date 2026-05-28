import { useMemo } from "react";
import { accent, muted, font, radius, border, shadow, card } from "../data/theme";

const PAD = { top: 20, bottom: 30, left: 46, right: 20 };
const W = 680;
const H = 280;
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;

export default function WeightChart({ weightLog }) {
  const points = useMemo(() => {
    if (!weightLog || weightLog.length < 2) return [];
    return weightLog.map(l => ({ date: l.date, w: l.w }));
  }, [weightLog]);

  const { minY, maxY, yRange, yStep, xScale, yScale, linePath, areaPath, targetTop, targetBottom } = useMemo(() => {
    if (points.length < 2) return { minY: 85, maxY: 105, yRange: 20, yStep: 5, xScale: () => 0, yScale: () => 0, linePath: "", areaPath: "", targetTop: 0, targetBottom: 0 };

    const vals = points.map(p => p.w);
    let min = Math.min(...vals);
    let max = Math.max(...vals);
    const margin = (max - min) * 0.25 || 3;
    min = Math.floor(min - margin);
    max = Math.ceil(max + margin);
    const range = max - min;

    const xScaleFn = (i) => PAD.left + (i / (points.length - 1)) * INNER_W;
    const yScaleFn = (v) => PAD.top + INNER_H - ((v - min) / range) * INNER_H;

    const lineParts = points.map((p, i) => `${i === 0 ? "M" : "L"}${xScaleFn(i).toFixed(1)},${yScaleFn(p.w).toFixed(1)}`);
    const line = lineParts.join(" ");

    const last = points.length - 1;
    const area = `${line} L${xScaleFn(last).toFixed(1)},${PAD.top + INNER_H} L${xScaleFn(0).toFixed(1)},${PAD.top + INNER_H} Z`;

    const step = Math.max(1, Math.ceil(range / 6));

    return {
      minY: min,
      maxY: max,
      yRange: range,
      yStep: step,
      xScale: xScaleFn,
      yScale: yScaleFn,
      linePath: line,
      areaPath: area,
      targetTop: yScaleFn(93),
      targetBottom: yScaleFn(90),
    };
  }, [points]);

  if (points.length < 2) {
    return (
      <div style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        padding: 24,
        textAlign: "center",
        boxShadow: shadow.sm,
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
        <div style={{ color: muted, fontSize: 14 }}>
          Log at least 2 weight entries to see your trend chart.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: card,
      border: `1px solid ${border}`,
      borderRadius: radius.lg,
      padding: 20,
      boxShadow: shadow.sm,
      animation: "fadeInUp 0.4s ease",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 16 }}>📈</span>
        <span style={{
          fontSize: 10,
          color: accent,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: font.mono,
          fontWeight: 600,
        }}>
          Weight Trend
        </span>
        <span style={{
          marginLeft: "auto",
          fontSize: 11,
          color: muted,
          fontFamily: font.mono,
        }}>
          {points[0].date} → {points[points.length - 1].date}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        {/* Target zone (Goal: 90-93kg) */}
        <rect
          x={PAD.left}
          y={targetBottom}
          width={INNER_W}
          height={targetTop - targetBottom}
          fill="rgba(46,204,113,0.08)"
          rx={4}
        />
        <line
          x1={PAD.left} y1={targetTop}
          x2={W - PAD.right} y2={targetTop}
          stroke="rgba(46,204,113,0.25)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <line
          x1={PAD.left} y1={targetBottom}
          x2={W - PAD.right} y2={targetBottom}
          stroke="rgba(46,204,113,0.25)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text x={W - PAD.right - 4} y={targetTop - 4} textAnchor="end" fill="rgba(46,204,113,0.4)" fontSize={9} fontFamily={font.mono}>
          Goal 93kg
        </text>
        <text x={W - PAD.right - 4} y={targetBottom + 13} textAnchor="end" fill="rgba(46,204,113,0.4)" fontSize={9} fontFamily={font.mono}>
          Goal 90kg
        </text>

        {/* Grid lines */}
        {Array.from({ length: Math.ceil(yRange / yStep) + 1 }, (_, i) => {
          const yVal = minY + i * yStep;
          const yPos = yScale(yVal);
          return (
            <g key={i}>
              <line x1={PAD.left} y1={yPos} x2={W - PAD.right} y2={yPos} stroke="#2a2a2a" strokeWidth={1} />
              <text x={PAD.left - 8} y={yPos + 3} textAnchor="end" fill="#666" fontSize={10} fontFamily={font.mono}>
                {yVal}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#weightGrad)" opacity={0.3} />

        <defs>
          <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity={0.5} />
            <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {/* Line */}
        <path d={linePath} fill="none" stroke={accent} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"
          style={{ animation: "fadeIn 0.8s ease" }}
        />

        {/* Data points */}
        {points.map((p, i) => {
          const cx = xScale(i);
          const cy = yScale(p.w);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={5} fill={accent} stroke="#0f0f0f" strokeWidth={2}
                style={{ animation: `fadeIn 0.3s ease ${i * 0.1}s both` }}
              >
                <title>{`${p.date}: ${p.w} kg`}</title>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
