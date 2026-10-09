"use client";

import { useEffect, useRef, useState } from "react";
import { SayLine } from "../Speak";
import { Dots, Emo, GameHead, PipSays, Sayable, type GameProps } from "./ui";

type Kind = "helper" | "doer";
const CARDS: { text: string; emoji: string; kind: Kind; why: string }[] = [
  { text: "Quiz me on my spelling words.", emoji: "🔤", kind: "helper", why: "Helper! You still do the spelling. The quiz helps you learn." },
  { text: "Write my whole report for me.", emoji: "📄", kind: "doer", why: "Doer! If AI writes it all, your brain doesn't learn anything." },
  { text: "Give me 3 ideas for my drawing.", emoji: "💡", kind: "helper", why: "Helper! You pick an idea and do the drawing." },
  { text: "Explain why the sky is blue, in easy words.", emoji: "🌤️", kind: "helper", why: "Helper! It explains, and you do the learning." },
  { text: "Do my math homework so I can go play.", emoji: "➗", kind: "doer", why: "Doer! Homework is how your brain gets stronger." },
  { text: "Make my birthday card for Grandma so I don't have to.", emoji: "🎂", kind: "doer", why: "Doer! Grandma wants a card made by you." },
];

const IDEAS = [
  { text: "a dragon", emoji: "🐉" },
  { text: "a pizza", emoji: "🍕" },
  { text: "a robot", emoji: "🤖" },
  { text: "a rocket", emoji: "🚀" },
  { text: "a cat", emoji: "🐱" },
  { text: "a castle", emoji: "🏰" },
  { text: "a snail", emoji: "🐌" },
  { text: "a rainbow", emoji: "🌈" },
  { text: "a tree house", emoji: "🌳" },
  { text: "a submarine", emoji: "🌊" },
];
const INKS = ["#231d4f", "#e2483d", "#3f86e0", "#3faa4f", "#ffb020"];

function Sorter({ onFinished }: { onFinished: () => void }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Kind | null>(null);
  const [results, setResults] = useState<(boolean | null)[]>([]);
  const [dx, setDx] = useState(0);
  const start = useRef<number | null>(null);
  const c = CARDS[i];
  const finished = results.length === CARDS.length;

  function choose(k: Kind) {
    if (pick || finished) return;
    setPick(k);
    setDx(k === "helper" ? -260 : 260);
    setResults((r) => [...r, k === c.kind]);
  }

  function next() {
    if (i + 1 >= CARDS.length) {
      onFinished();
      setI(i + 1);
    } else setI(i + 1);
    setPick(null);
    setDx(0);
  }

  if (finished && i >= CARDS.length) {
    const score = results.filter(Boolean).length;
    return (
      <div className="game-panel">
        <p className="big-score">
          {score}/{CARDS.length}
        </p>
        <PipSays mood="proud">
          Great sorting! A helper gives ideas, quizzes you, and explains things. You do the thinking and the making.
        </PipSays>
      </div>
    );
  }

  return (
    <div className="game-panel">
      <Dots total={CARDS.length} results={results} />
      <div className="hd-arena">
        <span className="hd-side hd-left" aria-hidden="true">
          🤝 Helper
        </span>
        <div
          className={`hd-card ${pick ? "is-gone" : ""}`}
          key={i}
          style={{ transform: `translateX(${dx}px) rotate(${dx / 18}deg)` }}
          onPointerDown={(e) => {
            if (pick) return;
            start.current = e.clientX;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (start.current === null) return;
            setDx(e.clientX - start.current);
          }}
          onPointerUp={() => {
            if (start.current === null) return;
            start.current = null;
            if (dx < -80) choose("helper");
            else if (dx > 80) choose("doer");
            else setDx(0);
          }}
          onPointerCancel={() => {
            start.current = null;
            setDx(0);
          }}
        >
          <Emo e={c.emoji} big />
          <p>&ldquo;{c.text}&rdquo;</p>
          <small aria-hidden="true">Swipe or tap a button</small>
        </div>
        <span className="hd-side hd-right" aria-hidden="true">
          Doer 🛋️
        </span>
      </div>
      <div className="say-row">
        <p className="ask-q">Is this a helper or a doer?</p>
        <SayLine key={i} text={`${c.text} Is this a helper, or a doer?`} label="the card" size="md" />
      </div>
      {!pick ? (
        <div className="ask-btns">
          <Sayable text="Helper. It helps me learn.">
            <button type="button" className="btn btn-big btn-yes" onClick={() => choose("helper")}>
              <Emo e="🤝" /> Helper
            </button>
          </Sayable>
          <Sayable text="Doer. It does the work for me.">
            <button type="button" className="btn btn-big btn-no" onClick={() => choose("doer")}>
              <Emo e="🛋️" /> Doer
            </button>
          </Sayable>
        </div>
      ) : (
        <>
          <PipSays mood={pick === c.kind ? "proud" : "think"}>
            {pick === c.kind ? "" : "Hmm, think again! "}
            {c.why}
          </PipSays>
          <button type="button" className="btn btn-big btn-go" onClick={next}>
            {i + 1 >= CARDS.length ? "See my score" : "Next card"} &rarr;
          </button>
        </>
      )}
    </div>
  );
}

