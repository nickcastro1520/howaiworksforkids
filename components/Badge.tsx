import type { Lesson } from "@/lib/lessons";

const OUT = "#231d4f";

function Glyph({ slug }: { slug: string }) {
  const s = { stroke: "#fff", strokeWidth: 7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  switch (slug) {
    case "what-is-ai":
      return (
        <g {...s}>
          <circle cx="94" cy="94" r="20" />
          <path d="M109 109 L124 124" />
        </g>
      );
    case "learning-from-examples":
      return (
        <g {...s}>
          <path d="M70 92 L100 78 L130 92 L100 106 Z" fill="#fff" />
          <path d="M82 100 v16 q18 10 36 0 v-16" />
        </g>
      );
    case "guess-the-next-word":
      return (
        <g {...s}>
          <path d="M72 80 h56 a8 8 0 0 1 8 8 v24 a8 8 0 0 1 -8 8 h-30 l-14 12 v-12 h-12 a8 8 0 0 1 -8 -8 v-24 a8 8 0 0 1 8 -8z" />
          <circle cx="86" cy="100" r="2" fill="#fff" />
          <circle cx="100" cy="100" r="2" fill="#fff" />
          <circle cx="114" cy="100" r="2" fill="#fff" />
        </g>
      );
    case "sneaky-clues":
      return (
        <g {...s}>
          <path d="M70 100 q24 -26 50 0 q-26 26 -50 0z" />
          <path d="M120 100 l14 -12 v24 z" />
          <circle cx="86" cy="96" r="2.5" fill="#fff" />
        </g>
      );
    case "ai-can-be-wrong":
      return (
        <g {...s}>
          <path d="M76 102 l16 16 l32 -34" />
        </g>
      );
    case "real-or-made-up":
      return (
        <g {...s}>
          <path d="M68 100 q32 -32 64 0 q-32 32 -64 0z" />
          <circle cx="100" cy="100" r="9" fill="#fff" />
        </g>
      );
    default:
      return (
        <g {...s}>
          <path d="M100 74 L126 84 V100 C126 116 114 126 100 132 C86 126 74 116 74 100 V84 Z" />
          <path d="M90 102 l7 7 l14 -14" />
        </g>
      );
  }
}

export function Badge({ lesson, size = 120, earned = true }: { lesson: Lesson; size?: number; earned?: boolean }) {
  const color = earned ? lesson.color : "#c9c4dc";
  const points = Array.from({ length: 24 })
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 72 : 80;
      return `${100 + Math.cos(a) * r},${100 + Math.sin(a) * r}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 200 230" width={size} height={size * 1.15} role="img" aria-label={`${lesson.badge} badge${earned ? "" : " (not earned yet)"}`}>
      <path d="M70 160 L56 222 L80 208 L94 228 L100 170 Z" fill={earned ? "#ff6b5b" : "#ddd8ea"} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M130 160 L144 222 L120 208 L106 228 L100 170 Z" fill={earned ? "#ffd34d" : "#e6e2f0"} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <polygon points={points} fill={color} stroke={OUT} strokeWidth="4.5" strokeLinejoin="round" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
      <Glyph slug={lesson.slug} />
      <circle cx="148" cy="46" r="16" fill="#fff" stroke={OUT} strokeWidth="4" />
      <text x="148" y="52.5" textAnchor="middle" fontSize="18" fontWeight="800" fill={OUT} fontFamily="system-ui, sans-serif">
        {lesson.number}
      </text>
    </svg>
  );
}
