export type Mood = "happy" | "think" | "wow" | "oops" | "proud";

export type StoryPage = { text: string; mood: Mood };

export type Question = {
  q: string;
  options: string[];
  /** One emoji per option, so kids who can't read yet can still choose. */
  icons: string[];
  answer: number;
  yes: string;
  hint: string;
};

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  short: string;
  bigIdea: string;
  game: string;
  gameBlurb: string;
  badge: string;
  minutes: number;
  color: string;
  tint: string;
  story: StoryPage[];
  quiz: Question[];
  talk: string;
  summary: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-ai",
    number: 1,
    title: "Meet Pip: What is AI?",
    short: "What is AI?",
    bigIdea:
      "AI is a computer program that learns patterns from lots of examples. Then it makes guesses.",
    game: "AI Detective",
    gameBlurb: "Search a house and find the things that use AI.",
    badge: "AI Spotter",
    minutes: 5,
    color: "#6b4cf0",
    tint: "#efeaff",
    summary:
      "Kids meet Pip, a tiny AI, and learn that AI is a computer program that learns from examples. Then they hunt for AI around a house.",
    story: [
      { text: "Hi! I'm Pip. I'm a tiny AI. That means I'm a computer program that can learn.", mood: "happy" },
      { text: "Here's how I learn. People show me lots and lots of examples. Like a thousand pictures of cats!", mood: "think" },
      { text: "I look for what's the same: pointy ears, whiskers, a long tail. That's called a pattern.", mood: "think" },
      { text: "Then you show me a new picture, and I make a guess. \u201cCat!\u201d I'm right a lot. But not always.", mood: "wow" },
      { text: "I'm not magic. I'm not alive. I'm a really good pattern finder. And AI is all around you. Let's go find it!", mood: "proud" },
    ],
    quiz: [
      {
        q: "How does AI learn?",
        options: ["From lots of examples", "It reads your mind", "It's magic"],
        icons: ["📚", "🔮", "🪄"],
        answer: 0,
        yes: "Yes! AI learns by looking at lots of examples.",
        hint: "Think about Pip and the cat pictures.",
      },
      {
        q: "Does AI have feelings like you do?",
        options: ["Yes, it gets sad", "No, it's a computer program", "Only on Tuesdays"],
        icons: ["😢", "💻", "📅"],
        answer: 1,
        yes: "Right! AI can sound friendly, but it doesn't have feelings.",
        hint: "Pip said, \u201cI'm not alive.\u201d",
      },
    ],
    talk: "What is one thing at home you think might use AI? How could we find out?",
  },
  {
    slug: "learning-from-examples",
    number: 2,
    title: "Teach by Showing",
    short: "Learning from examples",
    bigIdea: "AI learns from examples, not a list of rules. More good examples help it guess better.",
    game: "Sort the Glorbs",
    gameBlurb: "Make up a secret rule. Teach Pip. See if Pip can figure it out.",
    badge: "Pip's Teacher",
    minutes: 6,
    color: "#0c836e",
    tint: "#e2f7f1",
    summary:
      "Kids sort made-up creatures into two teams using their own secret rule. A real nearest-neighbor model in the browser learns from their examples and guesses new ones.",
    story: [
      { text: "Meet the Glorbs! They're silly made-up critters. I have never seen one before.", mood: "wow" },
      { text: "Nobody gives me a list of rules. Instead, a teacher sorts some Glorbs into two teams and shows me.", mood: "think" },
      { text: "I look at the examples. I find what is the same about each team.", mood: "think" },
      { text: "Then I guess the team for a new Glorb. If I'm wrong, you show me the right answer, and I learn!", mood: "happy" },
      { text: "More good examples means better guesses. Ready? You're the teacher now!", mood: "proud" },
    ],
    quiz: [
      {
        q: "What does Pip need to learn something new?",
        options: ["A nap", "Candy", "Examples"],
        icons: ["😴", "🍬", "🖼️"],
        answer: 2,
        yes: "Yes! Examples are how AI learns.",
        hint: "What did you give Pip in the Glorb game?",
      },
      {
        q: "Pip guessed wrong. What helps Pip get better?",
        options: ["Show Pip the right answer", "Yell at Pip", "Turn off the screen"],
        icons: ["✅", "📢", "📴"],
        answer: 0,
        yes: "Exactly. Every fixed mistake is a new example.",
        hint: "When Pip was wrong in the game, what did you do?",
      },
    ],
    talk: "If you had to teach a friend what a dog is without saying any rules, which pictures would you show?",
  },
  {
    slug: "guess-the-next-word",
    number: 3,
    title: "How Chatbots Talk",
    short: "Guessing the next word",
    bigIdea: "Chatbots write by guessing the next word, again and again, using patterns from lots of reading.",
    game: "Next Word!",
    gameBlurb: "Guess the next word, then build a silly story with Pip.",
    badge: "Word Wizard",
    minutes: 6,
    color: "#2774d1",
    tint: "#e4f0ff",
    summary:
      "Kids guess the next word in familiar phrases and compare with Pip's guess bars, then build a story with a tiny word-counting model.",
    story: [
      { text: "Some AIs can talk with words. They're called chatbots.", mood: "happy" },
      { text: "Here's a secret. A chatbot writes by guessing the next word. One word at a time!", mood: "think" },
      { text: "How does it guess? It read a giant pile of words. Way more than a library! It learned which words usually come next.", mood: "wow" },
      { text: "If I say \u201cOnce upon a\u2026\u201d you know \u201ctime\u201d comes next. You learned that pattern too!", mood: "happy" },
      { text: "Chatbots don't think like you. They're super good guessers. Let's play the guessing game!", mood: "proud" },
    ],
    quiz: [
      {
        q: "How does a chatbot write a sentence?",
        options: ["A tiny person types inside", "It guesses one word at a time", "It copies your homework"],
        icons: ["🧍", "🧩", "📝"],
        answer: 1,
        yes: "Yes! One word, then the next, then the next.",
        hint: "Remember the Story Builder?",
      },
      {
        q: "Where did the chatbot learn its word patterns?",
        options: ["From its dreams", "From the weather", "From reading lots and lots of words"],
        icons: ["💭", "🌦️", "📚"],
        answer: 2,
        yes: "Right! Lots of reading means lots of patterns.",
        hint: "Pip said it read a giant pile of words.",
      },
    ],
    talk: "Say \u201cPeanut butter and\u2026\u201d and stop. What word popped into your head? Why that one?",
  },
  {
    slug: "sneaky-clues",
    number: 4,
    title: "Good Examples In, Good Guesses Out",
    short: "Lopsided examples",
    bigIdea: "If the examples are lopsided, AI learns the wrong clue. Better examples make better AI.",
    game: "Fix Pip's Mix-up",
    gameBlurb: "Pip thinks every red thing is a bird. Find out why, then fix it.",
    badge: "Clue Fixer",
    minutes: 6,
    color: "#cb4834",
    tint: "#ffe9e4",
    summary:
      "Pip learns fish vs. birds from lopsided examples and picks up a shortcut (color). Kids find the sneaky clue and fix it by adding better examples.",
    story: [
      { text: "Today I'm learning fish and birds. My teacher showed me some pictures.", mood: "happy" },
      { text: "But look! Every fish was blue. Every bird was red.", mood: "think" },
      { text: "So I learned a sneaky shortcut: \u201cBlue means fish. Red means bird.\u201d Uh-oh.", mood: "oops" },
      { text: "AI can only learn from the examples it gets. If the examples are lopsided, the guesses get lopsided too.", mood: "think" },
      { text: "Can you help me? Let's find my mistake and fix it with better examples!", mood: "happy" },
    ],
    quiz: [
      {
        q: "Pip only saw blue fish. Then Pip called a red fish a bird. Why?",
        options: ["Red fish are birds", "Pip learned the wrong clue: color", "Pip was hungry"],
        icons: ["🐦", "🎨", "🍔"],
        answer: 1,
        yes: "Yes! Pip used color instead of shape.",
        hint: "What was the same about all the fish Pip saw?",
      },
      {
        q: "What fixes an AI that learned the wrong clue?",
        options: ["Give it more kinds of examples", "Paint all the fish blue", "Nothing can help"],
        icons: ["🌈", "🖌️", "🚫"],
        answer: 0,
        yes: "Exactly. Different kinds of examples teach the right clue.",
        hint: "What did you add to fix Pip?",
      },
    ],
    talk: "If an AI only ever saw pictures of grown-ups, what might go wrong when it sees a kid?",
  },
  {
    slug: "ai-can-be-wrong",
    number: 5,
    title: "Sure Doesn't Mean Right",
    short: "When AI is wrong",
    bigIdea: "AI can sound sure and still be wrong. Smart people check with a grown-up or a trusted source.",
    game: "Fact or Fib?",
    gameBlurb: "Pip sounds sure every time. Can you catch the fibs?",
    badge: "Fib Finder",
    minutes: 5,
    color: "#a66500",
    tint: "#fff3d6",
    summary:
      "Pip states facts and fibs with the same confidence. Kids decide, then check the Fact Book, and learn that sounding sure is not the same as being right.",
    story: [
      { text: "Guess what? I make mistakes. All AI does.", mood: "oops" },
      { text: "Sometimes I say something wrong, and I sound totally sure about it!", mood: "proud" },
      { text: "That's because I guess words that sound right. But sounding right is not the same as being right.", mood: "think" },
      { text: "Smart people check. Ask a grown-up, look in a good book, or use a website you trust.", mood: "happy" },
      { text: "Let's play Fact or Fib! I'll say some things. You decide if I'm right.", mood: "wow" },
    ],
    quiz: [
      {
        q: "Pip sounds super sure. Does that mean Pip is right?",
        options: ["Yes, always", "Only if it's loud", "No, it could still be wrong"],
        icons: ["👍", "📢", "🤔"],
        answer: 2,
        yes: "Yes! Sure doesn't mean right.",
        hint: "Did Pip sound sure about the fibs, too?",
      },
      {
        q: "What's a good way to check what AI says?",
        options: ["Ask Pip again, louder", "Ask a grown-up or look in a trusted book", "Just believe it"],
        icons: ["📣", "📖", "🙈"],
        answer: 1,
        yes: "Great checking!",
        hint: "Where did the true answers come from in the game?",
      },
    ],
    talk: "Pick a fun fact you know. How could we check it's really true?",
  },
  {
    slug: "real-or-made-up",
    number: 6,
    title: "Real or Made by AI?",
    short: "AI-made pictures",
    bigIdea: "AI can make pictures and voices of things that never happened. Look closely and ask a grown-up.",
    game: "Spot the Glitches",
    gameBlurb: "This picture was made by AI. Find the 6 goofs!",
    badge: "Glitch Spotter",
    minutes: 5,
    color: "#c83d89",
    tint: "#ffe6f3",
    summary:
      "Kids learn that AI can make realistic pictures, voices, and videos of things that never happened, then hunt for the telltale goofs in an AI-style picture.",
    story: [
      { text: "Some AIs can make pictures. You type \u201ca cat in a hat\u201d\u2026 and poof! A picture.", mood: "wow" },
      { text: "The picture looks real. But it never happened. No real cat ever wore that hat.", mood: "think" },
      { text: "AI can even copy voices and make videos. So not everything you see on a screen is real.", mood: "think" },
      { text: "AI pictures sometimes have goofs. Extra fingers. Melty clocks. Letters that make no sense.", mood: "oops" },
      { text: "If something looks weird or too wild, ask a grown-up. Now let's hunt for goofs!", mood: "proud" },
    ],
    quiz: [
      {
        q: "You see a video of a dog driving a bus. What should you do?",
        options: ["Believe it right away", "Ask a grown-up if it's real", "Share it with everyone"],
        icons: ["😲", "🙋", "📤"],
        answer: 1,
        yes: "Smart! When it looks too wild, check with a grown-up.",
        hint: "Could AI have made that video?",
      },
      {
        q: "Which one is a clue that a picture might be made by AI?",
        options: ["A hand with six fingers", "A blue sky", "A smiling face"],
        icons: ["🖐️", "🌤️", "😊"],
        answer: 0,
        yes: "Yes! Count the fingers!",
        hint: "Think about the goofs you found.",
      },
    ],
    talk: "Have you ever seen a picture or video that looked too wild to be real? What made you wonder?",
  },
  {
    slug: "smart-and-safe",
    number: 7,
    title: "Be the Boss of AI",
    short: "Smart and safe",
    bigIdea: "You're the boss. Keep private things private, remember AI isn't a person, and ask a grown-up when unsure.",
    game: "Go, Ask, or Stop",
    gameBlurb: "Use the traffic light to make smart choices. Then guard your secrets.",
    badge: "AI Boss",
    minutes: 6,
    color: "#208644",
    tint: "#e3f6e8",
    summary:
      "Kids sort real-life AI situations with a traffic light (go, ask a grown-up, stop) and practice keeping private information private.",
    story: [
      { text: "You are the boss of AI. AI is a tool, like a pencil or a calculator.", mood: "happy" },
      { text: "I'm not a person. I can't be your best friend, and I should never ask you to keep secrets.", mood: "think" },
      { text: "Some things are private: your full name, where you live, your school, and your passwords.", mood: "proud" },
      { text: "If an app or AI asks for private things, or says something that feels weird, stop and tell a grown-up.", mood: "think" },
      { text: "Your grown-ups are your best helpers. Let's practice being the boss!", mood: "happy" },
    ],
    quiz: [
      {
        q: "An app asks for your home address. What do you do?",
        options: ["Type it in", "Don't type it. Tell a grown-up", "Type it twice"],
        icons: ["⌨️", "🛑", "✌️"],
        answer: 1,
        yes: "Yes! Your address is private.",
        hint: "Is your address private?",
      },
      {
        q: "Is an AI chatbot a person?",
        options: ["No, it's a computer program", "Yes, a tiny one", "Only at night"],
        icons: ["💻", "🧍", "🌙"],
        answer: 0,
        yes: "Right! It can sound friendly, but it's a program.",
        hint: "What did Pip say about being a person?",
      },
    ],
    talk: "Who are the grown-ups you can always ask when something online feels weird?",
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function nextLesson(slug: string): Lesson | undefined {
  const i = LESSONS.findIndex((l) => l.slug === slug);
  return i >= 0 ? LESSONS[i + 1] : undefined;
}
