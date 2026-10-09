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
    case "where-did-ai-come-from":
      return (
        <g {...s}>
          <circle cx="100" cy="100" r="26" />
          <path d="M100 86 V100 L111 108" />
          <path d="M66 92 l-6 8 l10 4" />
        </g>
      );
    case "how-ai-sees-pictures":
      return (
        <g {...s} strokeWidth={5}>
          <rect x="76" y="76" width="16" height="16" fill="#fff" />
          <rect x="92" y="76" width="16" height="16" />
          <rect x="108" y="76" width="16" height="16" fill="#fff" />
          <rect x="76" y="92" width="16" height="16" />
          <rect x="92" y="92" width="16" height="16" fill="#fff" />
          <rect x="108" y="92" width="16" height="16" />
          <rect x="76" y="108" width="16" height="16" fill="#fff" />
          <rect x="92" y="108" width="16" height="16" />
          <rect x="108" y="108" width="16" height="16" fill="#fff" />
        </g>
      );
    case "say-it-clearly":
      return (
        <g {...s}>
          <path d="M74 84 h52 v30 h-30 l-12 12 v-12 h-10 z" />
          <path d="M84 96 h32 M84 106 h20" />
        </g>
      );
    case "check-it-fix-it":
      return (
        <g {...s}>
          <path d="M80 120 l26 -26" />
          <path d="M106 94 a14 14 0 1 1 14 -14 l-10 2 l-4 6 z" fill="#fff" />
          <path d="M76 82 l8 8 l14 -16" />
        </g>
      );
    case "ai-learning-helper":
      return (
        <g {...s}>
          <path d="M100 74 a20 20 0 0 1 12 36 v8 h-24 v-8 a20 20 0 0 1 12 -36z" />
          <path d="M90 128 h20" />
        </g>
      );
    case "fair-for-everyone":
      return (
        <g {...s}>
          <path d="M100 72 V128" />
          <path d="M78 128 H122" />
          <path d="M72 84 H128" />
          <path d="M72 84 L62 106 H82 Z" />
          <path d="M128 84 L118 106 H138 Z" />
        </g>
      );
    case "secrets-stay-safe":
      return (
        <g {...s}>
          <rect x="78" y="96" width="44" height="34" rx="6" />
          <path d="M86 96 V86 a14 14 0 0 1 28 0 V96" />
          <path d="M100 108 v10" />
        </g>
      );
    case "build-your-own-ai":
      return (
        <g {...s}>
          <rect x="76" y="80" width="48" height="44" rx="10" />
          <path d="M100 80 V68" />
          <circle cx="100" cy="64" r="4" fill="#fff" />
          <circle cx="90" cy="100" r="3" fill="#fff" />
          <circle cx="110" cy="100" r="3" fill="#fff" />
          <path d="M90 112 H110" />
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
