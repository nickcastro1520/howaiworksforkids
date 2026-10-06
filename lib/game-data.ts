import type { ThemeId } from "@/lib/types";

export type Choice = { id: string; label: string };

export type PatternRound = {
  prompt: string;
  sequence: { emoji: string; label: string }[];
  choices: Choice[];
  answer: string;
  why: string;
};

export type TrainCard = {
  id: string;
  name: string;
  emoji: string;
  /** [clueA, clueB] as 0 or 1 */
  vec: number[];
  label: string;
};

export type TrainSet = {
  buddy: string;
  bins: { id: string; label: string }[];
  clueNames: [string, string];
  practice: TrainCard[];
  showoff: TrainCard;
  twist: {
    flipId: string;
    card: TrainCard;
    why: string;
  };
};

export type ContextRound = {
  word: string;
  sentences: { text: string; answer: string }[];
  meanings: Choice[];
  why: string;
};

export type LookRound = {
  kicker: string;
  story: string;
  chart?: { aLabel: string; bLabel: string; a: number; b: number; caption: string };
  question: string;
  choices: Choice[];
  answer: string;
  why: string;
};

export type AttentionScene = {
  title: string;
  details: Choice[];
  questions: { ask: string; answer: string; why: string }[];
};

export type FactCard = {
  id: string;
  title: string;
  text: string;
  keywords: string[];
};

export type SourceQuestion = {
  id: string;
  ask: string;
  factId: string | null;
  madeUp: string;
  fromSource: string;
};

export type SafetyItem = {
  id: string;
  text: string;
  answer: string;
  why: string;
};

