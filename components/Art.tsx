import type { ThemeId } from "@/lib/types";

const ART: Record<ThemeId, { src: string; alt: string }> = {
  space: {
    src: "/art/starship.jpg",
    alt: "A space rocket launching",
  },
  dinosaurs: {
    src: "/art/trex.jpg",
    alt: "A roaring T-Rex",
  },
  ebikes: {
    src: "/art/wheelie.jpg",
    alt: "An electric dirt bike wheelie",
  },
};

type ArtProps = {
  className?: string;
  /** When set, the image is announced. Leave empty when a nearby label already names the world. */
  title?: string;
};

export function ThemeArt({
  theme,
  className,
  title,
}: ArtProps & { theme: ThemeId }) {
  const art = ART[theme];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={art.src}
      alt={title ?? ""}
      width={1376}
      height={768}
      className={className}
      draggable={false}
    />
  );
}

export function ThemeArtSwap({ className }: { className?: string }) {
  return (
    <div className={className}>
      {(Object.keys(ART) as ThemeId[]).map((theme) => {
        const art = ART[theme];
        const swap =
          theme === "dinosaurs" ? "swap-dinos" : theme === "ebikes" ? "swap-ebikes" : "swap-space";
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={theme}
            src={art.src}
            alt={art.alt}
            draggable={false}
            width={1376}
            height={768}
            className={`${swap} h-full w-full object-cover`}
          />
        );
      })}
    </div>
  );
}
