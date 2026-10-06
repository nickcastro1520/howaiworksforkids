/* A flat Pip for generated images (Satori supports basic inline SVG). */
export function OgPip({ size = 360 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 236" width={size} height={(size * 236) / 200}>
      <path d="M100 44 V24" stroke="#231d4f" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="17" r="9" fill="#ffd34d" stroke="#231d4f" strokeWidth="3.5" />
      <rect x="58" y="150" width="84" height="70" rx="28" fill="#efeaff" stroke="#231d4f" strokeWidth="4" />
      <rect x="74" y="168" width="52" height="30" rx="12" fill="#231d4f" />
      <circle cx="88" cy="183" r="3" fill="#ffd34d" />
      <circle cx="100" cy="183" r="3" fill="#ffd34d" />
      <circle cx="112" cy="183" r="3" fill="#ffd34d" />
      <rect x="18" y="80" width="20" height="40" rx="10" fill="#8f7bff" stroke="#231d4f" strokeWidth="4" />
      <rect x="162" y="80" width="20" height="40" rx="10" fill="#8f7bff" stroke="#231d4f" strokeWidth="4" />
      <rect x="30" y="42" width="140" height="118" rx="46" fill="#ffffff" stroke="#231d4f" strokeWidth="4" />
      <rect x="46" y="60" width="108" height="84" rx="32" fill="#231d4f" />
      <ellipse cx="80" cy="93" rx="9" ry="12" fill="#79f2da" />
      <ellipse cx="120" cy="93" rx="9" ry="12" fill="#79f2da" />
      <path d="M86 112 q14 13 28 0" stroke="#79f2da" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M142 176 q22 -6 30 -26" stroke="#231d4f" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="173" cy="146" r="8" fill="#ff7a8a" stroke="#231d4f" strokeWidth="3.5" />
      <path d="M58 176 q-22 6 -26 24" stroke="#231d4f" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="31" cy="203" r="8" fill="#ff7a8a" stroke="#231d4f" strokeWidth="3.5" />
    </svg>
  );
}
