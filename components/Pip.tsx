import type { Mood } from "@/lib/lessons";

type Props = {
  mood?: Mood;
  size?: number;
  lights?: number;
  wave?: boolean;
  bob?: boolean;
  look?: { x: number; y: number };
  className?: string;
  title?: string;
};

const OUT = "#231d4f";
const GLOW = "#79f2da";

function Eyes({ mood, lx, ly }: { mood: Mood; lx: number; ly: number }) {
  const t = `translate(${lx} ${ly})`;
  switch (mood) {
    case "proud":
      return (
        <g transform={t} stroke={GLOW} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M70 98 q10 -12 20 0" />
          <path d="M110 98 q10 -12 20 0" />
        </g>
      );
    case "wow":
      return (
        <g transform={t}>
          <circle cx="80" cy="94" r="13" fill={GLOW} />
          <circle cx="120" cy="94" r="13" fill={GLOW} />
          <circle cx="84" cy="89" r="4" fill="#fff" />
          <circle cx="124" cy="89" r="4" fill="#fff" />
        </g>
      );
    case "oops":
      return (
        <g transform={t} stroke={GLOW} strokeWidth="5.5" strokeLinecap="round" fill="none">
          <path d="M72 86 l14 8 l-14 8" />
          <path d="M128 86 l-14 8 l14 8" />
        </g>
      );
    case "think":
      return (
        <g transform={t}>
          <g className="pip-blink">
            <ellipse cx="84" cy="90" rx="7.5" ry="10" fill={GLOW} />
            <ellipse cx="124" cy="90" rx="7.5" ry="10" fill={GLOW} />
          </g>
          <path d="M74 76 q8 -5 16 -2" stroke={GLOW} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      );
    default:
      return (
        <g transform={t} className="pip-blink">
          <ellipse cx="80" cy="93" rx="8.5" ry="11.5" fill={GLOW} />
          <ellipse cx="120" cy="93" rx="8.5" ry="11.5" fill={GLOW} />
          <circle cx="83" cy="88" r="3" fill="#fff" />
          <circle cx="123" cy="88" r="3" fill="#fff" />
        </g>
      );
  }
}

function Mouth({ mood }: { mood: Mood }) {
  const common = { stroke: GLOW, strokeWidth: 5, strokeLinecap: "round" as const, fill: "none" };
  switch (mood) {
    case "wow":
      return <ellipse cx="100" cy="117" rx="6" ry="7" fill={GLOW} />;
    case "oops":
      return <path d="M86 118 q4.5 -5 9 0 t9 0 t9 0" {...common} strokeWidth={4.5} />;
    case "think":
      return <path d="M92 117 h16" {...common} />;
    case "proud":
      return <path d="M84 111 q16 16 32 0 z" fill={GLOW} stroke={GLOW} strokeWidth="3" strokeLinejoin="round" />;
    default:
      return <path d="M88 112 q12 11 24 0" {...common} />;
  }
}

export function Pip({
  mood = "happy",
  size = 200,
  lights = 0,
  wave = false,
  bob = true,
  look,
  className = "",
  title,
}: Props) {
  const lx = look ? Math.max(-5, Math.min(5, look.x)) : 0;
  const ly = look ? Math.max(-4, Math.min(4, look.y)) : 0;
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 200 236"
      width={size}
      height={(size * 236) / 200}
      className={`pip ${bob ? "pip-bob" : ""} ${className}`}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="pipShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4ddff" />
        </linearGradient>
        <linearGradient id="pipScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2566" />
          <stop offset="1" stopColor="#151236" />
        </linearGradient>
        <radialGradient id="pipBulb">
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset="1" stopColor="#ffc531" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="228" rx="52" ry="6" fill="#231d4f" opacity="0.12" className="pip-shadow" />
      {/* antenna */}
      <path d="M100 44 V24" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="17" r="13" fill="#ffd34d" opacity="0.35" className="pip-glow" />
      <circle cx="100" cy="17" r="8.5" fill="url(#pipBulb)" stroke={OUT} strokeWidth="3.5" />
      {/* arms */}
      <path d="M58 176 q-22 6 -26 24" stroke={OUT} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M58 176 q-22 6 -26 24" stroke="#ece7ff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <g className={wave ? "pip-wave" : ""} style={{ transformOrigin: "142px 176px" }}>
        <path d="M142 176 q22 -6 30 -26" stroke={OUT} strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M142 176 q22 -6 30 -26" stroke="#ece7ff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="173" cy="146" r="8" fill="#ff7a8a" stroke={OUT} strokeWidth="3.5" />
      </g>
      <circle cx="31" cy="203" r="8" fill="#ff7a8a" stroke={OUT} strokeWidth="3.5" />
      {/* body */}
      <rect x="58" y="150" width="84" height="70" rx="28" fill="url(#pipShell)" stroke={OUT} strokeWidth="4" />
      <rect x="74" y="168" width="52" height="30" rx="12" fill="#231d4f" />
      {Array.from({ length: 7 }).map((_, i) => {
        const on = i < lights;
        const cx = 81 + i * 6.3;
        return (
          <circle
            key={i}
            cx={cx}
            cy="183"
            r="2.6"
            fill={on ? "#ffd34d" : "#4a4380"}
            className={on ? "pip-light-on" : ""}
          />
        );
      })}
      {/* ears */}
      <rect x="18" y="80" width="20" height="40" rx="10" fill="#8f7bff" stroke={OUT} strokeWidth="4" />
      <rect x="162" y="80" width="20" height="40" rx="10" fill="#8f7bff" stroke={OUT} strokeWidth="4" />
      {/* head */}
      <rect x="30" y="42" width="140" height="118" rx="46" fill="url(#pipShell)" stroke={OUT} strokeWidth="4" />
      <path d="M52 58 q20 -10 44 -9" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
      <rect x="46" y="60" width="108" height="84" rx="32" fill="url(#pipScreen)" stroke={OUT} strokeWidth="3" />
      <ellipse cx="62" cy="122" rx="7" ry="4.5" fill="#ff7a9c" opacity="0.55" />
      <ellipse cx="138" cy="122" rx="7" ry="4.5" fill="#ff7a9c" opacity="0.55" />
      <Eyes mood={mood} lx={lx} ly={ly} />
      <g transform={`translate(${lx * 0.6} ${ly * 0.6})`}>
        <Mouth mood={mood} />
      </g>
      {mood === "oops" && (
        <path d="M168 54 q7 10 0 15 q-7 -5 0 -15z" fill="#7cc8ff" stroke={OUT} strokeWidth="2.5" />
      )}
      {mood === "think" && (
        <g fill="#fff" stroke={OUT} strokeWidth="2.5">
          <circle cx="176" cy="40" r="5" />
          <circle cx="188" cy="24" r="7" />
        </g>
      )}
    </svg>
  );
}
