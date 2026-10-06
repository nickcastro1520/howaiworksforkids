import { OUT } from "./Bits";

type S = { size?: number; className?: string };

export function Book({ size = 90, color = "#6b4cf0", className = "" }: S & { color?: string }) {
  return (
    <svg viewBox="0 0 120 90" width={size} height={size * 0.75} className={className} aria-hidden="true">
      <path d="M8 16 q26 -10 52 4 v62 q-26 -14 -52 -4z" fill="#fff" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M112 16 q-26 -10 -52 4 v62 q26 -14 52 -4z" fill="#fff" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 30 q16 -4 32 2 M18 42 q16 -4 32 2 M18 54 q16 -4 32 2 M70 32 q16 -6 32 -2 M70 44 q16 -6 32 -2 M70 56 q16 -6 32 -2" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

export function BookStack({ size = 140, className = "" }: S) {
  const books = ["#ff6b5b", "#4b9dff", "#ffcc33", "#33c4b0", "#8f7bff", "#ff8fc7", "#ff9a3c"];
  return (
    <svg viewBox="0 0 140 170" width={size} height={size * (170 / 140)} className={className} aria-hidden="true">
      {books.map((c, i) => (
        <g key={c} transform={`translate(${i % 2 ? 8 : 0} ${150 - i * 21}) rotate(${i % 2 ? -2 : 2} 60 10)`}>
          <rect x="10" y="0" width="110" height="20" rx="5" fill={c} stroke={OUT} strokeWidth="3.5" />
          <rect x="22" y="7" width="40" height="6" rx="3" fill="#fff" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

export function Shield({ size = 130, className = "" }: S) {
  return (
    <svg viewBox="0 0 120 140" width={size} height={size * (140 / 120)} className={className} aria-hidden="true">
      <path d="M60 6 L108 24 V66 C108 100 86 122 60 134 C34 122 12 100 12 66 V24 Z" fill="#208644" stroke={OUT} strokeWidth="5" strokeLinejoin="round" />
      <path d="M60 18 L96 32 V66 C96 92 80 110 60 120 Z" fill="#3fb866" />
      <rect x="40" y="62" width="40" height="34" rx="8" fill="#ffd34d" stroke={OUT} strokeWidth="4" />
      <path d="M48 62 v-10 a12 12 0 0 1 24 0 v10" fill="none" stroke={OUT} strokeWidth="5" />
      <circle cx="60" cy="78" r="4.5" fill={OUT} />
    </svg>
  );
}

export function StopSign({ size = 120, className = "" }: S) {
  return (
    <svg viewBox="0 0 120 160" width={size} height={size * (160 / 120)} className={className} aria-hidden="true">
      <rect x="55" y="96" width="10" height="60" rx="4" fill="#9aa3b5" stroke={OUT} strokeWidth="3.5" />
      <path d="M38 6 H82 L114 38 V82 L82 114 H38 L6 82 V38 Z" fill="#ef4444" stroke={OUT} strokeWidth="5" strokeLinejoin="round" />
      <path d="M41 14 H79 L106 41 V79 L79 106 H41 L14 79 V41 Z" fill="none" stroke="#fff" strokeWidth="4" />
      <text x="60" y="70" textAnchor="middle" fontSize="27" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">STOP</text>
    </svg>
  );
}

export function Person({ size = 110, shirt = "#4b9dff", hair = "#5a3a22", skin = "#f2c29b", grown = false, className = "" }: S & { shirt?: string; hair?: string; skin?: string; grown?: boolean }) {
  const s = grown ? 1 : 0.82;
  return (
    <svg viewBox="0 0 100 150" width={size * s} height={size * s * 1.5} className={className} aria-hidden="true">
      <path d="M18 150 V112 q0 -30 32 -30 q32 0 32 30 V150" fill={shirt} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="28" fill={skin} stroke={OUT} strokeWidth="4" />
      <path d="M22 46 q2 -28 28 -28 q28 0 28 28 q-10 -12 -28 -12 q-16 0 -28 12z" fill={hair} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="40" cy="54" r="3.5" fill={OUT} />
      <circle cx="60" cy="54" r="3.5" fill={OUT} />
      <path d="M41 64 q9 8 18 0" stroke={OUT} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="33" cy="63" rx="5" ry="3" fill="#ff8aa0" opacity="0.6" />
      <ellipse cx="67" cy="63" rx="5" ry="3" fill="#ff8aa0" opacity="0.6" />
    </svg>
  );
}

export function Magnifier({ size = 120, className = "" }: S) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
      <path d="M76 76 L108 108" stroke={OUT} strokeWidth="16" strokeLinecap="round" />
      <path d="M76 76 L108 108" stroke="#a0613a" strokeWidth="9" strokeLinecap="round" />
      <circle cx="50" cy="50" r="36" fill="#d8f1ff" fillOpacity="0.75" stroke={OUT} strokeWidth="6" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#ffd34d" strokeWidth="5" />
      <path d="M32 40 q6 -12 18 -14" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function House({ size = 200, className = "" }: S) {
  return (
    <svg viewBox="0 0 200 160" width={size} height={size * 0.8} className={className} aria-hidden="true">
      <path d="M20 76 L100 14 L180 76" fill="#ff7a6b" stroke={OUT} strokeWidth="5" strokeLinejoin="round" />
      <rect x="36" y="70" width="128" height="84" rx="6" fill="#fff5e0" stroke={OUT} strokeWidth="5" />
      <rect x="54" y="88" width="34" height="30" rx="5" fill="#bfe6ff" stroke={OUT} strokeWidth="4" />
      <rect x="112" y="98" width="32" height="56" rx="5" fill="#8f7bff" stroke={OUT} strokeWidth="4" />
      <circle cx="137" cy="128" r="3" fill="#ffd34d" />
      <rect x="132" y="22" width="18" height="30" fill="#c96a5b" stroke={OUT} strokeWidth="4" />
    </svg>
  );
}

export function Computer({ size = 220, className = "" }: S) {
  const nodes = [
    [70, 50], [70, 80], [70, 110], [110, 40], [110, 70], [110, 100], [110, 125], [150, 65], [150, 100],
  ];
  const links = [
    [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [1, 3], [3, 7], [4, 7], [5, 8], [6, 8], [4, 8], [0, 5],
  ];
  return (
    <svg viewBox="0 0 220 190" width={size} height={size * (190 / 220)} className={className} aria-hidden="true">
      <rect x="86" y="150" width="48" height="22" fill="#b9b2dd" stroke={OUT} strokeWidth="4" />
      <rect x="60" y="168" width="100" height="12" rx="6" fill="#d9d4f5" stroke={OUT} strokeWidth="4" />
      <rect x="20" y="14" width="180" height="140" rx="16" fill="#e9e5ff" stroke={OUT} strokeWidth="5" />
      <rect x="32" y="26" width="156" height="116" rx="10" fill="#1b1840" />
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#79f2da" strokeOpacity="0.5" strokeWidth="2.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={i % 3 === 0 ? "#ffd34d" : "#79f2da"} className="node-pulse" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </svg>
  );
}

export function Phone({ size = 110, className = "", children }: S & { children?: React.ReactNode }) {
  return (
    <div className={`phone ${className}`} style={{ width: size, height: size * 1.8 }}>
      <div className="phone-screen">{children}</div>
    </div>
  );
}

export function Hand6({ size = 140, className = "" }: S) {
  const xs = [22, 38, 54, 70, 86, 102];
  return (
    <svg viewBox="0 0 140 150" width={size} height={size * (150 / 140)} className={className} aria-hidden="true">
      {xs.map((x, i) => (
        <g key={x} transform={`rotate(${(i - 2.5) * 7} ${x + 8} 96)`}>
          <rect x={x} y={i === 0 || i === 5 ? 34 : 18} width="16" height="80" rx="8" fill="#f2c29b" stroke={OUT} strokeWidth="4" />
          <path d={`M${x + 4} ${i === 0 || i === 5 ? 46 : 30} h8`} stroke="#d99a6c" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <path d="M18 92 q0 -10 10 -10 h84 q10 0 10 10 v14 q0 36 -52 36 q-52 0 -52 -36z" fill="#f2c29b" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 112 q30 10 60 0" stroke="#d99a6c" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MeltyClock({ size = 140, className = "" }: S) {
  return (
    <svg viewBox="0 0 140 150" width={size} height={size * (150 / 140)} className={className} aria-hidden="true">
      <path d="M18 60 a52 50 0 0 1 104 0 q0 24 -10 36 q-6 8 -4 26 q2 16 -8 16 q-10 0 -8 -18 q2 -14 -10 -14 q-12 0 -14 10 q-2 12 -12 10 q-10 -2 -8 -14 q2 -10 -8 -16 q-22 -12 -22 -36z" fill="#fff8e6" stroke={OUT} strokeWidth="5" strokeLinejoin="round" />
      <text x="70" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill={OUT} fontFamily="system-ui">12</text>
      <text x="108" y="66" textAnchor="middle" fontSize="15" fontWeight="800" fill={OUT} fontFamily="system-ui" transform="rotate(20 108 66)">3</text>
      <text x="36" y="66" textAnchor="middle" fontSize="15" fontWeight="800" fill={OUT} fontFamily="system-ui">17</text>
      <text x="76" y="100" textAnchor="middle" fontSize="15" fontWeight="800" fill={OUT} fontFamily="system-ui" transform="rotate(-30 76 100)">6</text>
      <path d="M70 60 L70 36 M70 60 L92 72" stroke={OUT} strokeWidth="5" strokeLinecap="round" />
      <circle cx="70" cy="60" r="5" fill="#ff6b5b" stroke={OUT} strokeWidth="2.5" />
    </svg>
  );
}

export function Pencil({ size = 140, className = "" }: S) {
  return (
    <svg viewBox="0 0 160 40" width={size} height={size / 4} className={className} aria-hidden="true">
      <path d="M30 6 H130 V34 H30 Z" fill="#ffcc33" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M30 6 L6 20 L30 34 Z" fill="#f6d7ae" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M6 20 L14 15.5 V24.5 Z" fill={OUT} />
      <rect x="130" y="6" width="22" height="28" rx="5" fill="#ff8fc7" stroke={OUT} strokeWidth="4" />
      <path d="M30 20 H130" stroke="#e0a400" strokeWidth="3" />
    </svg>
  );
}

export function Calculator({ size = 90, className = "" }: S) {
  return (
    <svg viewBox="0 0 90 120" width={size} height={size * (120 / 90)} className={className} aria-hidden="true">
      <rect x="6" y="6" width="78" height="108" rx="12" fill="#4b9dff" stroke={OUT} strokeWidth="4" />
      <rect x="16" y="16" width="58" height="24" rx="5" fill="#d8f6e5" stroke={OUT} strokeWidth="3" />
      <text x="68" y="34" textAnchor="end" fontSize="15" fontWeight="800" fill={OUT} fontFamily="system-ui">42</text>
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={16 + c * 21} y={50 + r * 20} width="16" height="14" rx="4" fill={r === 2 && c === 2 ? "#ffcc33" : "#fff"} stroke={OUT} strokeWidth="2.5" />
        )),
      )}
    </svg>
  );
}
