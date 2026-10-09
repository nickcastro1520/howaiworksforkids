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

/** An optional "Try it with a grown-up" activity, shown after the badge. The grown-up types the prompt on their own AI account. */
export type Mission = {
  /** Kid-friendly intro, read aloud. */
  intro: string;
  /** Something the grown-up does first (e.g. take a photo). Optional. */
  before?: string;
  prompts: { label: string; text: string }[];
  /** "Check it together" list. */
  check: string[];
};

export type SectionId = 1 | 2;

export type Lesson = {
  slug: string;
  number: number;
  section: SectionId;
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
  mission?: Mission;
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-ai",
    number: 1,
    section: 1,
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
    section: 1,
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
    section: 1,
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
    section: 1,
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
    section: 1,
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
    section: 1,
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
    section: 1,
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
  /* ---------------- Section 2: Pip Grows Up ---------------- */
  {
    slug: "where-did-ai-come-from",
    number: 8,
    section: 2,
    title: "Where Did AI Come From?",
    short: "Where AI came from",
    bigIdea: "People dreamed about thinking machines for a long time. AI got really useful only lately, thanks to lots more data, much faster computers, and better ways to learn from examples.",
    game: "AI Time Machine",
    gameBlurb: "Put AI's story in order, find the 3 things that made AI work, and meet some real AI helpers.",
    badge: "Time Traveler",
    minutes: 7,
    color: "#b0306a",
    tint: "#fce8f0",
    summary:
      "A short, kid-level history of AI: from old stories about thinking machines, to scientists naming the idea about 70 years ago, to today's AI helpers. Kids learn the 3 reasons AI works so much better now (more data, faster computers, better ways to learn from examples) and meet four real AI helpers, with the reminder that every AI helper can be wrong.",
    story: [
      { text: "Where did I come from? Let's ride the time machine! Long, long ago, people told stories about machines that could think.", mood: "wow" },
      { text: "About 70 years ago, scientists gave the idea a name: artificial intelligence. Back then, some computers were as big as a room!", mood: "think" },
      { text: "Those old computers were slow, and they didn't have many examples to learn from. So AI couldn't do very much yet.", mood: "oops" },
      { text: "Then three things changed. People made lots more data. Computers got much, much faster. And scientists found better ways to learn from examples.", mood: "think" },
      { text: "Now there are AI helpers that can chat, make pictures, and more. But they can still be wrong! Let's take a trip through time.", mood: "proud" },
    ],
    quiz: [
      {
        q: "Why does AI work so much better now than long ago?",
        options: ["More data, faster computers, better ways to learn", "Computers got bigger keyboards", "Someone found a magic wand"],
        icons: ["🚀", "⌨️", "🪄"],
        answer: 0,
        yes: "Yes! Lots of data, fast computers, and better ways to learn from examples.",
        hint: "Remember the 3 things in Pip's recipe.",
      },
      {
        q: "An AI helper tells you something. What should you remember?",
        options: ["Every AI helper can be wrong, so check", "AI helpers are never wrong", "The newest one is always right"],
        icons: ["🔍", "💯", "🆕"],
        answer: 0,
        yes: "Right! Every AI helper can be wrong. Always check with a grown-up or a trusted source.",
        hint: "What did Pip say at the end of the story?",
      },
    ],
    talk: "What was a computer or phone like when you, the grown-up, were a kid? What can AI do now that it couldn't do then?",
    mission: {
      intro: "Ask a real AI about computer history, then check it together like a real fact checker.",
      prompts: [{ label: "The grown-up types", text: "Tell me a short, true story about how computers got faster over time. Use easy words for a 7-year-old." }],
      check: [
        "Did anything sound too amazing to be true?",
        "Pick one fact and check it in a book or a website you trust.",
        "Ask your grown-up: what was the first computer you used like?",
      ],
    },
  },
  {
    slug: "how-ai-sees-pictures",
    number: 9,
    section: 2,
    title: "How Pip Sees Pictures",
    short: "How AI sees pictures",
    bigIdea: "To a computer, a picture is a grid of tiny colored squares called pixels. AI finds patterns in them.",
    game: "Pixel Peek",
    gameBlurb: "Guess a hidden picture a few pixels at a time, then draw one for Pip to guess.",
    badge: "Pixel Peeker",
    minutes: 7,
    color: "#0b7591",
    tint: "#e0f3f7",
    summary:
      "Kids learn that a computer sees a picture as a grid of colored pixels. They race Pip to guess a hidden picture, then paint a tiny drawing for Pip's real nearest-neighbor model to guess.",
    story: [
      { text: "I'm growing up! Now I'm learning to look at pictures.", mood: "happy" },
      { text: "But I don't see pictures the way you do. To me, a picture is a grid of tiny colored squares.", mood: "think" },
      { text: "Each tiny square is called a pixel. One photo can have millions of them!", mood: "wow" },
      { text: "I look for patterns in the pixels. Lots of red in a round shape, with a green bit on top? Maybe an apple!", mood: "think" },
      { text: "When I see only a few pixels, I'm not sure. More pixels help me guess better. Let's play Pixel Peek!", mood: "proud" },
    ],
    quiz: [
      {
        q: "To a computer, what is a picture?",
        options: ["A grid of tiny colored squares", "A little window", "A magic painting"],
        icons: ["🟦", "🪟", "🪄"],
        answer: 0,
        yes: "Yes! A picture is a grid of tiny squares called pixels.",
        hint: "Remember the tiny squares called pixels.",
      },
      {
        q: "Pip can see only a few pixels. What helps Pip guess better?",
        options: ["Seeing more pixels", "Closing its eyes", "Guessing super fast"],
        icons: ["👀", "🙈", "⚡"],
        answer: 0,
        yes: "Right! More pixels means more clues.",
        hint: "In Pixel Peek, when did Pip get more sure?",
      },
    ],
    talk: "When you look at a picture, what clues tell you what it is? Would a computer use the same clues?",
    mission: {
      intro: "Real AI can look at photos too. Ask a grown-up to try this with you, and see if the AI can tell what's in a picture.",
      before: "A grown-up takes a photo of one toy or one piece of fruit. No faces, no house numbers, and no mail in the photo.",
      prompts: [{ label: "The grown-up adds the photo and types", text: "What is in this picture? How sure are you?" }],
      check: [
        "Was it right?",
        "Take the photo again from a strange angle, or super close up. Did the guess change?",
        "Did it say how sure it was? Was it right to be that sure?",
      ],
    },
  },
  {
    slug: "say-it-clearly",
    number: 10,
    section: 2,
    title: "Say It Clearly",
    short: "Clear prompts",
    bigIdea: "The words you give an AI are called a prompt. Clear, detailed prompts get better results.",
    game: "Monster Maker",
    gameBlurb: "Give Pip picture-word instructions until its monster matches the target.",
    badge: "Clear Commander",
    minutes: 6,
    color: "#8a45d0",
    tint: "#f1e8fc",
    summary:
      "Kids learn that the instructions you give an AI are called a prompt, and that clear details get better results. They build prompts from picture-word tiles until Pip draws the target monster.",
    story: [
      { text: "Big news! People can tell an AI what to do by typing. The words you type are called a prompt.", mood: "happy" },
      { text: "If you say \u201cDraw a monster,\u201d I have to guess everything. What color? How many eyes? How big?", mood: "think" },
      { text: "But if you say \u201cDraw a small green monster with 3 eyes,\u201d I know just what you want!", mood: "wow" },
      { text: "Clear words and details help me do a good job. Fuzzy words make me guess.", mood: "think" },
      { text: "You're the boss of the prompt. Let's make a monster together!", mood: "proud" },
    ],
    quiz: [
      {
        q: "Which prompt is clearer?",
        options: ["Draw a small green monster with 3 eyes", "Draw a thing", "Monster!!!"],
        icons: ["🟢", "❓", "❗"],
        answer: 0,
        yes: "Yes! Details tell the AI exactly what you want.",
        hint: "Which one tells Pip the most?",
      },
      {
        q: "What do we call the words you type to an AI?",
        options: ["A prompt", "A pancake", "A password"],
        icons: ["💬", "🥞", "🔑"],
        answer: 0,
        yes: "Right! It's called a prompt.",
        hint: "Pip said the word at the start of the story.",
      },
    ],
    talk: "If you asked a friend to draw your dream pet, what details would you tell them?",
    mission: {
      intro: "Let's see how details change what a real AI writes. A grown-up types two prompts, one short and one with lots of details.",
      prompts: [
        { label: "First, a short prompt", text: "Tell me a silly story about a dog." },
        { label: "Then, a prompt with details", text: "Tell me a silly 5-sentence story about a dog who wants to fly, for a 7-year-old, with a happy ending." },
      ],
      check: ["Which story do you like better?", "What changed when you added details?", "What detail would you add next time?"],
    },
  },
  {
    slug: "check-it-fix-it",
    number: 11,
    section: 2,
    title: "Check It, Fix It",
    short: "Check and fix",
    bigIdea: "AI can make mistakes. Find the mistake, check it in a trusted source, then tell the AI exactly what to fix.",
    game: "Pip's Homework",
    gameBlurb: "Find the mistake in Pip's answers, check the Fact Book, and ask Pip to fix it.",
    badge: "Fact Fixer",
    minutes: 6,
    color: "#b14c16",
    tint: "#fdeee3",
    summary:
      "Kids learn a 3-step habit for AI answers: find the mistake, check it in a trusted source, and ask clearly for a fix. They spot the planted mistake in Pip's homework and pick the best way to ask for a fix.",
    story: [
      { text: "I try hard, but sometimes I mix things up. Even when I sound very sure!", mood: "oops" },
      { text: "So when I tell you facts, be a checker. Is anything wrong?", mood: "think" },
      { text: "Look it up in a book or a website you trust, with a grown-up.", mood: "think" },
      { text: "Then tell me exactly what to fix. \u201cSpiders have 8 legs. Please fix that.\u201d works much better than \u201cWRONG!\u201d", mood: "wow" },
      { text: "Find it, check it, fix it. Let's check my homework!", mood: "proud" },
    ],
    quiz: [
      {
        q: "Pip tells you a fact that might be wrong. What do you do?",
        options: ["Check it in a book you trust", "Just believe it", "Shout at Pip"],
        icons: ["📖", "🤷", "😠"],
        answer: 0,
        yes: "Yes! Check it in a trusted book or website, with a grown-up.",
        hint: "Where can you find out if a fact is true?",
      },
      {
        q: "What's the best way to ask an AI to fix a mistake?",
        options: ["Say what's wrong and what's right", "Type WRONG!", "Say nothing"],
        icons: ["🛠️", "❌", "🤐"],
        answer: 0,
        yes: "Right! Tell it exactly what to fix.",
        hint: "Remember the spider legs.",
      },
    ],
    talk: "Where could we check a fact together? Which books or websites do we trust, and why?",
    mission: {
      intro: "Real AI can make mistakes too. Be a fact checker with a grown-up!",
      prompts: [{ label: "The grown-up types", text: "Tell me a silly story about an octopus going to school. Put in one true fact about octopuses." }],
      check: [
        "Find the octopus fact in the story.",
        "Look it up together in a book or a website you trust.",
        "If it's wrong, the grown-up types: \u201cThat fact is wrong. Please fix it.\u201d",
      ],
    },
  },
  {
    slug: "ai-learning-helper",
    number: 12,
    section: 2,
    title: "AI Can Help You Learn and Make Things",
    short: "AI as a helper",
    bigIdea: "AI can be a helper that gives ideas, quizzes you, and explains things. You do the thinking and the making.",
    game: "Helper or Doer?",
    gameBlurb: "Sort what AI should help with, then mix two ideas into your own drawing.",
    badge: "Smart Helper",
    minutes: 7,
    color: "#2f5fd0",
    tint: "#e7edfc",
    summary:
      "Kids learn the difference between using AI as a helper (ideas, quizzes, explanations) and letting it do the work. They sort helper and doer requests, then mix two ideas from Pip's Idea Machine into their own drawing.",
    story: [
      { text: "AI can be a great helper. It can quiz you, explain things, and give you ideas.", mood: "happy" },
      { text: "But if AI does all the work for you, your brain doesn't get to grow!", mood: "oops" },
      { text: "A helper says, \u201cWant me to quiz you?\u201d A doer says, \u201cI'll just do it all for you.\u201d", mood: "think" },
      { text: "The best way: AI gives ideas, and you do the thinking and the making.", mood: "wow" },
      { text: "Your ideas are the best part. Let's sort helpers and doers, then make something!", mood: "proud" },
    ],
    quiz: [
      {
        q: "Which one uses AI as a helper?",
        options: ["Quiz me on my spelling words", "Write my whole report", "Do my art project for me"],
        icons: ["🧠", "📄", "🖼️"],
        answer: 0,
        yes: "Yes! A quiz helps you learn. You still do the spelling.",
        hint: "Which one still lets YOUR brain do the work?",
      },
      {
        q: "AI gives you 3 ideas for a drawing. Who does the drawing?",
        options: ["I do!", "The AI does", "Nobody"],
        icons: ["✏️", "🤖", "🚫"],
        answer: 0,
        yes: "Right! The AI gives ideas. You do the making.",
        hint: "Who made the drawing in the Idea Machine?",
      },
    ],
    talk: "What's something you want to get better at? How could a helper, a person or an AI, quiz you on it?",
    mission: {
      intro: "Let's use a real AI as a helper, not a doer! A grown-up types a quiz request, and you answer the questions yourself.",
      prompts: [{ label: "The grown-up types", text: "Quiz me with 5 easy questions about planets. Ask one at a time and wait for my answer." }],
      check: ["Did it wait for your answer each time?", "Pick one answer and check it in a book together.", "Who did the thinking? (You did!)"],
    },
  },
];

