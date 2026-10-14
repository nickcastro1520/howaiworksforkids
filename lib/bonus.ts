/** Bonus mini-games: fixed data, pure helpers. Scores live only in this browser (see lib/bonusScores.ts). */

export const BONUS = {
  sort: {
    slug: "sort-training-data",
    path: "/play/sort-training-data",
    section: 1 as const,
    title: "Sort the Training Data",
    blurb: "Race the clock to sort examples into the right bins, so Pip learns the right thing.",
    emoji: "🗂️",
  },
  nextWord: {
    slug: "guess-the-next-word",
    path: "/play/guess-the-next-word",
    section: 2 as const,
    title: "Guess the Next Word",
    blurb: "Pick the word that most likely comes next, just like a chatbot does.",
    emoji: "💬",
  },
};

export const BONUS_FOR_SECTION = { 1: BONUS.sort, 2: BONUS.nextWord } as const;

export type Bin = { id: string; label: string; emoji: string };
export type SortItem = { name: string; emoji: string; bin: string };
export type SortSet = { bins: [Bin, Bin]; items: SortItem[] };

export const SORT_SETS: SortSet[] = [
  {
    bins: [
      { id: "animal", label: "Animal", emoji: "🐾" },
      { id: "vehicle", label: "Vehicle", emoji: "🚗" },
    ],
    items: [
      { name: "dog", emoji: "🐶", bin: "animal" },
      { name: "cat", emoji: "🐱", bin: "animal" },
      { name: "frog", emoji: "🐸", bin: "animal" },
      { name: "turtle", emoji: "🐢", bin: "animal" },
      { name: "elephant", emoji: "🐘", bin: "animal" },
      { name: "bike", emoji: "🚲", bin: "vehicle" },
      { name: "bus", emoji: "🚌", bin: "vehicle" },
      { name: "plane", emoji: "✈️", bin: "vehicle" },
      { name: "train", emoji: "🚂", bin: "vehicle" },
      { name: "rocket", emoji: "🚀", bin: "vehicle" },
    ],
  },
  {
    bins: [
      { id: "food", label: "Food", emoji: "🍽️" },
      { id: "toy", label: "Toy", emoji: "🧸" },
    ],
    items: [
      { name: "banana", emoji: "🍌", bin: "food" },
      { name: "pizza", emoji: "🍕", bin: "food" },
      { name: "carrot", emoji: "🥕", bin: "food" },
      { name: "cupcake", emoji: "🧁", bin: "food" },
      { name: "apple", emoji: "🍎", bin: "food" },
      { name: "kite", emoji: "🪁", bin: "toy" },
      { name: "puzzle", emoji: "🧩", bin: "toy" },
      { name: "balloon", emoji: "🎈", bin: "toy" },
      { name: "teddy bear", emoji: "🧸", bin: "toy" },
      { name: "ball", emoji: "⚽", bin: "toy" },
    ],
  },
  {
    bins: [
      { id: "hot", label: "Hot", emoji: "🔥" },
      { id: "cold", label: "Cold", emoji: "❄️" },
    ],
    items: [
      { name: "sun", emoji: "☀️", bin: "hot" },
      { name: "campfire", emoji: "🔥", bin: "hot" },
      { name: "hot soup", emoji: "🍲", bin: "hot" },
      { name: "hot cocoa", emoji: "☕", bin: "hot" },
      { name: "volcano", emoji: "🌋", bin: "hot" },
      { name: "ice cube", emoji: "🧊", bin: "cold" },
      { name: "snowman", emoji: "⛄", bin: "cold" },
      { name: "ice cream", emoji: "🍦", bin: "cold" },
      { name: "snowflake", emoji: "❄️", bin: "cold" },
      { name: "iceberg", emoji: "🏔️", bin: "cold" },
    ],
  },
];

export const SORT_SECONDS = 60;
/** Items per bin set before the bins change. */
export const SORT_PER_SET = 5;