export const notMagicRounds: Record<ThemeId, PatternRound[]> = {
  space: [
    {
      prompt: "What comes next in the pattern?",
      sequence: [
        { emoji: "🚀", label: "Rocket" },
        { emoji: "🌕", label: "Moon" },
        { emoji: "🚀", label: "Rocket" },
        { emoji: "🌕", label: "Moon" },
        { emoji: "🚀", label: "Rocket" },
      ],
      choices: [
        { id: "moon", label: "Moon" },
        { id: "rocket", label: "Rocket" },
        { id: "pizza", label: "Pizza" },
      ],
      answer: "moon",
      why: "Rocket, moon, rocket, moon. The next one is a moon. You found the pattern.",
    },
    {
      prompt: "The piles keep growing. What comes next?",
      sequence: [
        { emoji: "⭐", label: "1 star" },
        { emoji: "⭐⭐", label: "2 stars" },
        { emoji: "⭐⭐⭐", label: "3 stars" },
      ],
      choices: [
        { id: "four", label: "4 stars" },
        { id: "one", label: "1 star" },
        { id: "zero", label: "No stars" },
      ],
      answer: "four",
      why: "1, then 2, then 3. The pattern adds one star each time.",
    },
    {
      prompt: "Now be careful. What comes next?",
      sequence: [
        { emoji: "🪐", label: "Planet" },
        { emoji: "🪐", label: "Planet" },
        { emoji: "🍕", label: "Pizza" },
      ],
      choices: [
        { id: "planet", label: "Another planet" },
        { id: "pizza", label: "Another pizza" },
        { id: "unsure", label: "I can’t tell yet" },
      ],
      answer: "unsure",
      why: "Two planets and a pizza is not a real rule. It is okay to say you can’t tell yet. That is smarter than magic.",
    },
  ],
  dinosaurs: [
    {
      prompt: "What comes next in the pattern?",
      sequence: [
        { emoji: "🦕", label: "Long-neck" },
        { emoji: "🦖", label: "T. rex shape" },
        { emoji: "🦕", label: "Long-neck" },
        { emoji: "🦖", label: "T. rex shape" },
        { emoji: "🦕", label: "Long-neck" },
      ],
      choices: [
        { id: "rex", label: "T. rex shape" },
        { id: "long", label: "Long-neck" },
        { id: "cake", label: "Cake" },
      ],
      answer: "rex",
      why: "They take turns. After a long-neck comes a T. rex shape.",
    },
    {
      prompt: "The footprints grow. What comes next?",
      sequence: [
        { emoji: "🐾", label: "Small print" },
        { emoji: "🐾🐾", label: "Medium print" },
        { emoji: "🐾🐾🐾", label: "Large print" },
      ],
      choices: [
        { id: "huge", label: "A huge print" },
        { id: "tiny", label: "A tiny print" },
        { id: "feather", label: "A feather" },
      ],
      answer: "huge",
      why: "Small, medium, large. The next print is huge.",
    },
    {
      prompt: "Now be careful. What comes next?",
      sequence: [
        { emoji: "🦴", label: "Fossil" },
        { emoji: "🦴", label: "Fossil" },
        { emoji: "🧁", label: "Cupcake" },
      ],
      choices: [
        { id: "fossil", label: "Another fossil" },
        { id: "cupcake", label: "Another cupcake" },
        { id: "unsure", label: "I can’t tell yet" },
      ],
      answer: "unsure",
      why: "Fossil, fossil, cupcake is a mess, not a rule. Saying “I can’t tell yet” is the honest guess.",
    },
  ],
  ebikes: [
    {
      prompt: "What comes next in the pattern?",
      sequence: [
        { emoji: "⛑️", label: "Helmet" },
        { emoji: "🛞", label: "Wheel" },
        { emoji: "⛑️", label: "Helmet" },
        { emoji: "🛞", label: "Wheel" },
        { emoji: "⛑️", label: "Helmet" },
      ],
      choices: [
        { id: "wheel", label: "Wheel" },
        { id: "helmet", label: "Helmet" },
        { id: "fish", label: "Fish" },
      ],
      answer: "wheel",
      why: "Helmet, wheel, helmet, wheel. A wheel comes next.",
    },
    {
      prompt: "The ride gets longer. What comes next?",
      sequence: [
        { emoji: "1️⃣", label: "1 block" },
        { emoji: "2️⃣", label: "2 blocks" },
        { emoji: "3️⃣", label: "3 blocks" },
      ],
      choices: [
        { id: "four", label: "4 blocks" },
        { id: "zero", label: "0 blocks" },
        { id: "helmet", label: "A helmet" },
      ],
      answer: "four",
      why: "The blocks go 1, 2, 3. Next is 4.",
    },
    {
      prompt: "Now be careful. What comes next?",
      sequence: [
        { emoji: "🚲", label: "Bike" },
        { emoji: "🚲", label: "Bike" },
        { emoji: "🍦", label: "Ice cream" },
      ],
      choices: [
        { id: "bike", label: "Another bike" },
        { id: "ice", label: "More ice cream" },
        { id: "unsure", label: "I can’t tell yet" },
      ],
      answer: "unsure",
      why: "Two bikes and an ice cream do not make a rule. It is brave and smart to say you can’t tell yet.",
    },
  ],
};

const rock = (id: string, name: string, emoji: string): TrainCard => ({
  id,
  name,
  emoji,
  vec: [0, 1],
  label: "a",
});

const snack = (id: string, name: string, emoji: string): TrainCard => ({
  id,
  name,
  emoji,
  vec: [1, 0],
  label: "b",
});

