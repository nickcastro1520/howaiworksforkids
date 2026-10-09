/** The free Lesson 1 teacher kit (static PDF in /public/teachers). */
export const KIT = {
  href: "/teachers/lesson-1-teacher-kit.pdf",
  fileName: "lesson-1-teacher-kit.pdf",
  title: "Meet Pip: What is AI? Free Teacher Kit",
  pages: 8,
  sizeLabel: "0.8 MB",
  minutes: 35,
};

export const KIT_PREVIEWS = [
  { key: "cover", label: "Cover", alt: "Cover of the Lesson 1 teacher kit: Meet Pip: What is AI? A print-and-go kit for ages 6 to 10." },
  { key: "teacher-guide", label: "35-min teacher guide", alt: "Teacher guide page with a timing plan, materials, key words, discussion prompts, and common misconceptions." },
  { key: "card-sort", label: "AI or Not? card sort", alt: "The AI or Not? card sort: eight cut-out cards like lamp, smart speaker, and robot vacuum, plus two sorting labels." },
  { key: "worksheet-k2", label: "K–2 worksheet", alt: "The K to 2 AI Detective worksheet: circle the things that learn and guess." },
] as const;

export const KIT_CONTENTS = [
  { emoji: "🧑‍🏫", title: "35-minute teacher guide", text: "A minute-by-minute plan, background for you, key words, discussion prompts, and common misconceptions." },
  { emoji: "🃏", title: "“AI or Not?” card sort", text: "An unplugged activity with 8 cut-out cards and 2 sorting labels, for the whole class or small groups." },
  { emoji: "✏️", title: "K–2 worksheet", text: "Circle the things that learn and guess. Light on reading, heavy on pictures." },
  { emoji: "📝", title: "3–5 worksheet", text: "Sort the 8 things and explain your thinking in a sentence." },
  { emoji: "🔑", title: "Answer key", text: "Every card and question, with Pip’s own reasons from the game." },
  { emoji: "✉️", title: "Parent letter", text: "A take-home note that tells families what their child learned and how to keep the talk going." },
] as const;
