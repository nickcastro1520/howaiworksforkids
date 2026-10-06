import Link from "next/link";
import { ThemeArt, ThemeArtSwap } from "@/components/Art";
import { JsonLd } from "@/components/JsonLd";
import { LessonTrail } from "@/components/LessonTrail";
import { siteGraph } from "@/lib/seo";
import { NICK } from "@/lib/site";
import { THEMES } from "@/lib/themes";

const swapClass = {
  space: "swap-space",
  dinosaurs: "swap-dinos",
  ebikes: "swap-ebikes",
} as const;

const PROMISES = [
  ["01", "No accounts", "Kids don’t make a profile. Nothing to sign up for."],
  ["02", "No live chat", "The games are scripted on this device. No message goes to an AI."],
  ["03", "No ads", "The lessons stay free. No checkout and no paywall."],
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={siteGraph()} />
      <div className="shell pb-8">
        <section className="hero-home rise">
          <div>
            <p className="kicker">Ages 6–10 · free · no sign-up</p>
            <h1 className="hero-title mt-3 font-bold">
              How AI works, <em>so a kid can teach it back.</em>
            </h1>
            <p className="mt-4 max-w-xl text-lg">
              Seven short games. No ads. No account. No chatting with a live AI.
            </p>
            {THEMES.map((theme) => (
              <p key={theme.id} className={`${swapClass[theme.id]} mt-3 max-w-xl text-muted`}>
                {theme.hero}
              </p>
            ))}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link className="btn btn-primary" href="/lessons/not-magic">
                Start with “AI isn’t magic”
              </Link>
              <Link className="btn btn-ghost" href="/lessons">
                See the path
              </Link>
            </div>
          </div>
          <ThemeArtSwap className="hero-art" />
        </section>

        <ul className="promise" aria-label="Promises">
          {PROMISES.map(([num, title, copy]) => (
            <li key={num}>
              <span className="num">{num}</span>
              <strong>{title}</strong>
              <p className="mt-1 text-sm text-muted">{copy}</p>
            </li>
          ))}
        </ul>

        <section className="mt-12" aria-labelledby="lesson-path">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 id="lesson-path" className="font-display text-4xl font-bold sm:text-5xl">
              Seven games. <em className="text-accent">One path.</em>
            </h2>
            <Link className="font-extrabold underline decoration-2 underline-offset-4" href="/lessons">
              Open the full index
            </Link>
          </div>
          <LessonTrail variant="stepper" />
        </section>

        <section className="mt-10" aria-labelledby="worlds">
          <h2 id="worlds" className="font-display text-4xl font-bold sm:text-5xl">
            The pictures change. The ideas don’t.
          </h2>
          {THEMES.map((theme, index) => (
            <article
              key={theme.id}
              className={index % 2 === 1 ? "world-band world-band-flip" : "world-band"}
            >
              <ThemeArt theme={theme.id} className="world-band-art" />
              <div className="world-band-copy">
                <p className="kicker">World 0{index + 1}</p>
                <h3 className="mt-2 font-bold">{theme.name}</h3>
                <p className="mt-2 max-w-sm text-lg text-muted">{theme.blurb}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="family-close">
          <h2 className="font-bold">Made for families in {NICK.city}.</h2>
          <div>
            <p className="text-lg">
              {NICK.name} built this for kids, including his sons Nathan (8) and Nolan (11), who are
              the test users. Their notes are not invented. The tested-by page stays a placeholder
              until real sessions are written down.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link className="btn btn-sun" href="/parents">
                For parents and teachers
              </Link>
              <Link className="btn btn-ghost" href="/tested-by-kids">
                Tested by real kids
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
