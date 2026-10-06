export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path d="M24 10 V5" stroke="#231d4f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="4.5" r="3.5" fill="#ffd34d" stroke="#231d4f" strokeWidth="2" />
      <rect x="2.5" y="20" width="6" height="12" rx="3" fill="#8f7bff" stroke="#231d4f" strokeWidth="2" />
      <rect x="39.5" y="20" width="6" height="12" rx="3" fill="#8f7bff" stroke="#231d4f" strokeWidth="2" />
      <rect x="6" y="10" width="36" height="32" rx="13" fill="#fff" stroke="#231d4f" strokeWidth="2.5" />
      <rect x="10.5" y="14.5" width="27" height="23" rx="9" fill="#231d4f" />
      <ellipse cx="19" cy="24" rx="2.6" ry="3.4" fill="#79f2da" />
      <ellipse cx="29" cy="24" rx="2.6" ry="3.4" fill="#79f2da" />
      <path d="M20 30 q4 3 8 0" stroke="#79f2da" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
