import type { ThemeId } from "@/lib/types";

const ART: Record<ThemeId, { src: string; alt: string }> = {
  space: {
    src: "/art/starship.svg",
    alt: "A steel ship descending on bright landing flames",
  },
  dinosaurs: {
    src: "/art/trex.svg",
    alt: "A roaring cartoon Tyrannosaurus running",
  },
  ebikes: {
    src: "/art/wheelie.svg",
    alt: "A helmeted rider popping a wheelie on a dirt electric bike",
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
    // SVGs in /public stay sharp at any card size without a raster step.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={art.src} alt={title ?? ""} className={className} draggable={false} />
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
            className={`${swap} h-full w-full object-contain`}
          />
        );
      })}
    </div>
  );
}
