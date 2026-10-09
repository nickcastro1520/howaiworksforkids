/**
 * The final quiz: 10 questions across Sections 1 and 2, one per big idea.
 * Same Question format as the lesson quick checks. The result is saved only on this
 * device as { score, missed: conceptId[] } (see lib/progress.ts) and never sent anywhere.
 */
import type { Question } from "./lessons";
import { SITE_URL } from "./site";

export type FinalQuestion = Question & {
  /** Stable concept ID, saved when missed. */
  concept: string;
  /** Short topic name for the grown-up note. */
  topic: string;
  lessons: number[];
  /** One talk question for a grown-up to ask, used when this concept was missed. */
  talk: string;
};

export const FINAL_QUIZ: FinalQuestion[] = [
  {
    concept: "examples",
    topic: "Learning from examples",
    lessons: [2, 15],
    talk: "How did you teach your sorting machine? What did you do when it got one wrong?",
    q: "Pip sorts a new Glorb wrong. What helps Pip most?",
    options: ["Show Pip more good examples", "Yell at Pip", "Turn Pip upside down"],
    icons: ["📚", "😠", "🙃"],
    answer: 0,
    yes: "AI learns from examples. More good examples help it guess better.",
    hint: "How did Pip learn in the first place?",
  },
  {
    concept: "next-word",
    topic: "How chatbots write",
    lessons: [3],
    talk: "Can you play the next-word game with me? I say three words, you guess the next one.",
    q: "How does a chatbot write a sentence?",
    options: ["It guesses the next word, again and again", "It copies one book", "A tiny person types inside"],
    icons: ["🔮", "📕", "🧍"],
    answer: 0,
    yes: "A chatbot guesses the next word, one word at a time, from patterns it learned.",
    hint: "Remember the Story Builder game?",
  },
  {
    concept: "lopsided",
    topic: "Lopsided examples",
    lessons: [4],
    talk: "Pip saw only red fish. What did Pip get wrong, and how did you fix it?",
    q: "Pip only saw red fish and blue birds. Now Pip calls a red bird a fish. Why?",
    options: ["Pip's examples were lopsided", "Birds are fish", "Pip was hungry"],
    icons: ["⚖️", "🐟", "🍕"],
    answer: 0,
    yes: "Pip learned the wrong clue (color) because the examples were lopsided.",
    hint: "What clue did Pip use by mistake?",
  },
  {
    concept: "check",
    topic: "Checking AI answers",
    lessons: [5, 11],
    talk: "If an AI tells you a fact, where could we check it together?",
    q: "An AI sounds very sure about a fact. What should you do?",
    options: ["Check it in a book or with a grown-up", "Believe it, it sounded sure", "Tell everyone right away"],
    icons: ["🔍", "👍", "📣"],
    answer: 0,
    yes: "AI can be wrong, even when it sounds sure. Check facts that matter.",
    hint: "Can AI be wrong?",
  },
  {
    concept: "made-by-ai",
    topic: "Real or made by AI",
    lessons: [6],
    talk: "How can you tell if a picture might be made by AI? What clues would you look for?",
    q: "You see a picture of a cat riding a rocket to the moon. What's smart to think?",
    options: ["It might be made by AI. Ask a grown-up.", "It must be real, it's a photo", "Cats can fly rockets"],
    icons: ["🤔", "📸", "🚀"],
    answer: 0,
    yes: "AI can make pictures that look real. When something seems odd, ask and check.",
    hint: "Remember Spot the Glitches?",
  },
  {
    concept: "pixels",
    topic: "How AI sees pictures",
    lessons: [9],
    talk: "What are pixels? Can you find some on a screen if we look really close?",
    q: "To a computer, a picture is made of...",
    options: ["Tiny squares of color called pixels", "Tiny bugs", "Stickers"],
    icons: ["🟥", "🐛", "⭐"],
    answer: 0,
    yes: "A picture is lots of tiny colored squares called pixels. AI looks for patterns in them.",
    hint: "What did you paint in Pixel Peek?",
  },
  {
    concept: "clear-prompts",
    topic: "Clear instructions",
    lessons: [10],
    talk: "Can you give me clear instructions to draw a monster? Tell me the color, size, and how many eyes.",
    q: "Which prompt is the clearest?",
    options: ["Draw a big blue fish with 2 eyes in the sea", "Draw something", "Fish"],
    icons: ["🐟", "❓", "🔤"],
    answer: 0,
    yes: "Clear prompts say exactly what you want: color, size, how many, and where.",
    hint: "Which one tells the most details?",
  },
  {
    concept: "helper",
    topic: "AI as a helper",
    lessons: [12],
    talk: "What's something you want to learn? How could a helper quiz you without doing it for you?",
    q: "Which one uses AI as a helper, not a doer?",
    options: ["Ask it to quiz you on math facts", "Ask it to do all your homework", "Ask it to write your whole story"],
    icons: ["🧠", "📚", "📝"],
    answer: 0,
    yes: "A helper quizzes you and gives ideas. You still do the thinking and the making.",
    hint: "Which one still lets your brain do the work?",
  },
  {
    concept: "fairness",
    topic: "Fairness",
    lessons: [13],
    talk: "Why did Pip leave out the square Glorbs? How did you make the team fair?",
    q: "An AI learned only from round Glorbs. How can you make it fair for everyone?",
    options: ["Add examples of every kind", "Only use round Glorbs", "Hide the square Glorbs"],
    icons: ["🧩", "⚪", "🙈"],
    answer: 0,
    yes: "Examples of every kind help an AI work fairly for everyone.",
    hint: "What did you add to Pip's example box?",
  },
  {
    concept: "private",
    topic: "Keeping secrets safe",
    lessons: [7, 14],
    talk: "What things should you never type to an AI? Who do you ask before sharing online?",
    q: "You want an AI to write a poem for your friend. What do you type?",
    options: ["A poem for my friend who loves cats", "A poem for Maya Lopez at Lincoln School", "My address and phone number"],
    icons: ["🛡️", "🏫", "🏠"],
    answer: 0,
    yes: "Leave out names, schools, and addresses. The AI can still help!",
    hint: "Which one has no private details?",
  },
];

