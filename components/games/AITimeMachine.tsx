"use client";

import { useState } from "react";
import { Pip } from "../Pip";
import { SayLine } from "../Speak";
import { Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

/** General eras only. The one dated fact (the name was coined in a 1955 proposal) is "about 70 years ago". */
const EVENTS = [
  { era: "Long, long ago", emoji: "📜", text: "People told stories about machines that could think." },
  { era: "About 70 years ago", emoji: "🖥️", text: "Scientists named the idea \u201cartificial intelligence.\u201d Some computers were as big as a room." },
  { era: "Later", emoji: "♟️", text: "Computers learned to play games like checkers and chess." },
  { era: "Not so long ago", emoji: "📸", text: "With lots of data and fast computers, AI got good at knowing what is in a picture and what people say." },
  { era: "Now", emoji: "💬", text: "AI helpers can chat, write, and make pictures." },
];
/** Fixed scrambled order (same on server and client). */
const START_ORDER = [3, 0, 4, 2, 1];

const INGREDIENTS = [
  { id: "data", emoji: "📚", text: "Lots more data", good: true, why: "Yes! Lots of examples to learn from." },
  { id: "keys", emoji: "⌨️", text: "Bigger keyboards", good: false, why: "Nope! A bigger keyboard doesn't help me learn." },
  { id: "fast", emoji: "⚡", text: "Much faster computers", good: true, why: "Yes! Fast computers can look at tons of examples." },
  { id: "magic", emoji: "🪄", text: "A magic wand", good: false, why: "Ha! AI isn't magic." },
  { id: "learn", emoji: "🧠", text: "Better ways to learn from examples", good: true, why: "Yes! Scientists found better ways for AI to learn." },
  { id: "loud", emoji: "🔊", text: "Louder speakers", good: false, why: "Nope! Being loud doesn't make me smart." },
];

/** Listed A to Z on purpose: no ranking, no "best", no links. */
const HELPERS = [
  { name: "ChatGPT", maker: "OpenAI", known: "Known for making AI chat helpers famous when lots of people started using it a few years ago.", mark: "C", color: "#1f7a5c" },
  { name: "Claude", maker: "Anthropic", known: "Known for helping with writing and reading. Its makers focus a lot on AI safety.", mark: "C", color: "#a4532a" },
  { name: "Gemini", maker: "Google", known: "Known for working with words, pictures, and sounds, and for working with other Google apps.", mark: "G", color: "#2f5fd0" },
  { name: "Grok", maker: "xAI", known: "Known for answering with a sense of humor and keeping up with things happening right now.", mark: "G", color: "#231d4f" },
];

export function AITimeMachine({ onDone }: GameProps) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [miss, setMiss] = useState<number | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [last, setLast] = useState<{ id: string; good: boolean } | null>(null);
  const [part, setPart] = useState<"timeline" | "recipe" | "helpers">("timeline");

  const left = START_ORDER.filter((i) => !placed.includes(i));
  const goodCount = picked.filter((id) => INGREDIENTS.find((x) => x.id === id)?.good).length;

  function tapEvent(i: number) {
    const next = placed.length;
    if (i === next) {
      setPlaced([...placed, i]);
      setMiss(null);
    } else {
      setMiss(i);
    }
  }

  function tapIngredient(id: string) {
    const item = INGREDIENTS.find((x) => x.id === id)!;
    setLast({ id, good: item.good });
    if (!item.good || picked.includes(id)) return;
    const nextPicked = [...picked, id];
    setPicked(nextPicked);
    if (nextPicked.length === 3) onDone();
  }

  const lastItem = last ? INGREDIENTS.find((x) => x.id === last.id) : null;

  return (
    <div className="game tm">
      <GameHead
        title="AI Time Machine"
        say="First, put AI's story in order. Tap what happened first, then what came next. Then find the 3 things that made AI work so well."
      >
        Put AI&rsquo;s story in order: tap what happened <b>first</b>, then what came next. Then find the 3 things that made AI work so well.
      </GameHead>

      {part === "timeline" && (
        <div className="game-panel">
          <ol className="tm-line" aria-label="AI's timeline so far">
            {EVENTS.map((e, i) => {
              const on = placed.includes(i);
              return (
                <li key={i} className={`tm-slot ${on ? "is-on pop" : ""}`}>
                  <span className="tm-dot" aria-hidden="true">
                    {on ? e.emoji : i + 1}
                  </span>
                  {on ? (
                    <span className="tm-slot-body">
                      <b>{e.era}</b>
                      <span>{e.text}</span>
                    </span>
                  ) : (
                    <span className="tm-slot-body tm-empty">
                      <span className="sr-only">Empty spot {i + 1}</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          {left.length > 0 ? (
            <>
              <div className="ask-q-row">
                <p className="ask-q">{placed.length === 0 ? "What happened first?" : "What happened next?"}</p>
                <SayLine
                  key={placed.length}
                  text={`${placed.length === 0 ? "What happened first?" : "What happened next?"} ${left.map((i) => EVENTS[i].text).join(" Or: ")}`}
                  label="the question and cards"
                  size="md"
                />
              </div>
              <div className="tm-cards">
                {left.map((i) => (
                  <Sayable key={i} text={EVENTS[i].text}>
                    <button type="button" className={`tm-card ${miss === i ? "is-wrong" : ""}`} onClick={() => tapEvent(i)}>
                      <Emo e={EVENTS[i].emoji} big />
                      <span>{EVENTS[i].text}</span>
                    </button>
                  </Sayable>
                ))}
              </div>
              {miss !== null && (
                <div className="hint-row">
                  <p className="hint">Not yet! Something else happened before that.</p>
                  <SayLine text="Not yet! Something else happened before that." label="the hint" />
                </div>
              )}
            </>
          ) : (
            <>
              <PipSays mood="wow">
                That&rsquo;s my whole family history! People dreamed about thinking machines for a long, long time. But AI only got really
                useful lately. Why? Let&rsquo;s find out!
              </PipSays>
              <button type="button" className="btn btn-big btn-go pop" onClick={() => setPart("recipe")}>
                <Emo e="🧪" /> Why does AI work now?
              </button>
            </>
          )}
        </div>
      )}

      {part === "recipe" && (
        <div className="game-panel">
          <div className="ask-q-row">
            <p className="ask-q">Old computers couldn&rsquo;t do much AI. Which 3 things changed?</p>
            <SayLine
              text={`Old computers couldn't do much AI. Which 3 things changed? Tap them. ${INGREDIENTS.map((x) => x.text).join(". ")}.`}
              label="the question and choices"
              size="md"
            />
          </div>
          <div className="tm-meter" role="img" aria-label={`AI power: ${goodCount} of 3`}>
            <Pip mood={goodCount === 3 ? "proud" : goodCount > 0 ? "happy" : "think"} size={90} lights={goodCount * 2 + (goodCount === 3 ? 1 : 0)} bob={false} />
            <div className="tm-bar" aria-hidden="true">
              <span style={{ width: `${(goodCount / 3) * 100}%` }} />
            </div>
            <b aria-hidden="true">AI power: {goodCount}/3</b>
          </div>
          <div className="tm-ingredients">
            {INGREDIENTS.map((x) => {
              const on = picked.includes(x.id);
              const bad = last?.id === x.id && !last.good;
              return (
                <Sayable key={x.id} text={x.text}>
                  <button
                    type="button"
                    className={`tm-ing ${on ? "is-on" : ""} ${bad ? "is-wrong" : ""}`}
                    onClick={() => tapIngredient(x.id)}
                    aria-pressed={on}
                    disabled={goodCount === 3}
                  >
                    <Emo e={x.emoji} big />
                    <span>{x.text}</span>
                  </button>
                </Sayable>
              );
            })}
          </div>
          {lastItem && goodCount < 3 && (
            <div className={last?.good ? "say-row" : "hint-row"}>
              <p className={last?.good ? "tm-yes" : "hint"}>{lastItem.why}</p>
              <SayLine text={lastItem.why} label="Pip's answer" />
            </div>
          )}
          {goodCount === 3 && (
            <>
              <PipSays mood="proud">
                Lots of data + fast computers + better ways to learn = me! Now meet some real AI helpers that grown-ups use.
              </PipSays>
              <button type="button" className="btn btn-big btn-go pop" onClick={() => setPart("helpers")}>
                <Emo e="👋" /> Meet the AI helpers
              </button>
            </>
          )}
        </div>
      )}

      {part === "helpers" && (
        <div className="game-panel">
          <div className="ask-q-row">
            <h3 className="tm-helpers-title">Meet the AI helpers</h3>
            <SayLine
              text={`Meet the AI helpers. ${HELPERS.map((h) => `${h.name}, made by ${h.maker}. ${h.known}`).join(" ")} Every AI helper can be wrong, so always check.`}
              label="all the AI helpers"
              size="md"
            />
          </div>
          <p className="tm-helpers-sub">Here are four AI helpers you might hear about, listed A to Z. Different companies make them.</p>
          <ul className="tm-helpers">
            {HELPERS.map((h) => (
              <li key={h.name} className="tm-helper" style={{ "--hc": h.color } as React.CSSProperties}>
                <span className="tm-mark" aria-hidden="true">
                  {h.mark}
                </span>
                <span className="tm-helper-body">
                  <b className="tm-helper-name">{h.name}</b>
                  <span className="tm-maker">Made by {h.maker}</span>
                  <span>{h.known}</span>
                </span>
                <SayLine text={`${h.name}, made by ${h.maker}. ${h.known}`} label={h.name} />
              </li>
            ))}
          </ul>
          <div className="tm-warn">
            <p>
              <span aria-hidden="true">⚠️</span> <b>Every AI helper can be wrong.</b> Always check with a grown-up or a trusted book or website.
              Lots of AI helpers are made for grown-ups, so only use them with a grown-up.
            </p>
            <SayLine
              text="Every AI helper can be wrong. Always check with a grown-up or a trusted book or website. Lots of AI helpers are made for grown-ups, so only use them with a grown-up."
              label="the safety tip"
            />
          </div>
        </div>
      )}
    </div>
  );
}
