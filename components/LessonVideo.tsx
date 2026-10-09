"use client";

import { useRef, useState } from "react";
import { videoFor } from "@/lib/video";
import { SayButton } from "./Speak";

/**
 * An optional short video card. preload="none": nothing but the poster loads until the child taps play.
 * No autoplay, no third-party embed, no tracking. The lesson works the same without watching it.
 */
export function LessonVideo({ slug }: { slug: string }) {
  const v = videoFor(slug);
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  if (!v) return null;
  const note = `${v.title}. ${v.description} This video is optional. It has music, so you can turn the sound down with the speaker button on the player.`;

  return (
    <section className="lesson-video" aria-labelledby={`vid-${slug}`}>
      <div className="lesson-video-head">
        <h2 id={`vid-${slug}`}>{v.title}</h2>
        <span className="lesson-video-opt">Optional &middot; {v.seconds} seconds</span>
      </div>
      <div className="lesson-video-frame">
        <video
          ref={ref}
          controls
          playsInline
          preload="none"
          poster={v.poster}
          width={960}
          height={540}
          onPlay={() => {
            setPlaying(true);
            setStarted(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setStarted(false);
          }}
        >
          <source src={v.src} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" src={v.captions} default />
          Your browser can&rsquo;t play this video. The text below tells what happens in it.
        </video>
        {!playing && !started && (
          <button type="button" className="lesson-video-play" onClick={() => void ref.current?.play()} aria-label={`Play video: ${v.title}`}>
            <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
      <div className="lesson-video-text">
        <p>{v.description}</p>
        <SayButton text={note} label="the video description" name="Hear the video description" size="md">
          Hear it
        </SayButton>
      </div>
      <p className="lesson-video-credit">
        {v.credit} It has captions and music. You don&rsquo;t need to watch it to do the lesson.
      </p>
    </section>
  );
}
