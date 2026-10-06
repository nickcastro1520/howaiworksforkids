export const GLOSSARY = [
  { word: "AI", say: "ay-eye", means: "Short for artificial intelligence. A computer program that learns patterns from examples and then makes guesses.", lesson: "what-is-ai", color: "#6b4cf0" },
  { word: "Example", means: "One thing you show an AI so it can learn, like one picture of a cat.", lesson: "learning-from-examples", color: "#0c836e" },
  { word: "Pattern", means: "Something that shows up again and again. Cats have pointy ears. That's a pattern.", lesson: "what-is-ai", color: "#2774d1" },
  { word: "Data", say: "day-tuh", means: "A big pile of examples. AI learns from data.", lesson: "learning-from-examples", color: "#cb4834" },
  { word: "Training", means: "When an AI looks at lots of examples to learn. Like practice!", lesson: "learning-from-examples", color: "#a66500" },
  { word: "Guess", means: "AI doesn't know for sure. It makes its best guess. Grown-ups call this a prediction.", lesson: "learning-from-examples", color: "#c83d89" },
  { word: "Model", means: "The part of an AI that learned the patterns. Pip's brain is a tiny model.", lesson: "learning-from-examples", color: "#208644" },
  { word: "Chatbot", means: "An AI that writes words back to you. It guesses the next word, one at a time.", lesson: "guess-the-next-word", color: "#2774d1" },
  { word: "Lopsided data", means: "When the examples are not mixed up enough, so the AI learns the wrong clue. Grown-ups call this bias.", lesson: "sneaky-clues", color: "#cb4834" },
  { word: "Made-up answer", means: "When AI says something wrong but sounds sure. Grown-ups call this a hallucination.", lesson: "ai-can-be-wrong", color: "#a66500" },
  { word: "AI-made picture", means: "A picture an AI made. It can look real, but it never happened. A fake video is called a deepfake.", lesson: "real-or-made-up", color: "#c83d89" },
  { word: "Private info", means: "Things that tell who you are or where you are: your full name, address, school, and passwords. Keep them secret.", lesson: "smart-and-safe", color: "#208644" },
];

/** Anchor id for a word card on /glossary, e.g. "Lopsided data" -> "lopsided-data". */
export function termId(word: string) {
  return word.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
