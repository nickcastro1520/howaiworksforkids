/**
 * Lesson 15 "My Sorting Machine": the kid builds a real (tiny) classifier.
 * It reuses the same nearest-neighbor model as "Sort the Glorbs" (lib/ml.ts).
 * Pip copies the label of the closest example (k = 1), so adding an example always
 * fixes that exact card. Everything runs in the browser; nothing is saved or sent.
 */
import { knnGuess, type Example } from "./ml";

export type Card = { id: string; emoji: string; name: string; kind: string; label: 0 | 1; f: Record<string, string> };

export type Job = {
  id: string;
  title: string;
  emoji: string;
  /** "Sorts animals: land or water" */
  sorts: string;
  labels: [{ name: string; emoji: string }, { name: string; emoji: string }];
  keys: string[];
  kinds: string[];
  /** Cards the kid labels, in order (they alternate labels). */
  teach: Card[];
  /** New cards for the test. */
  test: Card[];
  /** More new cards, only used for the "every kind" check. */
  extra: Card[];
};

const c = (id: string, emoji: string, name: string, kind: string, label: 0 | 1, f: Record<string, string>): Card => ({
  id,
  emoji,
  name,
  kind,
  label,
  f,
});

const animal = (legs: string, cover: string, fins: string, size: string) => ({ legs, cover, fins, size });
const snack = (group: string, how: string, color: string, dry: string) => ({ group, how, color, dry });
const face = (mouth: string, eyes: string, extra: string, look: string) => ({ mouth, eyes, extra, look });

