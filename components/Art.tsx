type ArtProps = {
  className?: string;
  title?: string;
};

export function RocketArt({ className, title }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M60 8c18 16 24 36 24 54v8H36v-8C36 44 42 24 60 8z" fill="currentColor" />
      <circle cx="60" cy="46" r="10" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M36 66 18 88h22l4-22zm48 0 18 22H80l-4-22z" fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M48 78h24l-6 22h-12l-6-22z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M54 100c4 8 8 8 12 0" fill="none" stroke="var(--accent-2)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function DinoArt({ className, title }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M18 78c8-28 28-40 48-36 8-16 28-18 36-4 2 8-2 14-8 16 6 6 10 16 8 26-10 2-16-4-20-8-6 10-20 16-34 14-10 8-24 8-30-8z"
        fill="currentColor"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <circle cx="86" cy="42" r="4" fill="var(--ink)" />
      <path d="M92 48c6 2 10 2 14-2" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 86v14M58 88v12M74 84v14" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="34" cy="70" r="5" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

export function BikeArt({ className, title }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="32" cy="78" r="18" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="90" cy="78" r="18" fill="none" stroke="currentColor" strokeWidth="6" />
      <path d="M32 78 52 46h22l16 32M52 46 68 78H32" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M74 46h18l6-10" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <rect x="58" y="58" width="16" height="10" rx="2" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M66 60v6" stroke="var(--accent-2)" strokeWidth="2" />
    </svg>
  );
}

export function ThemeArt({
  theme,
  className,
  title,
}: ArtProps & { theme: "space" | "dinosaurs" | "ebikes" }) {
  if (theme === "dinosaurs") return <DinoArt className={className} title={title} />;
  if (theme === "ebikes") return <BikeArt className={className} title={title} />;
  return <RocketArt className={className} title={title} />;
}

export function ThemeArtSwap({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <RocketArt className="swap-space h-full w-full text-accent" />
      <DinoArt className="swap-dinos h-full w-full text-accent" />
      <BikeArt className="swap-ebikes h-full w-full text-accent" />
    </div>
  );
}
