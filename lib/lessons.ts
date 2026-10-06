export type Lesson = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: number;
  summary: string;
  does: string;
  takeaway: string;
  shareLine: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "not-magic",
    number: 1,
    title: "AI isn't magic",
    subtitle: "It finds patterns",
    minutes: 4,
    summary:
      "A first game about how AI works: it is not a magic trick. It looks at examples and guesses the pattern.",
    does: "Finish three pattern rounds, including one where the honest answer is “I can’t tell yet.”",
    takeaway: "AI is not magic. It looks at examples and guesses what comes next.",
    shareLine: "AI isn't magic. It finds patterns.",
  },
  {
    slug: "learn-by-trying",
    number: 2,
    title: "Learn by trying",
    subtitle: "Practice and feedback",
    minutes: 6,
    summary:
      "Teach a buddy with practice and feedback. Right cheers help. A wrong cheer teaches the wrong lesson.",
    does: "Coach a buddy through a few tries, then see what happens when a wrong answer gets a cheer.",
    takeaway: "The buddy learns from what you cheer. A wrong cheer teaches a wrong lesson.",
    shareLine: "Practice and feedback teach the buddy. Wrong cheers teach the wrong lesson.",
  },
  {
    slug: "words-need-context",
    number: 3,
    title: "Words need context",
    subtitle: "The same word can change",
    minutes: 5,
    summary:
      "One word, two jobs. Kids pick the meaning that fits the sentence, because the words around it matter.",
    does: "Read two sentences that share a word and pick the meaning that fits each one.",
    takeaway: "The same word can mean different things. The other words tell you which meaning it is.",
    shareLine: "The same word can mean different things. Context tells you which.",
  },
  {
    slug: "tricky-look-alikes",
    number: 4,
    title: "Tricky look-alikes",
    subtitle: "False patterns",
    minutes: 5,
    summary:
      "Some things look the same, and some things rise together, without one causing the other. Kids spot the trap.",
    does: "Sort a look-alike from the real thing, then find the hidden reason when two counts go up together.",
    takeaway: "Looking alike is not the same as being the same. Going up together is not the same as “because.”",
    shareLine: "Together is not the same as because. Look-alikes can fool a pattern finder.",
  },
  {
    slug: "what-it-notices",
    number: 5,
    title: "What it pays attention to",
    subtitle: "The question picks the clue",
    minutes: 5,
    summary:
      "A busy scene has lots of details. The question decides which detail matters and which ones are distractions.",
    does: "Tap the clue that answers the question, then see a new question change the clue.",
    takeaway: "You do not have to notice everything. The question tells you what matters.",
    shareLine: "The question decides what to notice.",
  },
  {
    slug: "check-a-source",
    number: 6,
    title: "Check a source",
    subtitle: "Look it up before you answer",
    minutes: 5,
    summary:
      "Guessing with no source can sound sure and still be wrong. Kids check a tiny shelf, answer from a card, or say when it is not there.",
    does: "Answer one question from a source card, and refuse a question the shelf cannot answer.",
    takeaway: "Look it up before you answer. If it is not on the shelf, say you don’t know.",
    shareLine: "Check a source before you answer. If it isn’t there, say so.",
  },
  {
    slug: "be-safe-and-honest",
    number: 7,
    title: "Be safe and honest",
    subtitle: "AI can be wrong",
    minutes: 6,
    summary:
      "AI can sound sure and still be wrong. Kids sort private information, and practice when to ask a grown-up.",
    does: "Spot a wrong-but-sure line, sort what to keep private, and choose when to ask a grown-up.",
    takeaway: "AI can be wrong. Don’t share private stuff. Ask a grown-up about safety, health, and meeting people.",
    shareLine: "AI can be wrong. Keep private info private. Ask a grown-up when it matters.",
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}

export function nextLesson(slug: string): Lesson | undefined {
  const index = LESSONS.findIndex((lesson) => lesson.slug === slug);
  if (index < 0) return undefined;
  return LESSONS[index + 1];
}