export const JOBS: Job[] = [
  {
    id: "animals",
    title: "Animals",
    emoji: "🐾",
    sorts: "animals: land or water",
    labels: [
      { name: "Land", emoji: "🌳" },
      { name: "Water", emoji: "🌊" },
    ],
    keys: ["legs", "cover", "fins", "size"],
    kinds: ["Fur", "Feathers", "Scales", "Shells", "Smooth skin"],
    teach: [
      c("dog", "🐕", "dog", "Fur", 0, animal("4", "fur", "no", "medium")),
      c("fish", "🐟", "fish", "Scales", 1, animal("0", "scales", "yes", "small")),
      c("chicken", "🐔", "chicken", "Feathers", 0, animal("2", "feathers", "no", "small")),
      c("whale", "🐋", "whale", "Smooth skin", 1, animal("0", "smooth", "yes", "big")),
      c("horse", "🐎", "horse", "Fur", 0, animal("4", "fur", "no", "big")),
      c("crab", "🦀", "crab", "Shells", 1, animal("many", "shell", "no", "small")),
      c("cat", "🐈", "cat", "Fur", 0, animal("4", "fur", "no", "small")),
      c("octopus", "🐙", "octopus", "Smooth skin", 1, animal("many", "smooth", "no", "medium")),
    ],
    test: [
      c("rabbit", "🐇", "rabbit", "Fur", 0, animal("4", "fur", "no", "small")),
      c("snake", "🐍", "snake", "Scales", 0, animal("0", "scales", "no", "medium")),
      c("dolphin", "🐬", "dolphin", "Smooth skin", 1, animal("0", "smooth", "yes", "medium")),
      c("shark", "🦈", "shark", "Scales", 1, animal("0", "scales", "yes", "big")),
    ],
    extra: [
      c("snail", "🐌", "snail", "Shells", 0, animal("0", "shell", "no", "small")),
      c("lizard", "🦎", "lizard", "Scales", 0, animal("4", "scales", "no", "small")),
      c("owl", "🦉", "owl", "Feathers", 0, animal("2", "feathers", "no", "medium")),
      c("shrimp", "🦐", "shrimp", "Shells", 1, animal("many", "shell", "yes", "small")),
      c("frog", "🐸", "frog", "Smooth skin", 0, animal("4", "smooth", "no", "small")),
      c("elephant", "🐘", "elephant", "Smooth skin", 0, animal("4", "smooth", "no", "big")),
    ],
  },
  {
    id: "snacks",
    title: "Snacks",
    emoji: "🍎",
    sorts: "snacks: crunchy or soft",
    labels: [
      { name: "Crunchy", emoji: "🥨" },
      { name: "Soft", emoji: "🍮" },
    ],
    keys: ["group", "how", "color", "dry"],
    kinds: ["Fruit", "Veggies", "Grains", "Dairy"],
    teach: [
      c("carrot", "🥕", "carrot", "Veggies", 0, snack("veggie", "raw", "orange", "no")),
      c("banana", "🍌", "banana", "Fruit", 1, snack("fruit", "raw", "yellow", "no")),
      c("pretzel", "🥨", "pretzel", "Grains", 0, snack("grain", "baked", "brown", "yes")),
      c("yogurt", "🥛", "yogurt", "Dairy", 1, snack("dairy", "cold", "white", "no")),
      c("apple", "🍎", "apple", "Fruit", 0, snack("fruit", "raw", "red", "no")),
      c("bread", "🍞", "bread", "Grains", 1, snack("grain", "baked", "white", "no")),
      c("cucumber", "🥒", "cucumber", "Veggies", 0, snack("veggie", "raw", "green", "no")),
      c("cheese", "🧀", "cheese", "Dairy", 1, snack("dairy", "cold", "yellow", "no")),
    ],
    test: [
      c("popcorn", "🍿", "popcorn", "Grains", 0, snack("grain", "popped", "white", "yes")),
      c("peach", "🍑", "peach", "Fruit", 1, snack("fruit", "raw", "orange", "no")),
      c("pepper", "🫑", "pepper", "Veggies", 0, snack("veggie", "raw", "red", "no")),
      c("pancake", "🥞", "pancake", "Grains", 1, snack("grain", "cooked", "yellow", "no")),
    ],
    extra: [
      c("potato", "🥔", "mashed potato", "Veggies", 1, snack("veggie", "cooked", "white", "no")),
      c("cracker", "🍘", "rice cracker", "Grains", 0, snack("grain", "baked", "yellow", "yes")),
      c("milk", "🍦", "soft-serve", "Dairy", 1, snack("dairy", "frozen", "white", "no")),
    ],
  },
  {
    id: "faces",
    title: "Faces",
    emoji: "😀",
    sorts: "faces: happy or grumpy",
    labels: [
      { name: "Happy", emoji: "😊" },
      { name: "Grumpy", emoji: "😠" },
    ],
    keys: ["mouth", "eyes", "extra", "look"],
    kinds: ["Yellow faces", "Cat faces"],
    teach: [
      c("grin", "😀", "grinning face", "Yellow faces", 0, face("grin", "open", "none", "yellow")),
      c("angry", "😠", "angry face", "Yellow faces", 1, face("frown", "open", "none", "yellow")),
      c("blush", "😊", "smiling face", "Yellow faces", 0, face("smile", "closed", "blush", "yellow")),
      c("steam", "😤", "huffing face", "Yellow faces", 1, face("frown", "closed", "steam", "yellow")),
      c("hearts", "😍", "heart-eyes face", "Yellow faces", 0, face("smile", "hearts", "none", "yellow")),
      c("red", "😡", "red angry face", "Yellow faces", 1, face("frown", "open", "red", "yellow")),
      c("catgrin", "😺", "grinning cat", "Cat faces", 0, face("grin", "open", "none", "cat")),
      c("side", "😒", "unamused face", "Yellow faces", 1, face("flat", "side", "none", "yellow")),
    ],
    test: [
      c("slight", "🙂", "slightly smiling face", "Yellow faces", 0, face("smile", "open", "none", "yellow")),
      c("pout", "😾", "grumpy cat", "Cat faces", 1, face("frown", "closed", "none", "cat")),
      c("catsmile", "😸", "smiling cat", "Cat faces", 0, face("grin", "closed", "none", "cat")),
      c("cross", "😣", "scrunched face", "Yellow faces", 1, face("flat", "closed", "none", "yellow")),
    ],
    extra: [
      c("cathearts", "😻", "heart-eyes cat", "Cat faces", 0, face("smile", "hearts", "none", "cat")),
      c("laugh", "😄", "laughing face", "Yellow faces", 0, face("grin", "closed", "none", "yellow")),
      c("frown", "☹️", "frowning face", "Yellow faces", 1, face("frown", "open", "none", "yellow")),
    ],
  },
];

export const SAFETY_RULES = [
  { id: "check", emoji: "🧑‍🏫", text: "A grown-up checks how it sorts before anyone uses it." },
  { id: "unsure", emoji: "🤔", text: "If it isn't sure, it says \u201cI'm not sure.\u201d" },
  { id: "private", emoji: "🛡️", text: "It never asks for names, addresses, or secrets." },
];

export type Taught = { card: Card; label: 0 | 1 };

export function guess(job: Job, examples: Taught[], card: Card) {
  const data: Example<string>[] = examples.map((e) => ({ features: e.card.f, label: String(e.label) }));
  const g = knnGuess(data, job.keys, card.f, 1);
  if (!g) return null;
  const label = Number(g.label) as 0 | 1;
  const near = examples.find((e) => e.card.f === g.neighbors[0].features) ?? examples[0];
  return { label, near: near.card };
}

/** Every card Pip hasn't been taught, grouped by kind, with Pip's guess. */
export function kindCheck(job: Job, examples: Taught[]) {
  const taught = new Set(examples.map((e) => e.card.id));
  const all = [...job.teach, ...job.test, ...job.extra].filter((x) => !taught.has(x.id));
  return job.kinds.map((kind) => {
    const cards = all
      .filter((x) => x.kind === kind)
      .map((card) => {
        const g = guess(job, examples, card);
        return { card, guess: g?.label ?? 0, right: g?.label === card.label };
      });
    return { kind, cards, ok: cards.every((x) => x.right) };
  });
}
