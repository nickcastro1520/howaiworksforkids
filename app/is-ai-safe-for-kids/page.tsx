import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { ogAlt } from "@/lib/og";

export const metadata: Metadata = pageMeta({
  title: "Is AI Safe for Kids? A Parent Guide for Ages 6–10",
  description:
    "Is AI safe for kids? What experts recommend by age, the real risks of chatbots for 6- to 10-year-olds, simple family rules, and free kid-safe games that teach AI safety.",
  path: "/is-ai-safe-for-kids",
  ogKey: "is-ai-safe-for-kids",
  ogAlt: ogAlt("is-ai-safe-for-kids"),
  keywords: ["is AI safe for kids", "kids and ChatGPT safety", "can my child use ChatGPT", "what age can kids use AI chatbots", "how to keep kids safe with AI"],
});

const SRC = {
  csmGemini: "https://institute.commonsensemedia.org/risk-assessments/gemini-under-13",
  csmGenAi: "https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-generative-ai",
  csmCompanions: "https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-ai-companions-and-relationships",
  openaiTerms: "https://openai.com/policies/terms-of-use/",
  googleGemini: "https://support.google.com/gemini/answer/16109150?hl=en",
};

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
      {children}
    </a>
  );
}

const AGES = [
  { age: "Under 5", rule: "No AI chatbots at all.", who: "Common Sense Media", href: SRC.csmGemini },
  { age: "6 to 12", rule: "Only with close parent supervision, and in moderation.", who: "Common Sense Media", href: SRC.csmGemini },
  { age: "13 and up", rule: "OpenAI's minimum age for ChatGPT. Under 18 needs a parent or guardian's permission.", who: "OpenAI Terms of Use", href: SRC.openaiTerms },
];

const RISKS = [
  {
    title: "Things they're not ready to see",
    what: "Safety filters help, but they miss things. Google says its Gemini filters for kids \u201caren't perfect,\u201d and Common Sense Media's testing found content younger children aren't ready for still got through.",
    say: "If anything on a screen feels weird or yucky, stop and come get me. You won't be in trouble.",
    links: [{ href: "/lessons/smart-and-safe", label: "Lesson 7: Be the Boss of AI" }],
  },
  {
    title: "Confident wrong answers",
    what: "AI can sound completely sure and still be wrong.",
    say: "Sounding sure isn't the same as being right. Let's check important answers together.",
    links: [
      { href: "/lessons/ai-can-be-wrong", label: "Lesson 5: Sure Doesn't Mean Right" },
      { href: "/lessons/check-it-fix-it", label: "Lesson 11: Check It, Fix It" },
    ],
  },
  {
    title: "Sharing private things",
    what: "Kids may type their name, school, or address without thinking. Google tells parents to remind kids not to share their address, school name, or family information.",
    say: "Your name, school, address, and photos stay private. We never type them into an AI.",
    links: [{ href: "/lessons/secrets-stay-safe", label: "Lesson 14: Secrets Stay Safe" }],
  },
  {
    title: "Treating AI like a friend",
    what: "Chatbots are friendly and can feel like a person. Google suggests helping your child understand it's \u201can AI tool, not a person to confide in.\u201d",
    say: "AI isn't a person and doesn't have feelings. Big feelings go to a person who loves you.",
    links: [{ href: "/lessons/smart-and-safe", label: "Lesson 7: Be the Boss of AI" }],
  },
  {
    title: "Letting AI do the work",
    what: "AI can help a child learn, or it can do the thinking for them.",
    say: "AI can be a helper, but you're the one doing the learning.",
    links: [{ href: "/lessons/ai-learning-helper", label: "Lesson 12: AI Can Help You Learn and Make Things" }],
  },
];

const RULES = [
  "We use AI together, on a grown-up's account.",
  "Ask a grown-up before you type anything.",
  "Never type your name, school, address, or photos.",
  "AI isn't a person. Bring feelings to a person.",
  "Check important answers with a grown-up or a trusted source.",
  "If something feels weird, stop and tell a grown-up.",
];

const FAQ = [
  {
    q: "Is ChatGPT safe for an 8-year-old?",
    a: "OpenAI's terms say users must be at least 13, and anyone under 18 needs a parent or guardian's permission. For younger kids, Common Sense Media recommends any chatbot use happen only with close parent supervision and in moderation.",
  },
  {
    q: "Is Gemini for kids safe?",
    a: "Google lets parents turn on Gemini for supervised accounts under 13 through Family Link, and says its filters aren't perfect. Common Sense Media rated Gemini Under 13 \u201cHigh risk\u201d and recommends using it only in moderation and with direct supervision.",
  },
  {
    q: "Should my child use AI for homework?",
    a: "Only as a helper, not a doer, and only if their school allows it. Lesson 12 on this site teaches the difference with a game.",
  },
  {
    q: "Can my child talk to AI about feelings?",
    a: "Common Sense Media recommends that no one under 18 use chatbots for mental health advice or emotional support. Feelings, worries, and secrets belong with a trusted grown-up.",
  },
  {
    q: "Is this website safe for kids?",
    a: "Yes. There is no open AI chat, no accounts, and no ads, and we don't collect kid data. Lesson progress stays in your browser. See the privacy notice for details.",
  },
];

