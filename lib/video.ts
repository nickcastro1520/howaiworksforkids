/**
 * Optional lesson videos. Files live in /public/video and are served from this site only
 * (CSP media-src 'self'). They never preload and nothing about watching them is tracked.
 */
export type LessonVideo = {
  title: string;
  /** Short text alternative: what happens in the clip, for anyone who can't watch it. */
  description: string;
  src: string;
  poster: string;
  captions: string;
  seconds: number;
  /** ISO date the video was added. */
  uploadDate: string;
  /** Honest label shown under the video. */
  credit: string;
};

export const LESSON_VIDEOS: Record<string, LessonVideo> = {
  "where-did-ai-come-from": {
    title: "Watch Pip\u2019s time ride",
    description:
      "In this 13-second cartoon, Pip rides a hoverboard past a giant old computer that fills a whole room. Then computers get smaller and much faster, and a swirl of pictures and words zooms by. Pip ends up in a classroom where four AI helper characters wave hello. The captions name them: ChatGPT, Claude, Gemini and Grok.",
    src: "/video/pip-ai-story.mp4",
    poster: "/video/pip-ai-story-poster.webp",
    captions: "/video/pip-ai-story.en.vtt",
    seconds: 13,
    uploadDate: "2026-10-09",
    credit: "Video made with AI (Google Veo) for this lesson.",
  },
};

export const videoFor = (slug: string): LessonVideo | undefined => LESSON_VIDEOS[slug];
