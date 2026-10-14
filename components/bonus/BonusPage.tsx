import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SECTIONS } from "@/lib/lessons";

type Game = { title: string; path: string; section: 1 | 2; blurb: string };

export function BonusPage({ game, children }: { game: Game; children: React.ReactNode }) {
  const sec = SECTIONS[game.section];
  return (
    <div className="bonus-page">
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Lessons", path: "/lessons" },
              { name: sec.kicker, path: sec.path },
              { name: game.title, path: game.path },
            ]}
          />
        </div>
        <p className="small-cap center">Bonus game &middot; {sec.kicker}</p>
        <h1 className="page-title">{game.title}</h1>
        <p className="page-lead center">{game.blurb}</p>
      </header>
      <div className="wrap narrow">
        {children}
        <p className="center">
          <Link href={sec.path} className="btn btn-plain">
            Back to the {sec.kicker} trail
          </Link>
        </p>
      </div>
    </div>
  );
}
