/**
 * Real feedback from our two testers, shared by their dad (Nick) with his okay.
 * Wording is kept exactly as they said it. First names and ages only. No photos.
 * The site is for ages 6–10. Nolan is older on purpose: he checks whether a lesson
 * is too easy or confusing. Never add a quote here that a kid didn't really say.
 */
export type Tester = {
  name: string;
  age: number;
  role: string;
  roleShort: string;
  quote: string;
  color: string;
};

export const TESTERS: Tester[] = [
  {
    name: "Nathan",
    age: 8,
    role: "Plays every lesson, right in our 6–10 age range.",
    roleShort: "Kid tester",
    quote: "Pip is cool! I learned that AI works by guessing, and sometimes it's wrong.",
    color: "#2774d1",
  },
  {
    name: "Nolan",
    age: 11,
    role: "Our older tester. He checks whether things are too easy or confusing.",
    roleShort: "Older tester",
    quote: "It was fun. It felt like I was teaching the AI, and then I realized that's how AI actually learns.",
    color: "#208644",
  },
];

export const TESTER_CREDIT = "Shared by their dad, Nick";