export const QUIZ_TOTAL = FINAL_QUIZ.length;

/**
 * Answer positions are shuffled per question so the right answer isn't always first.
 * Fixed order (not random) so the quiz is the same on every visit and in tests.
 */
const ORDER: number[][] = [
  [1, 0, 2],
  [0, 2, 1],
  [2, 1, 0],
  [1, 2, 0],
  [0, 1, 2],
  [2, 0, 1],
  [1, 0, 2],
  [2, 1, 0],
  [0, 2, 1],
  [1, 2, 0],
];

/** The quiz with answers placed in their shown order. */
export const FINAL_QUIZ_SHOWN: FinalQuestion[] = FINAL_QUIZ.map((item, i) => {
  const order = ORDER[i % ORDER.length];
  return {
    ...item,
    options: order.map((k) => item.options[k]),
    icons: order.map((k) => item.icons[k]),
    answer: order.indexOf(item.answer),
  };
});

const lessonText = (ls: number[]) => (ls.length === 1 ? `Lesson ${ls[0]}` : `Lessons ${ls.join(" and ")}`);

export function conceptsFor(missed: string[]) {
  return FINAL_QUIZ.filter((q) => missed.includes(q.concept));
}

/**
 * The plain-text note for a grown-up. Never includes a name or anything typed by the kid.
 * Stays well under 1,500 characters even if every question was missed.
 */
export function grownupNote(opts: { finished: string; quiz: { score: number; missed: string[] } | null }) {
  const lines: string[] = [opts.finished, ""];
  if (opts.quiz) {
    const missed = conceptsFor(opts.quiz.missed);
    lines.push(`Final quiz: ${opts.quiz.score}/${QUIZ_TOTAL}.`);
    if (missed.length) {
      lines.push(`Ideas to talk about: ${missed.map((m) => `${m.topic} (${lessonText(m.lessons)})`).join(", ")}.`, "");
      lines.push("Questions to ask me:");
      for (const m of missed) lines.push(`- ${m.talk}`);
    } else {
      lines.push("I got every question right!", "", "Ask me:", "- How do you build an AI?", "- How can an AI be fair for everyone?");
    }
  } else {
    lines.push(
      "Ask me:",
      "- How does AI learn?",
      "- How does a chatbot write?",
      "- What should I do if AI says something weird?",
    );
  }
  lines.push("", SITE_URL);
  return lines.join("\n");
}
