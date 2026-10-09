"use client";

import { useState } from "react";
import { Glorb } from "../art/Bits";
import { SayLine } from "../Speak";
import { SHAPE_NAME, START_BOX, TRAY, TRYOUTS, boxCounts, fairMeter, isFair, pipPicks, type TeamGlorb } from "@/lib/fair";
import { Emo, GameHead, PipSays, type GameProps } from "./ui";

type Phase = "start" | "picked" | "box";

function FairMeter({ box }: { box: TeamGlorb[] }) {
  const m = fairMeter(box);
  const fair = m.every((x) => x.picked === x.total);
  const words = m.map((x) => `${SHAPE_NAME[x.shape]}: ${x.picked} of ${x.total} picked`).join(". ");
  return (
    <div className={`fair-meter ${fair ? "is-fair" : ""}`}>
      <div className="fair-meter-head">
        <Emo e="⚖️" big />
        <p className="fair-meter-title">Fair Meter: {fair ? "Fair for everyone!" : "Not fair yet"}</p>
        <SayLine text={`Fair Meter. ${fair ? "Fair for everyone!" : "Not fair yet."} ${words}.`} label="the Fair Meter" />
      </div>
      <ul className="fair-bars" aria-label="Glorbs picked for the team, by shape">
        {m.map((x) => (
          <li key={x.shape}>
            <span className="fair-bar-label">{SHAPE_NAME[x.shape]}</span>
            <span className="fair-bar" aria-hidden="true">
              <span style={{ width: `${(x.picked / x.total) * 100}%` }} />
            </span>
            <span className="fair-bar-n">
              {x.picked} of {x.total}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FairTeam({ onDone }: GameProps) {
  const [box, setBox] = useState<TeamGlorb[]>(START_BOX);
  const [tested, setTested] = useState<TeamGlorb[]>(START_BOX);
  const [phase, setPhase] = useState<Phase>("start");
  const [tip, setTip] = useState("");
  const [won, setWon] = useState(false);
  const added = box.length - START_BOX.length;
  const counts = boxCounts(box);
  const maxCount = Math.max(...counts.map((c) => c.n), 1);

  function add(t: TeamGlorb) {
    if (box.some((b) => b.id === t.id)) return;
    setBox([...box, t]);
    setTip(
      t.shape === "round"
        ? "That's another round one. My box already has lots of those!"
        : `A ${t.shape} Glorb! Now I know ${t.shape} Glorbs can be players too.`,
    );
  }

  function test() {
    setTested(box);
    setPhase("picked");
    setTip("");
    if (isFair(box) && !won) {
      setWon(true);
      onDone();
    }
  }

  const fairNow = isFair(tested);
  const leftOut = TRYOUTS.filter((t) => !pipPicks(tested, t)).length;

  return (
    <div className="game fair">
      <GameHead
        title="Pick the Team"
        say="Pip is picking players for Glorb Ball. Every Glorb trying out is a great player. Let Pip pick, then check the Fair Meter. If someone gets left out, open Pip's example box and add the kinds it never saw."
      >
        Pip is picking players for <b>Glorb Ball</b>. Every Glorb trying out is a great player! Let Pip pick, check the <b>Fair Meter</b>, and
        fix Pip&rsquo;s example box if anyone gets left out.
      </GameHead>

      <div className="game-panel">
        <ul className="fair-tryouts" aria-label="Glorbs trying out">
          {TRYOUTS.map((t) => {
            const picked = phase !== "start" && pipPicks(tested, t);
            const out = phase !== "start" && !picked;
            return (
              <li key={t.id} className={`fair-card ${picked ? "is-picked" : ""} ${out ? "is-out" : ""}`}>
                <Glorb g={t} size={72} />
                <span className="fair-tag">
                  {phase === "start" ? (
                    <>{SHAPE_NAME[t.shape]}</>
                  ) : picked ? (
                    <>
                      <Emo e="✅" /> On the team
                    </>
                  ) : (
                    <>
                      <Emo e="😢" /> Left out
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {phase === "start" && (
          <>
            <PipSays mood="happy">I learned what a Glorb Ball player looks like from the examples in my box. Let me pick the team!</PipSays>
            <button type="button" className="btn btn-big btn-go" onClick={test}>
              <Emo e="🏐" /> Let Pip pick the team
            </button>
          </>
        )}

        {phase !== "start" && <FairMeter box={tested} />}

        {phase === "picked" &&
          (fairNow ? (
            <>
              <PipSays mood="proud">
                Everyone made the team! I just needed examples of <b>every kind</b> of Glorb. Now I&rsquo;m fair for everyone.
              </PipSays>
              <p className="win-line">Fair for everyone!</p>
            </>
          ) : (
            <>
              <PipSays mood={added ? "think" : "oops"}>
                {added
                  ? `Better! But ${leftOut} great ${leftOut === 1 ? "player is" : "players are"} still left out. ${leftOut === 1 ? "It looks" : "They look"} too different from my examples. Add more kinds!`
                  : "Uh-oh. I only picked round Glorbs! I'm not being mean. I only learned from round ones, so the others don't look like players to me."}
              </PipSays>
              <button type="button" className="btn btn-big btn-sun" onClick={() => setPhase("box")}>
                <Emo e="📦" /> Open Pip&rsquo;s example box
              </button>
            </>
          ))}

        {phase === "box" && (
          <div className="fair-box pop">
            <div className="say-row">
              <p className="ask-q">Pip&rsquo;s example box</p>
              <SayLine
                text={`Pip's example box. ${counts.map((c) => `${c.n} ${c.shape}`).join(", ")}. Tap a Glorb below to add it as an example. Then test again.`}
                label="the example box"
                size="md"
              />
            </div>
            <ul className="fair-chart" aria-label="Examples in Pip's box, by shape">
              {counts.map((c) => (
                <li key={c.shape}>
                  <span className="fair-col" aria-hidden="true">
                    <span style={{ height: `${(c.n / maxCount) * 100}%` }} />
                  </span>
                  <span className="fair-col-n">{c.n}</span>
                  <span className="fair-col-label">{SHAPE_NAME[c.shape]}</span>
                </li>
              ))}
            </ul>
            <p className="muted center">Tap a Glorb to add it to Pip&rsquo;s box:</p>
            <div className="fair-tray">
              {TRAY.map((t) => {
                const inBox = box.some((b) => b.id === t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`fair-add ${inBox ? "is-in" : ""}`}
                    onClick={() => add(t)}
                    disabled={inBox}
                    aria-label={`Add a ${t.shape} ${t.color} Glorb with ${t.eyes} ${t.eyes === 1 ? "eye" : "eyes"}${inBox ? " (added)" : ""}`}
                  >
                    <Glorb g={t} size={58} />
                    <span>{inBox ? "Added ✓" : `+ ${SHAPE_NAME[t.shape]}`}</span>
                  </button>
                );
              })}
            </div>
            {tip && <PipSays mood={tip.startsWith("That's another") ? "think" : "wow"}>{tip}</PipSays>}
            <button type="button" className="btn btn-big btn-go" onClick={test} disabled={added === 0}>
              <Emo e="🔁" /> Test again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
