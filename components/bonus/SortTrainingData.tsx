"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BONUS, freshSeed, SORT_SECONDS, SORT_SETS, sortQueue, type Bin } from "@/lib/bonus";
import { saveScore, useBest } from "@/lib/bonusScores";
import { play } from "@/lib/sound";
import { Pip } from "../Pip";

type Phase = "ready" | "play" | "done";
const GAME = BONUS.sort.slug;

export function SortTrainingData() {
  const best = useBest(GAME);
  const [phase, setPhase] = useState<Phase>("ready");
  const [queue, setQueue] = useState(() => sortQueue(1));
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [left, setLeft] = useState(SORT_SECONDS);
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null);
  const [newBest, setNewBest] = useState(false);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const binRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const firstBin = useRef<HTMLButtonElement | null>(null);

  const cur = queue[i % queue.length];
  const set = SORT_SETS[cur.set];

  const finish = useCallback(
    (final: number) => {
      setPhase("done");
      setNewBest(saveScore(GAME, final));
      play("badge");
    },
    [],
  );

  useEffect(() => {
    if (phase !== "play") return;
    const t = setTimeout(() => {
      if (left <= 1) {
        setLeft(0);
        finish(score);
      } else setLeft(left - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, left, score, finish]);

  function start() {
    setQueue(sortQueue(freshSeed()));
    setI(0);
    setScore(0);
    setMisses(0);
    setLeft(SORT_SECONDS);
    setFlash(null);
    setNewBest(false);
    setPhase("play");
    requestAnimationFrame(() => firstBin.current?.focus());
  }

  function choose(bin: Bin) {
    if (phase !== "play") return;
    const ok = bin.id === cur.item.bin;
    if (ok) {
      setScore((s) => s + 1);
      play("correct");
      setFlash({ ok: true, text: `Yes! A ${cur.item.name} goes in ${bin.label}. Pip learned it.` });
    } else {
      setMisses((m) => m + 1);
      play("oops");
      const right = set.bins.find((b) => b.id === cur.item.bin)!;
      setFlash({ ok: false, text: `Oops! A ${cur.item.name} is ${right.label}. Wrong labels teach Pip the wrong thing.` });
    }
    setI((n) => n + 1);
  }

  useEffect(() => {
    if (phase !== "play") return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
      if (e.key === "ArrowLeft" || e.key === "1") {
        e.preventDefault();
        choose(set.bins[0]);
      } else if (e.key === "ArrowRight" || e.key === "2") {
        e.preventDefault();
        choose(set.bins[1]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function binAt(x: number, y: number): Bin | undefined {
    return set.bins.find((b) => {
      const r = binRefs.current[b.id]?.getBoundingClientRect();
      return r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    });
  }

  const onDown = (e: React.PointerEvent) => {
    if (phase !== "play") return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0 });
  };
  const onMove = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    setDrag({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y });
    setOver(binAt(e.clientX, e.clientY)?.id ?? null);
  };
  const onUp = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    const b = binAt(e.clientX, e.clientY);
    startRef.current = null;
    setDrag(null);
    setOver(null);
    if (b) choose(b);
  };

  if (phase === "ready" || phase === "done") {
    return (
      <div className="bonus-card bonus-start">
        <Pip mood={phase === "done" ? "proud" : "happy"} size={110} bob={false} />
        {phase === "done" ? (
          <div aria-live="polite">
            <p className="bonus-big">
              You sorted <b>{score}</b> {score === 1 ? "example" : "examples"} right!
            </p>
            {newBest ? <p className="bonus-best is-new">🏆 New best score!</p> : best !== null && <p className="bonus-best">Your best: {best}</p>}
            <p>
              {misses === 0
                ? "No wrong labels at all. Pip learned only good examples!"
                : `${misses} ${misses === 1 ? "example went" : "examples went"} in the wrong bin. Real AI gets confused by wrong labels too, so people check training data carefully.`}
            </p>
          </div>
        ) : (
          <div>
            <p className="bonus-big">Help Pip learn by sorting examples into the right bins.</p>
            <p>
              You have {SORT_SECONDS} seconds. Tap a bin, drag the picture onto a bin, or press &larr; and &rarr; on a keyboard.
            </p>
            {best !== null && <p className="bonus-best">Your best: {best}</p>}
          </div>
        )}
        <button type="button" className="btn btn-huge btn-go" onClick={start}>
          {phase === "done" ? "Play again" : "Start"} <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bonus-card sort-game">
      <div className="bonus-hud" aria-live="off">
        <span className="bonus-chip">
          <span aria-hidden="true">⭐</span> Score {score}
        </span>
        <span className={`bonus-chip ${left <= 10 ? "is-low" : ""}`} role="timer" aria-label={`${left} seconds left`}>
          <span aria-hidden="true">⏱️</span> {left}s
        </span>
      </div>
      <div className="bonus-timebar" aria-hidden="true">
        <span style={{ width: `${(left / SORT_SECONDS) * 100}%` }} />
      </div>
      <p className="sort-prompt">Where does this go?</p>
      <div
        key={i}
        className={`sort-item ${drag ? "is-dragging" : ""}`}
        style={drag ? { transform: `translate(${drag.x}px, ${drag.y}px)` } : undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => {
          startRef.current = null;
          setDrag(null);
          setOver(null);
        }}
      >
        <span className="sort-emoji" aria-hidden="true">
          {cur.item.emoji}
        </span>
        <span className="sort-name">{cur.item.name}</span>
      </div>
      <div className="sort-bins">
        {set.bins.map((b, k) => (
          <button
            key={b.id}
            ref={(el) => {
              binRefs.current[b.id] = el;
              if (k === 0) firstBin.current = el;
            }}
            type="button"
            data-no-tap
            className={`sort-bin sort-bin-${k} ${over === b.id ? "is-over" : ""}`}
            onClick={() => choose(b)}
            aria-label={`Put the ${cur.item.name} in ${b.label}`}
          >
            <span className="sort-bin-emoji" aria-hidden="true">
              {b.emoji}
            </span>
            <span>{b.label}</span>
            <kbd aria-hidden="true">{k === 0 ? "←" : "→"}</kbd>
          </button>
        ))}
      </div>
      <p className={`bonus-flash ${flash ? (flash.ok ? "is-ok" : "is-no") : ""}`} aria-live="polite">
        {flash?.text ?? "\u00a0"}
      </p>
    </div>
  );
}