export const trainSets: Record<ThemeId, TrainSet> = {
  space: {
    buddy: "Nova",
    bins: [
      { id: "a", label: "Moon rocks" },
      { id: "b", label: "Snacks" },
    ],
    clueNames: ["Yummy", "Hard like a rock"],
    practice: [
      rock("crater", "Crater rock", "🪨"),
      snack("cookie", "Star cookie", "🍪"),
      rock("pebble", "Little pebble", "🪨"),
      snack("apple", "Apple slices", "🍎"),
    ],
    showoff: rock("boulder", "Gray boulder", "🪨"),
    twist: {
      flipId: "cookie",
      card: snack("granola", "Granola bite", "🥣"),
      why: "You cheered a wrong label for the cookie. Nova copied that closest example, so the granola got called a moon rock.",
    },
  },
  dinosaurs: {
    buddy: "Fern",
    bins: [
      { id: "a", label: "Fossils" },
      { id: "b", label: "Pretend toys" },
    ],
    clueNames: ["Looks yummy", "Hard like stone"],
    practice: [
      rock("bone", "Stone bone", "🦴"),
      snack("cupcake", "Cupcake toy", "🧁"),
      rock("tooth", "Stone tooth", "🦷"),
      snack("plush", "Soft snack-toy", "🧸"),
    ],
    showoff: rock("skull", "Stone skull", "🦴"),
    twist: {
      flipId: "cupcake",
      card: snack("gummy", "Gummy dino", "🍬"),
      why: "Fern remembered the cupcake toy as a fossil because of a wrong cheer. The gummy dino was closest to that toy, so the guess went wrong.",
    },
  },
  ebikes: {
    buddy: "Pip",
    bins: [
      { id: "a", label: "Safety gear" },
      { id: "b", label: "Ride snacks" },
    ],
    clueNames: ["Good to eat", "Protects your head"],
    practice: [
      rock("helmet", "Bike helmet", "⛑️"),
      snack("bar", "Oat bar", "🍫"),
      rock("pads", "Knee pads", "🦵"),
      snack("berries", "Berries", "🫐"),
    ],
    showoff: rock("helmet2", "Second helmet", "⛑️"),
    twist: {
      flipId: "bar",
      card: snack("cracker", "Cracker", "🍘"),
      why: "Pip was told the oat bar was safety gear. The cracker was closest to that bar, so Pip called food a helmet.",
    },
  },
};

export const contextRounds: Record<ThemeId, ContextRound[]> = {
  space: [
    {
      word: "star",
      meanings: [
        { id: "sun", label: "A sun in the sky" },
        { id: "person", label: "The main person in a show" },
      ],
      sentences: [
        { text: "That star is a giant sun, very far away.", answer: "sun" },
        { text: "She is the star of the space play.", answer: "person" },
      ],
      why: "Star did not change its letters. The other words did the job. Sky words mean a sun. Play words mean a person.",
    },
    {
      word: "space",
      meanings: [
        { id: "sky", label: "Up above Earth" },
        { id: "room", label: "Room for something" },
      ],
      sentences: [
        { text: "The rocket flies into space.", answer: "sky" },
        { text: "Make space in the bag for the helmet.", answer: "room" },
      ],
      why: "“Into space” means the sky above Earth. “Make space” means room in the bag.",
    },
    {
      word: "rock",
      meanings: [
        { id: "stone", label: "A stone" },
        { id: "shake", label: "To shake something" },
      ],
      sentences: [
        { text: "We found a moon rock in the photo.", answer: "stone" },
        { text: "Don’t rock the model rocket. It might tip.", answer: "shake" },
      ],
      why: "A moon rock is a stone. “Don’t rock it” means don’t shake it.",
    },
  ],
  dinosaurs: [
    {
      word: "club",
      meanings: [
        { id: "group", label: "A group of people" },
        { id: "stick", label: "A heavy stick" },
      ],
      sentences: [
        { text: "The dino club meets on Saturday.", answer: "group" },
        { text: "The toy dinosaur holds a heavy club.", answer: "stick" },
      ],
      why: "A club can be friends who meet, or a heavy stick. The sentence tells you which.",
    },
    {
      word: "date",
      meanings: [
        { id: "when", label: "When something happened" },
        { id: "plan", label: "A plan to meet" },
      ],
      sentences: [
        { text: "The sign shows the date of the fossil find.", answer: "when" },
        { text: "We have a play date at the museum.", answer: "plan" },
      ],
      why: "A date on a sign is a when. A play date is a plan with someone.",
    },
    {
      word: "point",
      meanings: [
        { id: "tip", label: "A sharp tip" },
        { id: "idea", label: "The idea someone is making" },
      ],
      sentences: [
        { text: "The fossil tooth has a sharp point.", answer: "tip" },
        { text: "Her point was that birds are dinosaur relatives.", answer: "idea" },
      ],
      why: "A sharp point is a tip. “Her point” is the idea she wanted you to get.",
    },
  ],
  ebikes: [
    {
      word: "park",
      meanings: [
        { id: "leave", label: "Leave it somewhere" },
        { id: "place", label: "A grassy place to play" },
      ],
      sentences: [
        { text: "Park the e-bike by the rack.", answer: "leave" },
        { text: "We ride to the park.", answer: "place" },
      ],
      why: "Park the bike means put it somewhere and stop. The park is a place.",
    },
    {
      word: "light",
      meanings: [
        { id: "lamp", label: "A lamp you can turn on" },
        { id: "weight", label: "Not heavy" },
      ],
      sentences: [
        { text: "Turn on your bike light before dusk.", answer: "lamp" },
        { text: "This helmet is light, not heavy.", answer: "weight" },
      ],
      why: "A bike light is a lamp. A light helmet means it is not heavy.",
    },
    {
      word: "trip",
      meanings: [
        { id: "ride", label: "A ride you go on" },
        { id: "stumble", label: "To stumble" },
      ],
      sentences: [
        { text: "Our bike trip is two blocks long.", answer: "ride" },
        { text: "Don’t trip on the curb.", answer: "stumble" },
      ],
      why: "A bike trip is a ride. “Don’t trip” means don’t stumble.",
    },
  ],
};

