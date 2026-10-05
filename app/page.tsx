import Link from "next/link";
import { ThemeArt, ThemeArtSwap } from "@/components/Art";
import { JsonLd } from "@/components/JsonLd";
import { LessonTrail } from "@/components/LessonTrail";
import { LESSONS } from "@/lib/lessons";
import { siteGraph } from "@/lib/seo";
import { NICK } from "@/lib/site";
import { THEMES } from "@/lib/themes";

const swapClass = {
  space: "swap-space",
  dinosaurs: "swap-dinos",
  ebikes: "swap-ebikes",
} as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={siteGraph()} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <section className="grid items-center gap-6 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-extrabold tracking-wide text-accent uppercase">
              Ages 6–14 · free · no sign-up
            </p>
            <h1 className="mt-2 font-display text-5xl leading-[0.95] font-bold sm:text-7xl">
              How AI works, explained so a kid can teach it back.
            </h1>
            <p className="age-kids mt-4 max-w-xl text-lg">
              Seven short games. No ads. No account. No chatting with a live AI.
            </p>
            <p className="age-tweens mt-4 max-w-xl text-lg">
              Seven games, one reading level up. Grown-up names stay in small chips. Still no ads, no
              account, and no live model.
            </p>
            {THEMES.map((theme) => (
              <p key={theme.id} className={`${swapClass[theme.id]} mt-2 max-w-xl text-muted`}>
                <span className="age-kids">{theme.hero.kids}</span>
                <span className="age-tweens">{theme.hero.tweens}</span>
              </p>
            ))}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link className="btn btn-primary" href="/lessons/not-magic">
                Start with “AI isn’t magic”
              </Link>
              <Link className="btn btn-ghost" href="/lessons">
                See all {LESSONS.length} lessons
              </Link>
            </div>
          </div>
          <ThemeArtSwap className="mx-auto h-80 w-full max-w-md md:h-[28rem]" />
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-3" aria-label="Promises">
          {[
            ["No accounts", "Nothing to sign up for. Kids don’t make a profile."],
            ["No live chat", "The games are scripted on this device. No message goes to an AI."],
            ["No ads", "The lessons stay free. No checkout and no paywall."],
          ].map(([title, copy]) => (
            <article key={title} className="sticker p-4">
              <h2 className="font-display text-2xl font-bold">{title}</h2>
              <p className="mt-1 text-sm text-muted">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-12" aria-labelledby="lesson-path">
          <h2 id="lesson-path" className="font-display text-4xl font-bold">
            The path
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Play in order, or skip around. Every lesson is unlocked. Worlds change the examples, not
            the idea.
          </p>
          <div className="mt-5">
            <LessonTrail />
          </div>
        </section>

        <section className="mt-12" aria-labelledby="worlds">
          <h2 id="worlds" className="font-display text-4xl font-bold">
            Three worlds
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {THEMES.map((theme) => (
              <article key={theme.id} className="sticker p-4">
                <ThemeArt theme={theme.id} className="h-48 w-full object-contain" />
                <h3 className="mt-3 font-display text-2xl font-bold">{theme.name}</h3>
                <p className="mt-2 text-sm text-muted">{theme.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sticker mt-12 p-5 sm:p-8">
          <h2 className="font-display text-4xl font-bold">Made for families</h2>
          <p className="mt-3 max-w-2xl">
            {NICK.name} in {NICK.city} built this for kids, including his sons Nathan (8) and Nolan
            (11), who are the test users. Their notes are not invented — the tested-by page stays a
            placeholder until real sessions are written down.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link className="btn btn-sun" href="/parents">
              For parents and teachers
            </Link>
            <Link className="btn btn-ghost" href="/tested-by-kids">
              Tested by real kids
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