/* ---------------- Sections ---------------- */

export type SectionInfo = {
  id: SectionId;
  name: string;
  kicker: string;
  path: string;
  blurb: string;
  /** Lessons planned for this section, including ones not released yet. */
  planned: number;
};

export const SECTIONS: Record<SectionId, SectionInfo> = {
  1: {
    id: 1,
    name: "Teach Pip",
    kicker: "Section 1",
    path: "/lessons",
    blurb: "Teach a baby AI the basics: examples, guesses, mistakes, and staying safe.",
    planned: 7,
  },
  2: {
    id: 2,
    name: "Pip Grows Up",
    kicker: "Section 2",
    path: "/lessons/section-2",
    blurb: "Pip grows up and so do you: where AI came from, how AI sees, clear prompts, checking answers, and using AI as a helper.",
    planned: 8,
  },
};

/** Lessons that are planned but not released yet. Shown as "coming soon" on the trail only (never in the sitemap or schema). */
export const COMING_SOON: { number: number; section: SectionId; title: string; game: string; badge: string }[] = [
  { number: 13, section: 2, title: "Fair for Everyone", game: "Pick the Team", badge: "Fairness Friend" },
  { number: 14, section: 2, title: "Secrets Stay Safe", game: "Prompt Scrubber", badge: "Secret Keeper" },
  { number: 15, section: 2, title: "Build Your Own AI", game: "My Sorting Machine", badge: "AI Builder" },
];

export function sectionLessons(section: SectionId): Lesson[] {
  return LESSONS.filter((l) => l.section === section);
}

export const SECTION_1 = sectionLessons(1);
export const SECTION_2 = sectionLessons(2);

/** 1-based position of a lesson inside its section (Lesson 8 is the 1st lesson of Section 2). */
export function positionInSection(lesson: Lesson): number {
  return sectionLessons(lesson.section).findIndex((l) => l.slug === lesson.slug) + 1;
}

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];
/** 12 -> "twelve". Falls back to digits above fifteen. */
export function numberWord(n: number, capital = false): string {
  const w = WORDS[n] ?? String(n);
  return capital ? w.charAt(0).toUpperCase() + w.slice(1) : w;
}

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function nextLesson(slug: string): Lesson | undefined {
  const i = LESSONS.findIndex((l) => l.slug === slug);
  return i >= 0 ? LESSONS[i + 1] : undefined;
}