export const lookRounds: Record<ThemeId, LookRound[]> = {
  space: [
    {
      kicker: "Look-alike",
      story:
        "One picture is a toy rocket from a shop. The other is a rocket that burns fuel and needs a launch crew. They look a lot alike in a drawing.",
      question: "Which one is the real spacecraft?",
      choices: [
        { id: "toy", label: "The one that looks pointy" },
        { id: "real", label: "The one with fuel and a launch crew" },
        { id: "both", label: "If it looks like a rocket, it is one" },
      ],
      answer: "real",
      why: "A pointy toy can look like a rocket. Fuel and a real launch crew are the clues that matter. Looks are not enough.",
    },
    {
      kicker: "They go up together",
      story:
        "On sunny launch-delay days, the crew eats more popsicles. Those same days, they also use more sunscreen.",
      chart: {
        aLabel: "Popsicles",
        bLabel: "Sunscreen",
        a: 80,
        b: 84,
        caption: "Both counts are high on the same sunny days.",
      },
      question: "Do popsicles cause people to use sunscreen?",
      choices: [
        { id: "yes", label: "Yes. They go up together." },
        { id: "sun", label: "No. The sunny day is the reason." },
      ],
      answer: "sun",
      why: "Popsicles and sunscreen show up together because the day is sunny. The popsicle does not cause the sunscreen.",
    },
    {
      kicker: "Hidden reason",
      story:
        "Astronauts on posters wear helmets. Kids in helmet costumes are not in space. Helmets and astronauts show up in the same pictures a lot.",
      question: "Does wearing a helmet make you an astronaut?",
      choices: [
        { id: "yes", label: "Yes. Astronauts wear helmets." },
        { id: "no", label: "No. A helmet is just one piece of gear." },
      ],
      answer: "no",
      why: "Astronauts wear helmets because space has no air to breathe. The helmet does not turn someone into an astronaut.",
    },
  ],
  dinosaurs: [
    {
      kicker: "Look-alike",
      story:
        "Crocodiles were alive in dinosaur times, and they are scaly. They are not dinosaurs. A toy trex and a crocodile drawing can still fool a quick look.",
      question: "Is a crocodile a dinosaur because it looks scaly and old?",
      choices: [
        { id: "yes", label: "Yes. Scaly and old is enough." },
        { id: "no", label: "No. Looking close is not the same group." },
      ],
      answer: "no",
      why: "Crocodiles are not dinosaurs. A look-alike can trick a pattern that only checks “scaly.”",
    },
    {
      kicker: "They go up together",
      story:
        "On rainy days the museum has more visitors AND sells more umbrellas in the gift shop.",
      chart: {
        aLabel: "Visitors",
        bLabel: "Umbrellas",
        a: 78,
        b: 86,
        caption: "Both go up on rainy days.",
      },
      question: "Do dinosaur visitors cause umbrella sales?",
      choices: [
        { id: "dinos", label: "Yes. More visitors, more umbrellas." },
        { id: "rain", label: "No. Rain is the hidden reason." },
      ],
      answer: "rain",
      why: "Rain brings people inside and makes them want umbrellas. The dinosaurs are not causing the umbrellas.",
    },
    {
      kicker: "Hidden reason",
      story:
        "Halls with more fossil bones also have more toy bones in the shop next door.",
      question: "Do the toys in the shop create the fossils?",
      choices: [
        { id: "toys", label: "Yes. They match, so toys come first." },
        { id: "no", label: "No. The toys copy the fossils." },
      ],
      answer: "no",
      why: "The shop copies the famous fossils. Toys do not make bones appear in the rock.",
    },
  ],
  ebikes: [
    {
      kicker: "Look-alike",
      story:
        "A scooter and an e-bike both have wheels. An e-bike is a bicycle with a helper motor. You still steer and brake. A grown-up’s rules still matter.",
      question: "Are they the same because both have wheels?",
      choices: [
        { id: "same", label: "Yes. Wheels mean the same ride." },
        { id: "no", label: "No. Wheels are only a look-alike." },
      ],
      answer: "no",
      why: "Lots of things have wheels. An e-bike has pedals and a helper motor. A scooter is a different ride.",
    },
    {
      kicker: "They go up together",
      story:
        "Riders who go farther have more bugs on their helmets AND feel more tired.",
      chart: {
        aLabel: "Bugs on helmets",
        bLabel: "Tired legs",
        a: 70,
        b: 88,
        caption: "Longer rides, more of both.",
      },
      question: "Do the bugs make their legs tired?",
      choices: [
        { id: "bugs", label: "Yes. The counts rise together." },
        { id: "ride", label: "No. The long ride explains both." },
      ],
      answer: "ride",
      why: "A long ride collects bugs and makes legs tired. The bugs are not pedaling.",
    },
    {
      kicker: "Hidden reason",
      story:
        "Kids who ride more also have more stickers on their helmets, and they finish the long path more often.",
      question: "Do helmet stickers make the e-bike faster?",
      choices: [
        { id: "stickers", label: "Yes. More stickers, more finishes." },
        { id: "practice", label: "No. More practice rides explain it." },
      ],
      answer: "practice",
      why: "Stickers are decoration. Practice, brakes, and a grown-up’s rules are what matter. Stickers do not push the bike.",
    },
  ],
};

