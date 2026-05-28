export default function MuscleBadge({ muscle, color }) {
  return (
    <span style={{
      fontSize: 9,
      padding: "3px 10px",
      borderRadius: 9999,
      background: `${color}15`,
      border: `1px solid ${color}33`,
      color,
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      fontWeight: 600,
      letterSpacing: 0.3,
      flexShrink: 0,
      whiteSpace: "nowrap",
    }}>
      {muscle}
    </span>
  );
}
