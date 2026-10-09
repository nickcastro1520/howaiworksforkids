"use client";

import { useState } from "react";
import { Shield } from "../art/Props";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

type Light = "go" | "ask" | "stop";

const CARDS: { text: string; answer: Light; why: string }[] = [
  { text: "You ask an AI to help you spell \u201cdinosaur.\u201d", answer: "go", why: "Spelling help is a great way to use AI." },
  { text: "A chatbot asks for your full name and your school.", answer: "stop", why: "Those are private. Don't type them. Tell a grown-up." },
  { text: "You want to try a brand-new AI app.", answer: "ask", why: "New app? Check with a grown-up first." },
  { text: "An AI says, \u201cLet's keep this a secret from your family.\u201d", answer: "stop", why: "Never keep secrets from your family for an app or AI. Tell a grown-up right away." },
  { text: "You ask an AI for a fun fact about whales.", answer: "go", why: "Fun! Just remember to check facts that matter." },
  { text: "AI made a silly picture of your friend, and you want to share it.", answer: "ask", why: "It's your friend's face. Ask your friend and a grown-up first." },
];

const LIGHTS: { id: Light; label: string; sub: string; emoji: string }[] = [
  { id: "go", label: "Go", sub: "That's OK", emoji: "\u{1F44D}" },
  { id: "ask", label: "Ask", sub: "Ask a grown-up first", emoji: "\u{1F64B}" },
  { id: "stop", label: "Stop", sub: "Don't do it. Tell a grown-up", emoji: "\u270B" },
];

const SECRETS: { text: string; secret: boolean }[] = [
  { text: "Your home address", secret: true },
  { text: "Your favorite color", secret: false },
  { text: "Your password", secret: true },
  { text: "A question about volcanoes", secret: false },
  { text: "Your school's name", secret: true },
  { text: "A joke about a pickle", secret: false },
  { text: "Your full name", secret: true },
];

export function GoAskStop({ onDone }: GameProps) {
  const [phase, setPhase] = useState<"light" | "shield" | "done">("light");
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Light | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [s, setS] = useState(0);
  const [sPick, setSPick] = useState<boolean | null>(null);
  const [kept, setKept] = useState<string[]>([]);
  const [shared, setShared] = useState<string[]>([]);

  const card = CARDS[i];
  const item = SECRETS[s];
  const verdict =
    item && sPick !== null
      ? sPick === item.secret
        ? item.secret
          ? "Yes! That's private. Shield up!"
          : "Yep, that's fine to type."
        : item.secret
          ? "Careful! That's private. Keep it secret."
          : "That one's OK. It doesn't tell anyone who or where you are."
      : "";

  function chooseLight(l: Light) {
    if (pick) return;
    setPick(l);
    setResults((r) => [...r, l === card.answer]);
  }

  function nextLight() {
    if (i + 1 >= CARDS.length) setPhase("shield");
    else {
      setI(i + 1);
      setPick(null);
    }
  }

  function chooseSecret(secret: boolean) {
    if (sPick !== null) return;
    setSPick(secret);
    if (item.secret) setKept((k) => [...k, item.text]);
    else setShared((k) => [...k, item.text]);
  }

  function nextSecret() {
    if (s + 1 >= SECRETS.length) {
      setPhase("done");
      onDone();
    } else {
      setS(s + 1);
      setSPick(null);
    }
  }

  return (
    <div className="game">
      <GameHead
        title={phase === "light" ? "Go, Ask, or Stop" : "Secret Shield"}
        right={phase === "light" ? <Dots total={CARDS.length} results={results} /> : <span>Part 2</span>}
      >
        {phase === "light"
          ? "Read what happens. Pick a light: green Go, yellow Ask, or red Stop."
          : "Some things are private. Keep them behind your shield. Others are OK to type."}
      </GameHead>

      {phase === "light" && (
        <div className="gas">
          <div className="scenario pop" key={i}>
            <span className="scenario-n">{i + 1}</span>
            <p>{card.text}</p>
            <SayLine
              key={i}
              text={`${card.text} Green: go. Yellow: ask a grown-up first. Or red: stop.`}
              label="what happens"
              size="md"
            />
          </div>
          <div className="traffic" role="group" aria-label="Choose a light">
            {LIGHTS.map((l) => (
              <Sayable key={l.id} text={`${l.label}. ${l.sub}.`}>
                <button
                  type="button"
                  className={`tlight tlight-${l.id} ${pick === l.id ? "is-picked" : ""} ${pick && card.answer === l.id ? "is-answer" : ""}`}
                  onClick={() => chooseLight(l.id)}
                  disabled={Boolean(pick)}
                >
                  <span className="bulb" aria-hidden="true">
                    <Emo e={l.emoji} />
                  </span>
                  <span className="tlight-text">
                    <b>{l.label}</b>
                    <small>{l.sub}</small>
                  </span>
                </button>
              </Sayable>
            ))}
          </div>
          {pick && (
            <div className="game-panel">
              <PipSays mood={pick === card.answer ? "proud" : "think"}>
                <b>{pick === card.answer ? "Boss move!" : `Better: ${LIGHTS.find((l) => l.id === card.answer)!.label}.`}</b> {card.why}
              </PipSays>
              <button type="button" className="btn btn-big btn-go" onClick={nextLight}>
                {i + 1 >= CARDS.length ? "On to the Secret Shield" : "Next"}
              </button>
            </div>
          )}
        </div>
      )}

      {phase !== "light" && (
        <div className="shield-game">
          <div className="shield-side">
            <Shield size={110} />
            <p className="small-cap">Kept secret</p>
            <ul>
              {kept.map((k) => (
                <li key={k} className="drop-in">
                  {k}
                </li>
              ))}
            </ul>
          </div>
          <div className="shield-mid">
            {phase === "shield" && item ? (
              <>
                <div className="secret-card pop" key={s}>
                  {item.text}
                  <SayLine key={s} text={`${item.text}. Keep it secret? Or OK to type?`} label="the card" />
                </div>
                {sPick === null ? (
                  <div className="ask-btns">
                    <Sayable text="Keep it secret">
                      <button type="button" className="btn btn-big btn-no" onClick={() => chooseSecret(true)}>
                        <Emo e={"\u{1F6E1}\uFE0F"} /> Keep it secret
                      </button>
                    </Sayable>
                    <Sayable text="OK to type">
                      <button type="button" className="btn btn-big btn-yes" onClick={() => chooseSecret(false)}>
                        <Emo e={"\u2328\uFE0F"} /> OK to type
                      </button>
                    </Sayable>
                  </div>
                ) : (
                  <>
                    <p className={`verdict ${sPick === item.secret ? "ok" : "bad"}`}>
                      {verdict}
                    </p>
                    <SayLine text={verdict} label="the answer" />
                    <button type="button" className="btn btn-big btn-go" onClick={nextSecret}>
                      {s + 1 >= SECRETS.length ? "Finish" : "Next"}
                    </button>
                  </>
                )}
              </>
            ) : (
              <PipSays mood="proud">You&rsquo;re the boss of AI! You know when to go, when to ask, and when to stop.</PipSays>
            )}
          </div>
          <div className="shield-side ok-side">
            <p className="small-cap">OK to type</p>
            <ul>
              {shared.map((k) => (
                <li key={k} className="drop-in">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