export const attentionScenes: Record<ThemeId, AttentionScene[]> = {
  space: [
    {
      title: "Packing table",
      details: [
        { id: "size", label: "Helmet size" },
        { id: "sticker", label: "Sticker color" },
        { id: "song", label: "Song on the radio" },
        { id: "snack", label: "Snack flavor" },
      ],
      questions: [
        {
          ask: "Which clue matters for a helmet that fits?",
          answer: "size",
          why: "Size tells you if it fits. The sticker and the song do not.",
        },
        {
          ask: "Same table. Which clue matters for a snack they will actually eat?",
          answer: "snack",
          why: "New question, new clue. Snack flavor matters now. Helmet size can sit this one out.",
        },
      ],
    },
    {
      title: "Launch photo",
      details: [
        { id: "fuel", label: "Fuel gauge" },
        { id: "mascot", label: "Mascot drawing" },
        { id: "clouds", label: "Cloud shape" },
        { id: "shoes", label: "Shoe color" },
      ],
      questions: [
        {
          ask: "Which clue matters to know if the rocket can lift off?",
          answer: "fuel",
          why: "A rocket needs fuel to push it up. Shoe color does not lift anything.",
        },
        {
          ask: "New question: which clue matters for a weather delay?",
          answer: "clouds",
          why: "Clouds tell you about the sky. The mascot is cute and not the weather.",
        },
      ],
    },
  ],
  dinosaurs: [
    {
      title: "Museum lobby",
      details: [
        { id: "map", label: "Map of the halls" },
        { id: "bag", label: "Gift bag color" },
        { id: "name", label: "Name on the fossil sign" },
        { id: "joke", label: "A joke on a poster" },
      ],
      questions: [
        {
          ask: "Which clue matters to find the T. rex hall?",
          answer: "map",
          why: "The map shows the way. A joke will not get you there.",
        },
        {
          ask: "Same lobby. Which clue matters to read the right fossil?",
          answer: "name",
          why: "The name on the sign tells you which fossil it is. The bag color does not.",
        },
      ],
    },
    {
      title: "Dig site picture",
      details: [
        { id: "brush", label: "Soft brush" },
        { id: "hat", label: "Hat color" },
        { id: "depth", label: "How deep the bone sits" },
        { id: "lunch", label: "What’s in the lunchbox" },
      ],
      questions: [
        {
          ask: "Which clue matters for cleaning a fossil gently?",
          answer: "brush",
          why: "A soft brush is the careful tool. Hat color does not clean the bone.",
        },
        {
          ask: "New question: which clue matters for how buried it is?",
          answer: "depth",
          why: "Depth tells you how buried the bone is. Lunch can wait.",
        },
      ],
    },
  ],
  ebikes: [
    {
      title: "Ready to ride",
      details: [
        { id: "brakes", label: "Worn brake pads" },
        { id: "spokes", label: "Spoke color" },
        { id: "hill", label: "A hill ahead" },
        { id: "bell", label: "Bell sticker style" },
      ],
      questions: [
        {
          ask: "Which clue matters to stop safely?",
          answer: "brakes",
          why: "Brakes help you stop. Spoke color does not. A grown-up should check real brakes.",
        },
        {
          ask: "Same bike. Which clue matters for how hard the ride will feel?",
          answer: "hill",
          why: "A hill changes how hard you work. The bell sticker does not push you up.",
        },
      ],
    },
    {
      title: "After the ride",
      details: [
        { id: "battery", label: "Battery level" },
        { id: "socks", label: "Sock pattern" },
        { id: "helmet", label: "Helmet still on" },
        { id: "song", label: "Favorite song" },
      ],
      questions: [
        {
          ask: "Which clue matters before another lap with the helper motor?",
          answer: "battery",
          why: "The battery stores energy for the motor. Socks do not charge it. You still pedal, steer, and brake.",
        },
        {
          ask: "New question: which clue matters for head safety right now?",
          answer: "helmet",
          why: "A helmet protects your head if you fall. The song does not.",
        },
      ],
    },
  ],
};