function DrawPad() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ink, setInk] = useState(INKS[0]);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = Math.round(rect.width * ratio);
    c.height = Math.round(rect.height * ratio);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  function stroke(to: { x: number; y: number }) {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const from = last.current ?? to;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x + 0.01, to.y);
    ctx.stroke();
    last.current = to;
  }

  function clear() {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, r.width, r.height);
  }

  return (
    <div className="drawpad">
      <canvas
        ref={canvas}
        className="drawpad-canvas"
        aria-label="Drawing space. Draw with your finger or a mouse."
        role="img"
        onPointerDown={(e) => {
          drawing.current = true;
          last.current = null;
          e.currentTarget.setPointerCapture(e.pointerId);
          stroke(point(e));
        }}
        onPointerMove={(e) => drawing.current && stroke(point(e))}
        onPointerUp={() => {
          drawing.current = false;
          last.current = null;
        }}
        onPointerCancel={() => (drawing.current = false)}
      />
      <div className="drawpad-tools" role="group" aria-label="Colors">
        {INKS.map((c, k) => (
          <button
            key={c}
            type="button"
            className={`ink ${ink === c ? "is-on" : ""}`}
            style={{ background: c }}
            aria-label={["Dark blue", "Red", "Blue", "Green", "Yellow"][k]}
            aria-pressed={ink === c}
            onClick={() => setInk(c)}
          />
        ))}
        <button type="button" className="btn btn-plain" onClick={clear}>
          <Emo e="🧽" /> Clear
        </button>
      </div>
      <p className="muted center">Your drawing isn&rsquo;t saved or sent anywhere. It disappears when you leave.</p>
    </div>
  );
}

function IdeaMachine() {
  const [ideas, setIdeas] = useState<typeof IDEAS>([]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [made, setMade] = useState(false);

  function spin() {
    const pool = [...IDEAS];
    const out: typeof IDEAS = [];
    while (out.length < 3) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    setIdeas(out);
    setChosen([]);
    setMade(false);
  }

  const mix = chosen.length === 2 ? `${chosen[0]} plus ${chosen[1]}` : "";

  return (
    <div className="game-panel">
      <h3 className="tm-helpers-title">Pip&rsquo;s Idea Machine</h3>
      <div className="say-row">
        <p className="ask-q">{ideas.length ? "Pick 2 ideas to mix together." : "Pip gives ideas. YOU do the making!"}</p>
        <SayLine
          key={ideas.map((x) => x.text).join()}
          text={ideas.length ? `Pick 2 ideas to mix together: ${ideas.map((x) => x.text).join(", ")}.` : "Pip gives ideas. You do the making! Tap the idea machine."}
          label="what to do"
          size="md"
        />
      </div>
      <button type="button" className="btn btn-big btn-sun" onClick={spin}>
        <Emo e="🎰" /> {ideas.length ? "New ideas" : "Get 3 ideas"}
      </button>
      {ideas.length > 0 && (
        <div className="ask-btns three">
          {ideas.map((x) => {
            const on = chosen.includes(x.text);
            return (
              <Sayable key={x.text} text={x.text}>
                <button
                  type="button"
                  className={`btn btn-big btn-plain idea ${on ? "is-on" : ""}`}
                  aria-pressed={on}
                  onClick={() =>
                    setChosen((c) => (on ? c.filter((t) => t !== x.text) : c.length >= 2 ? [c[1], x.text] : [...c, x.text]))
                  }
                >
                  <Emo e={x.emoji} big /> {x.text}
                </button>
              </Sayable>
            );
          })}
        </div>
      )}
      {mix && (
        <>
          <div className="say-row">
            <p className="idea-mix">
              Draw: <b>{chosen[0]}</b> + <b>{chosen[1]}</b>!
            </p>
            <SayLine key={mix} text={`Your mix: ${mix}! Now you draw it. What would that look like?`} label="your mix" />
          </div>
          <DrawPad key={mix} />
          {!made ? (
            <button type="button" className="btn btn-big btn-go" onClick={() => setMade(true)}>
              <Emo e="✅" /> I made it!
            </button>
          ) : (
            <PipSays mood="wow">
              Wow! I only gave you two little ideas. YOU imagined it and drew it. That&rsquo;s using AI as a helper!
            </PipSays>
          )}
        </>
      )}
    </div>
  );
}

export function HelperOrDoer({ onDone }: GameProps) {
  const [sorted, setSorted] = useState(false);
  return (
    <div className="game hd">
      <GameHead
        title="Helper or Doer?"
        say="Is the AI helping you learn, or doing the work for you? Swipe left or tap Helper. Swipe right or tap Doer. Then use Pip's Idea Machine and draw your own idea."
      >
        Is the AI <b>helping</b> you learn, or <b>doing</b> the work for you? Swipe left for Helper, right for Doer, or tap a button. Then mix
        ideas and draw!
      </GameHead>
      <Sorter
        onFinished={() => {
          setSorted(true);
          onDone();
        }}
      />
      {sorted && <IdeaMachine />}
    </div>
  );
}