export default function IsAiSafePage() {
  return (
    <div className="parents">
      <JsonLd data={faqJsonLd(FAQ)} />
      <header className="page-hero parents-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Parents & Teachers", path: "/parents" }, { name: "Is AI safe for kids?", path: "/is-ai-safe-for-kids" }]} />
          <p className="small-cap">For parents</p>
          <h1 className="page-title">Is it safe for kids to use AI? A plain guide for parents of 6- to 10-year-olds</h1>
          <p className="page-lead">
            New to AI yourself?{" "}
            <Link href="/explain-ai-to-kids" className="text-link">
              Start with how to explain AI to an 8-year-old
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="wrap parents-body">
        <section aria-labelledby="short">
          <h2 id="short" className="section-title">
            The short answer
          </h2>
          <p>
            For kids 6 to 10, AI chatbots aren&rsquo;t something to use alone. <Ext href={SRC.csmGemini}>Common Sense Media</Ext> recommends no
            chatbots under age 5 and, for ages 6 to 12, use only with close parent supervision and in moderation. The safest start is learning how AI
            works without a chatbot, then trying one together, on your account, with clear family rules.
          </p>
          <p>This site has no chatbot. Kids learn how AI works by teaching a tiny one named Pip.</p>
        </section>

        <section aria-labelledby="ages">
          <h2 id="ages" className="section-title">
            What experts recommend, by age
          </h2>
          <div className="use-grid">
            {AGES.map((a) => (
              <div key={a.age} className="use-card">
                <h3>{a.age}</h3>
                <p>{a.rule}</p>
                <p className="use-more">
                  Source: <Ext href={a.href}>{a.who}</Ext>
                </p>
              </div>
            ))}
          </div>
          <p>
            Common Sense Media also recommends that no one under 18 use{" "}
            <Ext href={SRC.csmCompanions}>AI companions</Ext> or use chatbots for{" "}
            <Ext href={SRC.csmGemini}>mental health advice or emotional support</Ext>.
          </p>
        </section>

        <section aria-labelledby="risks">
          <h2 id="risks" className="section-title">
            The 5 real risks for young kids
          </h2>
          <div className="use-grid">
            {RISKS.map((r, i) => (
              <div key={r.title} className="use-card">
                <h3>
                  {i + 1}. {r.title}
                </h3>
                <p>{r.what}</p>
                <p>
                  <b>What to say:</b> &ldquo;{r.say}&rdquo;
                </p>
                {r.links.map((l) => (
                  <p key={l.href + r.title} className="use-more">
                    <Link href={l.href} className="text-link">
                      Teach it with a game: {l.label} &rarr;
                    </Link>
                  </p>
                ))}
              </div>
            ))}
          </div>
          <p>
            Pictures and videos can be made by AI too. <Link href="/lessons/real-or-made-up">Lesson 6: Real or Made by AI?</Link> helps kids spot the
            difference.
          </p>
          <p>
            <Link href="/lessons/smart-and-safe" className="btn btn-sun">
              Teach these with a game: Lesson 7, Be the Boss of AI
            </Link>
          </p>
        </section>

        <section aria-labelledby="rules" className="safe-box">
          <h2 id="rules" className="section-title light">
            Simple family rules
          </h2>
          <p>Short enough to read aloud together.</p>
          <ol className="safe-list">
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="try">
          <h2 id="try" className="section-title">
            If you do let your child try a chatbot
          </h2>
          <div className="use-card">
            <ul>
              <li>
                <b>Check the age rules and set it up yourself.</b> Many AI tools require users to be 13 or older (
                <Ext href={SRC.csmGenAi}>Common Sense Media</Ext>). For kids under 13, Google lets parents turn on Gemini for supervised accounts
                through Family Link, but not in the European Economic Area, Switzerland, or the UK (<Ext href={SRC.googleGemini}>Google&rsquo;s help page</Ext>).
              </li>
              <li>
                <b>Sit with them.</b> Read answers before your child does.
              </li>
              <li>
                <b>Make it a learning task.</b> Common Sense Media suggests &ldquo;AI test-drives&rdquo; together, and fact-checking by having your child ask
                about a topic they know really well, like a favorite sport (<Ext href={SRC.csmGenAi}>source</Ext>).
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="first">
          <h2 id="first" className="section-title">
            Learn how AI works first, with no chatbot
          </h2>
          <p>
            Kids who know how AI works are better at spotting its mistakes. On this site there are no ads, no accounts, no open AI chat, and no kid
            data collected. Progress stays in your browser. Each lesson is a short story and a hands-on game where your child teaches Pip.
          </p>
          <p>
            <Link href="/lessons/what-is-ai" className="btn btn-sun">
              Start Lesson 1. Free, no sign-up, no chatbot
            </Link>{" "}
            <Link href="/lessons" className="text-link">
              See all lessons
            </Link>
          </p>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="section-title">
            Questions parents ask
          </h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p>
            More for grown-ups: the <Link href="/parents">parent guide</Link> and the <Link href="/privacy">privacy notice</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