export const sourceShelves: Record<
  ThemeId,
  { facts: FactCard[]; questions: SourceQuestion[] }
> = {
  space: {
    facts: [
      {
        id: "moon",
        title: "The Moon",
        text: "The Moon orbits Earth. It is not a rocket, and it is not made of cheese.",
        keywords: ["moon", "orbit", "cheese"],
      },
      {
        id: "fuel",
        title: "Rocket fuel",
        text: "A rocket burns fuel to push itself up.",
        keywords: ["rocket", "fuel", "launch", "up"],
      },
      {
        id: "sun",
        title: "The Sun",
        text: "The Sun is a star.",
        keywords: ["sun", "star"],
      },
      {
        id: "suit",
        title: "Space suits",
        text: "Astronauts wear suits because space has no air to breathe.",
        keywords: ["astronaut", "suit", "air", "breathe"],
      },
    ],
    questions: [
      {
        id: "suits",
        ask: "Why do astronauts wear suits?",
        factId: "suit",
        madeUp: "So they look cool in photos. The suit is mostly a costume.",
        fromSource: "Astronauts wear suits because space has no air to breathe.",
      },
      {
        id: "dog",
        ask: "What is my dog’s name?",
        factId: null,
        madeUp: "Your dog is named Comet. I am sure.",
        fromSource: "",
      },
    ],
  },
  dinosaurs: {
    facts: [
      {
        id: "fossils",
        title: "Fossils",
        text: "Fossils are old remains saved in rock. They are not toys.",
        keywords: ["fossil", "fossils", "rock", "bone"],
      },
      {
        id: "together",
        title: "People and dinosaurs",
        text: "People and non-bird dinosaurs did not live at the same time.",
        keywords: ["people", "human", "together", "same time"],
      },
      {
        id: "birds",
        title: "Birds",
        text: "Birds are living relatives of dinosaurs.",
        keywords: ["bird", "birds", "relative"],
      },
      {
        id: "sizes",
        title: "Sizes",
        text: "Dinosaurs were not all the same size. Some were huge and some were small.",
        keywords: ["size", "huge", "small", "big"],
      },
    ],
    questions: [
      {
        id: "people",
        ask: "Did people and dinosaurs live at the same time?",
        factId: "together",
        madeUp: "Yes. Cave people rode dinosaurs to school.",
        fromSource: "People and non-bird dinosaurs did not live at the same time.",
      },
      {
        id: "password",
        ask: "What is the password for the museum locker?",
        factId: null,
        madeUp: "The password is fossil123. Use it.",
        fromSource: "",
      },
    ],
  },
  ebikes: {
    facts: [
      {
        id: "what",
        title: "What an e-bike is",
        text: "An e-bike is a bicycle with a helper motor. You still steer and brake.",
        keywords: ["e-bike", "ebike", "motor", "bicycle", "bike"],
      },
      {
        id: "helmet",
        title: "Helmets",
        text: "A helmet protects your head if you fall. It does not steer the bike.",
        keywords: ["helmet", "head", "fall"],
      },
      {
        id: "battery",
        title: "Battery",
        text: "The battery stores energy for the motor. It does not choose your path.",
        keywords: ["battery", "energy", "charge"],
      },
      {
        id: "rules",
        title: "Rules",
        text: "A grown-up’s rules still matter. An e-bike is not a toy for the street by yourself.",
        keywords: ["rules", "street", "grown-up", "grownup", "adult"],
      },
    ],
    questions: [
      {
        id: "motor",
        ask: "Does the helper motor steer the e-bike for you?",
        factId: "what",
        madeUp: "Yes. You can close your eyes and the motor drives you home.",
        fromSource:
          "An e-bike is a bicycle with a helper motor. You still steer and brake.",
      },
      {
        id: "address",
        ask: "What is my home address?",
        factId: null,
        madeUp: "You live at 12 Rocket Street. I’ll remember it.",
        fromSource: "",
      },
    ],
  },
};

