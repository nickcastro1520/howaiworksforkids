import { TESTERS, TESTER_CREDIT } from "@/lib/testers";

export function TesterCards() {
  return (
    <>
      <div className="tester-row">
        {TESTERS.map((t) => (
          <figure key={t.name} className="tester" style={{ "--tc": t.color } as React.CSSProperties}>
            <span className="tester-badge">{t.roleShort}</span>
            <blockquote className="tester-quote">
              <p>&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <figcaption>
              <span className="tester-name">
                {t.name}, <span>age {t.age}</span>
              </span>
              <span className="tester-role">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="tester-credit">{TESTER_CREDIT}. Their words, exactly as they said them.</p>
    </>
  );
}
