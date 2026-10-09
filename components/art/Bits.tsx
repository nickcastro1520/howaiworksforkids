/* Shared illustration pieces. Sticker style: soft fills + one dark outline color. */
export const OUT = "#231d4f";

export type GlorbData = {
  color: "teal" | "orange";
  eyes: 1 | 2 | 3;
  top: "horns" | "antenna";
  spots: boolean;
  shape: "round" | "tall" | "square" | "spiky";
};

/** A star-ish outline for spiky Glorbs: points alternate between an outer and inner ellipse. */
function spikyPath(cx: number, cy: number, rx: number, ry: number, points = 12) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const a = (Math.PI * i) / points - Math.PI / 2;
    const out = i % 2 === 0;
    const x = cx + Math.cos(a) * (out ? rx + 9 : rx - 3);
    const y = cy + Math.sin(a) * (out ? ry + 9 : ry - 3);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

const GLORB_FILL = { teal: "#33c4b0", orange: "#ff9a3c" };
const GLORB_DARK = { teal: "#1f9a89", orange: "#e0731a" };

export function Glorb({ g, size = 96, className = "" }: { g: GlorbData; size?: number; className?: string }) {
  const fill = GLORB_FILL[g.color];
  const dark = GLORB_DARK[g.color];
  const tall = g.shape === "tall";
  const topY = tall ? 22 : 36;
  const eyeY = tall ? 54 : 64;
  const eyeXs = g.eyes === 1 ? [60] : g.eyes === 2 ? [46, 74] : [38, 60, 82];
  const eyeR = g.eyes === 1 ? 13 : g.eyes === 2 ? 10 : 8.5;
  return (
    <svg viewBox="0 0 120 124" width={size} height={size * (124 / 120)} className={className} aria-hidden="true">
      <ellipse cx="60" cy="118" rx="34" ry="4.5" fill={OUT} opacity="0.12" />
      {g.top === "horns" ? (
        <g fill="#fff3d1" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round">
          <path d={`M38 ${topY + 8} L30 ${topY - 14} L50 ${topY + 2} Z`} />
          <path d={`M82 ${topY + 8} L90 ${topY - 14} L70 ${topY + 2} Z`} />
        </g>
      ) : (
        <g stroke={OUT} strokeWidth="3.5" strokeLinecap="round">
          <path d={`M46 ${topY + 4} L38 ${topY - 14}`} />
          <path d={`M74 ${topY + 4} L82 ${topY - 14}`} />
          <circle cx="38" cy={topY - 17} r="6" fill="#ffd34d" />
          <circle cx="82" cy={topY - 17} r="6" fill="#ffd34d" />
        </g>
      )}
      <ellipse cx="44" cy="112" rx="11" ry="6" fill={dark} stroke={OUT} strokeWidth="3.5" />
      <ellipse cx="76" cy="112" rx="11" ry="6" fill={dark} stroke={OUT} strokeWidth="3.5" />
      {tall ? (
        <rect x="24" y={topY} width="72" height={108 - topY} rx="36" fill={fill} stroke={OUT} strokeWidth="4" />
      ) : g.shape === "square" ? (
        <rect x="16" y="36" width="88" height="74" rx="12" fill={fill} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      ) : g.shape === "spiky" ? (
        <path d={spikyPath(60, 74, 40, 34)} fill={fill} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      ) : (
        <ellipse cx="60" cy="74" rx="44" ry="38" fill={fill} stroke={OUT} strokeWidth="4" />
      )}
      <path
        d={tall ? "M36 46 q6 -14 18 -16" : "M30 62 q8 -16 22 -20"}
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {g.spots && (
        <g fill={dark}>
          <circle cx="36" cy={tall ? 90 : 88} r="5" />
          <circle cx="84" cy={tall ? 84 : 86} r="6.5" />
          <circle cx="70" cy={tall ? 98 : 98} r="3.5" />
        </g>
      )}
      {eyeXs.map((x) => (
        <g key={x}>
          <circle cx={x} cy={eyeY} r={eyeR} fill="#fff" stroke={OUT} strokeWidth="3" />
          <circle cx={x + 1.5} cy={eyeY + 1.5} r={eyeR * 0.45} fill={OUT} />
        </g>
      ))}
      <path
        d={`M50 ${eyeY + 20} q10 9 20 0`}
        stroke={OUT}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const ANIMAL = {
  red: { fill: "#ff5d5d", dark: "#d23b3b" },
  blue: { fill: "#4b9dff", dark: "#2a6fd0" },
  yellow: { fill: "#ffcc33", dark: "#e0a400" },
} as const;
export type AnimalColor = keyof typeof ANIMAL;

export function Fish({ color, size = 90, className = "" }: { color: AnimalColor; size?: number; className?: string }) {
  const c = ANIMAL[color];
  return (
    <svg viewBox="0 0 120 90" width={size} height={size * 0.75} className={className} aria-hidden="true">
      <path d="M86 45 L114 22 L108 45 L114 68 Z" fill={c.dark} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 22 q10 -16 26 -6 q-6 6 -6 10 z" fill={c.dark} stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
      <ellipse cx="54" cy="46" rx="42" ry="26" fill={c.fill} stroke={OUT} strokeWidth="4" />
      <path d="M58 30 q8 16 0 32" stroke={c.dark} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M70 32 q7 14 0 28" stroke={c.dark} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="40" r="7" fill="#fff" stroke={OUT} strokeWidth="3" />
      <circle cx="29" cy="41" r="3.2" fill={OUT} />
      <path d="M16 54 q6 4 12 1" stroke={OUT} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="102" cy="20" r="3" fill="#bfe6ff" />
      <circle cx="108" cy="10" r="2" fill="#bfe6ff" />
    </svg>
  );
}

export function Bird({ color, size = 90, className = "" }: { color: AnimalColor; size?: number; className?: string }) {
  const c = ANIMAL[color];
  return (
    <svg viewBox="0 0 120 100" width={size} height={size * (100 / 120)} className={className} aria-hidden="true">
      <path d="M56 86 v10 M68 86 v10" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      <path d="M22 50 L4 40 L10 58 Z" fill={c.dark} stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
      <ellipse cx="60" cy="56" rx="40" ry="32" fill={c.fill} stroke={OUT} strokeWidth="4" />
      <path d="M40 54 q18 26 40 4 q-18 -6 -40 -4z" fill={c.dark} stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M96 46 L116 52 L96 60 Z" fill="#ffb02e" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="84" cy="42" r="7" fill="#fff" stroke={OUT} strokeWidth="3" />
      <circle cx="86" cy="42" r="3.2" fill={OUT} />
      <path d="M58 24 q4 -12 14 -10 q-4 6 -2 12" fill={c.dark} stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function Cat({ size = 90, glow = false, className = "" }: { size?: number; glow?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 120 110" width={size} height={size * (110 / 120)} className={className} aria-hidden="true">
      <path d="M24 46 L22 8 L52 30 Z" fill="#ffb067" stroke={glow ? "#ff3d7f" : OUT} strokeWidth={glow ? 6 : 4} strokeLinejoin="round" />
      <path d="M96 46 L98 8 L68 30 Z" fill="#ffb067" stroke={glow ? "#ff3d7f" : OUT} strokeWidth={glow ? 6 : 4} strokeLinejoin="round" />
      <path d="M30 32 L28 18 L42 28 Z M90 32 L92 18 L78 28 Z" fill="#ffd9e3" />
      <ellipse cx="60" cy="62" rx="44" ry="38" fill="#ffb067" stroke={OUT} strokeWidth="4" />
      <path d="M48 28 q4 8 0 14 M60 26 v14 M72 28 q-4 8 0 14" stroke="#e0832f" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="44" cy="58" r="6" fill={OUT} />
      <circle cx="76" cy="58" r="6" fill={OUT} />
      <circle cx="46" cy="56" r="2" fill="#fff" />
      <circle cx="78" cy="56" r="2" fill="#fff" />
      <path d="M56 70 h8 l-4 5 z" fill="#ff7a9c" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M60 75 q-6 8 -12 4 M60 75 q6 8 12 4" stroke={OUT} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g stroke={glow ? "#ff3d7f" : OUT} strokeWidth={glow ? 4 : 2.5} strokeLinecap="round">
        <path d="M36 72 L8 66 M36 78 L8 82 M84 72 L112 66 M84 78 L112 82" />
      </g>
    </svg>
  );
}

export function PhotoCard({ children, tilt = 0, className = "" }: { children: React.ReactNode; tilt?: number; className?: string }) {
  return (
    <div className={className}>
      <div className="photo-card" style={{ transform: `rotate(${tilt}deg)` }}>
        {children}
      </div>
    </div>
  );
}

export function Sparkle({ size = 22, color = "#ffd34d", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1Z" fill={color} stroke={OUT} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