/** Small seeded shuffle so a round can be replayed in tests. */
export function shuffle<T>(arr: readonly T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0 || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** The queue for one round: SORT_PER_SET items from each set in turn, repeating with a fresh shuffle. */
export function sortQueue(seed: number, rounds = 6): { set: number; item: SortItem }[] {
  const out: { set: number; item: SortItem }[] = [];
  for (let r = 0; r < rounds; r++) {
    const set = r % SORT_SETS.length;
    const picks = shuffle(SORT_SETS[set].items, seed + r * 101).slice(0, SORT_PER_SET);
    for (const item of picks) out.push({ set, item });
  }
  return out;
}

export type NextWordQ = {
  sentence: string;
  options: [string, string, string];
  answer: number;
  /** Why each option is or isn't the most likely next word, in kid words. */
  why: [string, string, string];
};

export const NEXT_WORD: NextWordQ[] = [
  {
    sentence: "Twinkle, twinkle, little …",
    options: ["star", "shoe", "banana"],
    answer: 0,
    why: ["Yes! You've heard this song tons of times, so \u201cstar\u201d comes next.", "Shoes don't twinkle in the song. The song says \u201cstar.\u201d", "A twinkly banana would be silly! The song says \u201cstar.\u201d"],
  },
  {
    sentence: "I brush my …",
    options: ["teeth", "cloud", "pizza"],
    answer: 0,
    why: ["Yes! People say \u201cbrush my teeth\u201d all the time.", "You can't brush a cloud. \u201cTeeth\u201d shows up after \u201cbrush my\u201d way more.", "Nobody brushes pizza! \u201cTeeth\u201d is much more likely."],
  },
  {
    sentence: "The cow says …",
    options: ["moo", "meow", "beep"],
    answer: 0,
    why: ["Yes! In books and songs, the cow almost always says \u201cmoo.\u201d", "\u201cMeow\u201d is what a cat says. For a cow, \u201cmoo\u201d is the usual word.", "\u201cBeep\u201d is a robot or car sound. Cows say \u201cmoo.\u201d"],
  },
  {
    sentence: "Peanut butter and …",
    options: ["jelly", "socks", "rain"],
    answer: 0,
    why: ["Yes! \u201cPeanut butter and jelly\u201d is a super common phrase.", "Peanut butter and socks? Yuck! \u201cJelly\u201d comes up much more.", "\u201cRain\u201d almost never follows \u201cpeanut butter and.\u201d \u201cJelly\u201d does."],
  },
  {
    sentence: "Once upon a …",
    options: ["time", "sandwich", "car"],
    answer: 0,
    why: ["Yes! So many stories start with \u201cOnce upon a time.\u201d", "A story that starts \u201cOnce upon a sandwich\u201d would be funny, but rare.", "\u201cTime\u201d follows \u201cOnce upon a\u201d in almost every fairy tale."],
  },
  {
    sentence: "At night, I go to …",
    options: ["bed", "lunch", "the moon"],
    answer: 0,
    why: ["Yes! \u201cGo to bed\u201d is what people say about nighttime.", "Lunch is in the middle of the day. At night, it's \u201cbed.\u201d", "Going to the moon is possible, but \u201cbed\u201d is way more likely!"],
  },
  {
    sentence: "Happy birthday to …",
    options: ["you", "spoon", "Tuesday"],
    answer: 0,
    why: ["Yes! That's how the birthday song goes.", "\u201cSpoon\u201d rhymes a little, but the song says \u201cyou.\u201d", "Tuesday doesn't have a birthday! The song says \u201cyou.\u201d"],
  },
  {
    sentence: "Ready, set, …",
    options: ["go", "nap", "purple"],
    answer: 0,
    why: ["Yes! At the start of a race, people say \u201cReady, set, go!\u201d", "A nap after \u201cReady, set\u201d would be a slow race! It's \u201cgo.\u201d", "\u201cPurple\u201d is a color, not a race word. \u201cGo\u201d comes next."],
  },
  {
    sentence: "The sky is …",
    options: ["blue", "crunchy", "sleepy"],
    answer: 0,
    why: ["Yes! \u201cThe sky is blue\u201d is very common. It's sometimes gray, too!", "The sky isn't crunchy. People write \u201cblue\u201d after this much more.", "\u201cSleepy\u201d is for people and pets. The sky is usually \u201cblue.\u201d"],
  },
  {
    sentence: "Thank you very …",
    options: ["much", "fish", "tall"],
    answer: 0,
    why: ["Yes! \u201cThank you very much\u201d is a polite thing people say a lot.", "\u201cFish\u201d sounds a bit like \u201cmuch,\u201d but \u201cmuch\u201d is what people say.", "\u201cThank you very tall\u201d doesn't make sense. It's \u201cmuch.\u201d"],
  },
  {
    sentence: "Rain, rain, go …",
    options: ["away", "swimming", "home"],
    answer: 0,
    why: ["Yes! The rhyme goes \u201cRain, rain, go away.\u201d", "Funny idea! But the rhyme says \u201caway.\u201d", "Close! \u201cHome\u201d makes sense, but the rhyme kids know says \u201caway.\u201d"],
  },
  {
    sentence: "I like to eat ice …",
    options: ["cream", "skates", "cubes"],
    answer: 0,
    why: ["Yes! \u201cEat ice cream\u201d is a very common thing to say.", "You can't eat ice skates! The word \u201ceat\u201d is a big clue.", "Some people chew ice cubes, but \u201cice cream\u201d comes after \u201ceat ice\u201d way more."],
  },
  {
    sentence: "Wash your …",
    options: ["hands", "homework", "shadow"],
    answer: 0,
    why: ["Yes! Grown-ups say \u201cWash your hands\u201d a lot.", "Homework would get soggy! \u201cHands\u201d is much more likely.", "You can't wash a shadow. \u201cHands\u201d comes next most often."],
  },
  {
    sentence: "The dog wagged its …",
    options: ["tail", "book", "hat"],
    answer: 0,
    why: ["Yes! Dogs wag their tails, and people write that a lot.", "Dogs don't wag books. \u201cTail\u201d fits best.", "A dog in a hat is cute, but dogs wag their \u201ctail.\u201d"],
  },
  {
    sentence: "Row, row, row your …",
    options: ["boat", "bike", "bed"],
    answer: 0,
    why: ["Yes! \u201cRow your boat\u201d is how the song goes.", "You pedal a bike, you don't row it. The song says \u201cboat.\u201d", "Rowing a bed down a stream would be wild! It's \u201cboat.\u201d"],
  },
  {
    sentence: "Look both ways before you cross the …",
    options: ["street", "cake", "sky"],
    answer: 0,
    why: ["Yes! That's an important safety rule people say a lot.", "You don't cross a cake! \u201cStreet\u201d is the safety word here.", "You can't walk across the sky. \u201cStreet\u201d comes next."],
  },
];

export const NEXT_WORD_ROUND = 8;

/** Pick a round of questions and shuffle each one's options, keeping its explanations lined up. */
export function nextWordRound(seed: number, n = NEXT_WORD_ROUND): NextWordQ[] {
  return shuffle(NEXT_WORD, seed)
    .slice(0, n)
    .map((q, k) => {
      const order = shuffle([0, 1, 2], seed + k * 7 + 3);
      return {
        sentence: q.sentence,
        options: order.map((i) => q.options[i]) as NextWordQ["options"],
        why: order.map((i) => q.why[i]) as NextWordQ["why"],
        answer: order.indexOf(q.answer),
      };
    });
}

export function isNewBest(score: number, best: number | null): boolean {
  return score > 0 && (best === null || score > best);
}
export function freshSeed(): number {
  return Math.floor(Math.random() * 1e6) + 1;
}