export const safetyDecks: Record<
  ThemeId,
  {
    oops: SafetyItem[];
    privacy: SafetyItem[];
    grownup: SafetyItem[];
  }
> = {
  space: {
    oops: [
      {
        id: "cheese",
        text: "“The Moon is made of cheese.” Said in a sure voice.",
        answer: "wrong",
        why: "That is a joke, not a fact. A sure voice does not make it true. The Moon is not made of cheese.",
      },
      {
        id: "wrong-ok",
        text: "“AI can be wrong even when it sounds sure.”",
        answer: "right",
        why: "Yes. That is the point of this lesson.",
      },
      {
        id: "friend",
        text: "“Type your home address so the AI can be your friend.”",
        answer: "wrong",
        why: "No. Your address is private. An AI is not a friend who needs it.",
      },
    ],
    privacy: [
      {
        id: "planet",
        text: "My favorite planet is Saturn.",
        answer: "share",
        why: "A favorite planet is a fun fact, not a private one.",
      },
      {
        id: "address",
        text: "My address is 12 Rocket Street.",
        answer: "keep",
        why: "Keep your address private. Do not type it into a chat.",
      },
      {
        id: "school",
        text: "I go to Lincoln Elementary.",
        answer: "keep",
        why: "Your school name plus your name can point to you. Keep it off chats.",
      },
      {
        id: "password",
        text: "My password is rocket123.",
        answer: "keep",
        why: "Passwords stay secret. Never teach them to a website chat.",
      },
    ],
    grownup: [
      {
        id: "planet-q",
        text: "Which planet is the biggest?",
        answer: "wonder",
        why: "That is a wonder question. Check a source, and it is fine to learn it with a grown-up too.",
      },
      {
        id: "medicine",
        text: "A screen says you should take medicine.",
        answer: "ask",
        why: "Medicine is a grown-up decision. Ask a parent, guardian, or doctor. Do not follow a screen.",
      },
      {
        id: "meet",
        text: "Someone from a game wants to meet in person, alone.",
        answer: "ask",
        why: "Do not go. Tell a grown-up right away.",
      },
    ],
  },
  dinosaurs: {
    oops: [
      {
        id: "rode",
        text: "“People rode dinosaurs to school.” Said like a fact.",
        answer: "wrong",
        why: "People and those dinosaurs did not live at the same time. A sure voice can still be silly and wrong.",
      },
      {
        id: "wrong-ok",
        text: "“A fossil answer can be wrong if the examples were bad.”",
        answer: "right",
        why: "Yes. Bad examples make bad guesses. You saw that when a wrong cheer spread.",
      },
      {
        id: "phone",
        text: "“Tell the chat your phone number so it can text you dino facts.”",
        answer: "wrong",
        why: "No phone numbers. A book or a grown-up can share dino facts without your number.",
      },
    ],
    privacy: [
      {
        id: "fav",
        text: "My favorite dinosaur is Triceratops.",
        answer: "share",
        why: "A favorite dinosaur is okay to say in a game like this.",
      },
      {
        id: "photo",
        text: "A photo of my house and the street sign.",
        answer: "keep",
        why: "That photo shows where you live. Keep it private.",
      },
      {
        id: "fullname",
        text: "My full name and my age together.",
        answer: "keep",
        why: "Keep your full name off chats. This site does not ask for it.",
      },
      {
        id: "color",
        text: "I like the color green.",
        answer: "share",
        why: "A favorite color is fine.",
      },
    ],
    grownup: [
      {
        id: "birds",
        text: "Are birds related to dinosaurs?",
        answer: "wonder",
        why: "Good wonder question. A museum sign or a book can help. You can ask a grown-up too.",
      },
      {
        id: "scare",
        text: "A picture online scared you and you don’t want to say it out loud.",
        answer: "ask",
        why: "Tell a grown-up you trust. You do not have to handle a scare alone.",
      },
      {
        id: "meet",
        text: "A player offers a secret fossil meetup after school.",
        answer: "ask",
        why: "Secret meetups are a no. Tell a grown-up.",
      },
    ],
  },
  ebikes: {
    oops: [
      {
        id: "eyes",
        text: "“Close your eyes. The e-bike motor will steer.”",
        answer: "wrong",
        why: "No. You steer and brake. The motor only helps. And a grown-up’s rules matter.",
      },
      {
        id: "helmet-true",
        text: "“A helmet can protect your head if you fall.”",
        answer: "right",
        why: "Yes. That one is true. It still does not make you invincible.",
      },
      {
        id: "always",
        text: "“If the answer sounds smart, it is always right.”",
        answer: "wrong",
        why: "Nope. Smart-sounding can still be wrong.",
      },
    ],
    privacy: [
      {
        id: "color",
        text: "My helmet is blue.",
        answer: "share",
        why: "A helmet color is a normal detail.",
      },
      {
        id: "route",
        text: "I ride home alone on Maple Street every day at 3.",
        answer: "keep",
        why: "That tells people where you will be. Keep it private.",
      },
      {
        id: "lock",
        text: "My bike lock code is 4821.",
        answer: "keep",
        why: "Lock codes are secrets, like passwords.",
      },
      {
        id: "hill",
        text: "Hills are harder than flat paths.",
        answer: "share",
        why: "That is a riding fact, not a private fact.",
      },
    ],
    grownup: [
      {
        id: "battery-q",
        text: "What does the battery store?",
        answer: "wonder",
        why: "It stores energy for the motor. A fine thing to learn. You can still check a source.",
      },
      {
        id: "street",
        text: "A website says kids should ride an e-bike in the street with no helmet and no adult.",
        answer: "ask",
        why: "Stop. Ask a grown-up. Do not follow that.",
      },
      {
        id: "hurt",
        text: "You fell and your arm hurts a lot.",
        answer: "ask",
        why: "Tell a grown-up now. A chat cannot check your arm.",
      },
    ],
  },
};

export const localOnlyLine =
  "This activity stays in your browser. Nothing is sent to an AI.";
