import { Bird, Cat, Fish, Glorb, PhotoCard, Sparkle, type GlorbData } from "./Bits";
import {
  Book,
  BookStack,
  Calculator,
  Computer,
  Hand6,
  House,
  Magnifier,
  MeltyClock,
  Pencil,
  Person,
  Phone,
  Shield,
  StopSign,
} from "./Props";
import { Pip } from "../Pip";

const G = (color: GlorbData["color"], eyes: GlorbData["eyes"], top: GlorbData["top"], spots: boolean, shape: GlorbData["shape"]): GlorbData => ({
  color,
  eyes,
  top,
  spots,
  shape,
});

function Row({ children, gap = "1rem", className = "" }: { children: React.ReactNode; gap?: string; className?: string }) {
  return (
    <div className={`art-row ${className}`} style={{ gap }}>
      {children}
    </div>
  );
}

function Chip({ children, color = "#231d4f", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <span className={`art-chip ${className}`} style={{ background: color }}>
      {children}
    </span>
  );
}

function Basket({ label, color, children }: { label: string; color: string; children?: React.ReactNode }) {
  return (
    <div className="art-basket" style={{ borderColor: color }}>
      <span className="art-basket-label" style={{ background: color }}>
        {label}
      </span>
      <div className="art-basket-items">{children}</div>
    </div>
  );
}

function Lesson1({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row>
          <div className="pop">
            <Computer size={230} />
          </div>
          <Sparkle size={30} className="twinkle" />
        </Row>
      );
    case 1:
      return (
        <div className="art-col">
          <Row gap="0.4rem" className="fan">
            {[-12, -6, 0, 6, 12].map((t, i) => (
              <span key={t} className="fly-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <PhotoCard tilt={t}>
                  <Cat size={62} />
                </PhotoCard>
              </span>
            ))}
          </Row>
          <Chip color="#6b4cf0">1,000 cat pictures!</Chip>
        </div>
      );
    case 2:
      return (
        <div className="art-col">
          <div className="pop">
            <Cat size={170} glow />
          </div>
          <Row gap="0.5rem">
            <Chip color="#e0336f">pointy ears</Chip>
            <Chip color="#e0336f">whiskers</Chip>
          </Row>
        </div>
      );
    case 3:
      return (
        <Row gap="1.5rem">
          <PhotoCard tilt={-4} className="pop">
            <Cat size={110} />
          </PhotoCard>
          <div className="art-bubble pop" style={{ animationDelay: ".35s" }}>
            Cat!
            <small>I&rsquo;m pretty sure</small>
          </div>
        </Row>
      );
    default:
      return (
        <div className="art-overlap">
          <House size={240} />
          <div className="search-sweep">
            <Magnifier size={110} />
          </div>
        </div>
      );
  }
}

const crowd = [
  G("teal", 2, "antenna", false, "round"),
  G("orange", 1, "horns", true, "tall"),
  G("teal", 3, "horns", true, "tall"),
  G("orange", 2, "antenna", false, "round"),
  G("orange", 3, "antenna", true, "round"),
];

function Lesson2({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="0.25rem" className="crowd">
          {crowd.map((g, i) => (
            <span key={i} className="hop" style={{ animationDelay: `${i * 0.15}s` }}>
              <Glorb g={g} size={i === 2 ? 110 : 84} />
            </span>
          ))}
        </Row>
      );
    case 1:
    case 2:
      return (
        <div className="art-col">
          <Row gap="1rem">
            <Basket label="Team Star" color="#0c836e">
              <Glorb g={crowd[0]} size={58} />
              <Glorb g={crowd[2]} size={58} />
            </Basket>
            <Basket label="Team Cloud" color="#e0731a">
              <Glorb g={crowd[1]} size={58} />
              <Glorb g={crowd[3]} size={58} />
            </Basket>
          </Row>
          {page === 2 && (
            <Row gap="0.5rem">
              <Chip color="#0c836e" className="pop">all teal</Chip>
              <Chip color="#c25a0c" className="pop">all orange</Chip>
            </Row>
          )}
        </div>
      );
    case 3:
      return (
        <Row gap="1rem">
          <div className="art-q pop">
            <Glorb g={G("orange", 1, "antenna", false, "round")} size={110} />
            <span className="art-q-mark">?</span>
          </div>
          <span className="art-arrow">&rarr;</span>
          <Basket label="Team Cloud" color="#e0731a">
            <Glorb g={crowd[1]} size={50} />
            <Glorb g={crowd[3]} size={50} />
          </Basket>
        </Row>
      );
    default:
      return (
        <div className="chalkboard pop">
          <p>Teacher:</p>
          <p className="chalk-big">YOU!</p>
          <Row gap="0.25rem">
            <Glorb g={crowd[4]} size={56} />
            <Glorb g={crowd[0]} size={56} />
          </Row>
        </div>
      );
  }
}

function WordTrain({ words, last, highlight = false }: { words: string[]; last: string; highlight?: boolean }) {
  return (
    <div className="word-train">
      {words.map((w, i) => (
        <span key={i} className="word-car" style={{ animationDelay: `${i * 0.18}s` }}>
          {w}
        </span>
      ))}
      <span className={`word-car word-next ${highlight ? "is-on" : ""}`} style={{ animationDelay: `${words.length * 0.18}s` }}>
        {last}
      </span>
    </div>
  );
}

function Lesson3({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <div className="chat-stack">
          <div className="chat-b chat-me pop">What&rsquo;s a fun fact?</div>
          <div className="chat-b chat-bot pop" style={{ animationDelay: ".4s" }}>
            Octopuses have three hearts!
          </div>
          <div className="chat-b chat-bot typing pop" style={{ animationDelay: ".8s" }}>
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case 1:
      return <WordTrain words={["The", "dog", "likes", "to"]} last="?" />;
    case 2:
      return (
        <Row gap="0.5rem">
          <BookStack size={130} className="pop" />
          <BookStack size={150} className="pop" />
          <BookStack size={120} className="pop" />
        </Row>
      );
    case 3:
      return <WordTrain words={["Once", "upon", "a"]} last="time!" highlight />;
    default:
      return (
        <div className="guess-bars">
          {[
            ["time", 86],
            ["hill", 8],
            ["dragon", 6],
          ].map(([w, p], i) => (
            <div key={w} className="guess-bar-row">
              <span>{w}</span>
              <span className="guess-bar">
                <span className="grow-x" style={{ width: `${p}%`, animationDelay: `${i * 0.2}s` }} />
              </span>
              <b>{p}%</b>
            </div>
          ))}
        </div>
      );
  }
}

function TrainingCards({ tag = false }: { tag?: boolean }) {
  return (
    <div className="art-col">
      <Row gap="0.75rem">
        <div className="art-col tight">
          <PhotoCard tilt={-3}><Fish color="blue" size={74} /></PhotoCard>
          <PhotoCard tilt={2}><Fish color="blue" size={74} /></PhotoCard>
          <span className="art-label">fish</span>
        </div>
        <div className="art-col tight">
          <PhotoCard tilt={3}><Bird color="red" size={74} /></PhotoCard>
          <PhotoCard tilt={-2}><Bird color="red" size={74} /></PhotoCard>
          <span className="art-label">bird</span>
        </div>
      </Row>
      {tag && (
        <Row gap="0.5rem">
          <Chip color="#2a6fd0" className="pop">all blue!</Chip>
          <Chip color="#d23b3b" className="pop">all red!</Chip>
        </Row>
      )}
    </div>
  );
}

function Lesson4({ page }: { page: number }) {
  switch (page) {
    case 0:
      return <TrainingCards />;
    case 1:
      return <TrainingCards tag />;
    case 2:
      return (
        <Row gap="1rem">
          <PhotoCard tilt={-3} className="pop"><Fish color="red" size={120} /></PhotoCard>
          <div className="art-bubble wrong pop" style={{ animationDelay: ".35s" }}>
            Bird?
            <small>red means bird&hellip;</small>
          </div>
        </Row>
      );
    case 3:
      return (
        <div className="seesaw">
          <div className="seesaw-plank">
            <span className="seesaw-side">
              <Fish color="blue" size={56} />
              <Fish color="blue" size={56} />
              <Fish color="blue" size={56} />
            </span>
            <span className="seesaw-side">
              <Fish color="red" size={40} />
            </span>
          </div>
          <div className="seesaw-base" />
        </div>
      );
    default:
      return (
        <Row gap="0.75rem">
          {(["red", "yellow"] as const).map((c, i) => (
            <PhotoCard key={c} tilt={i ? 3 : -3} className="pop plus-card">
              <Fish color={c} size={80} />
            </PhotoCard>
          ))}
          {(["blue", "yellow"] as const).map((c, i) => (
            <PhotoCard key={c} tilt={i ? -2 : 2} className="pop plus-card">
              <Bird color={c} size={80} />
            </PhotoCard>
          ))}
        </Row>
      );
  }
}

function Lesson5({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <div className="oops-sign pop">
          <span>OOPS!</span>
        </div>
      );
    case 1:
      return (
        <div className="meter pop" aria-hidden="true">
          <div className="meter-dial">
            <span className="meter-needle" />
          </div>
          <span className="meter-label">Sure-o-meter: 100%</span>
        </div>
      );
    case 2:
      return (
        <Row gap="0.75rem">
          <div className="art-bubble pop">Sounds right</div>
          <span className="art-neq">&ne;</span>
          <div className="art-bubble good pop" style={{ animationDelay: ".3s" }}>Is right</div>
        </Row>
      );
    case 3:
      return (
        <Row gap="1rem" className="align-end">
          <div className="art-col tight pop">
            <Person grown size={100} shirt="#a66500" />
            <span className="art-label">a grown-up</span>
          </div>
          <div className="art-col tight pop">
            <Book size={110} color="#a66500" />
            <span className="art-label">a good book</span>
          </div>
        </Row>
      );
    default:
      return (
        <Row gap="1rem">
          <div className="ff-card ff-fact pop">FACT</div>
          <div className="ff-card ff-fib pop" style={{ animationDelay: ".25s" }}>FIB</div>
        </Row>
      );
  }
}

function CatInHat({ size = 150 }: { size?: number }) {
  return (
    <div className="cat-hat" style={{ width: size }}>
      <svg viewBox="0 0 120 60" width={size * 0.7} aria-hidden="true" className="cat-hat-hat">
        <rect x="30" y="4" width="60" height="42" rx="6" fill="#6b4cf0" stroke="#231d4f" strokeWidth="4" />
        <rect x="30" y="30" width="60" height="10" fill="#ff8fc7" />
        <rect x="8" y="42" width="104" height="14" rx="7" fill="#6b4cf0" stroke="#231d4f" strokeWidth="4" />
      </svg>
      <Cat size={size} />
    </div>
  );
}

function Lesson6({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="0.75rem">
          <div className="prompt-box pop">a cat in a hat</div>
          <span className="art-arrow">&rarr;</span>
          <div className="frame pop" style={{ animationDelay: ".4s" }}>
            <CatInHat size={110} />
          </div>
        </Row>
      );
    case 1:
      return (
        <div className="frame frame-big pop">
          <CatInHat size={130} />
          <span className="stamp">Never happened</span>
        </div>
      );
    case 2:
      return (
        <Row gap="1rem">
          <Phone size={110}>
            <span className="play-btn" />
          </Phone>
          <div className="sound-waves" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </Row>
      );
    case 3:
      return (
        <Row gap="1rem">
          <div className="art-col tight pop">
            <Hand6 size={120} />
            <span className="art-label">6 fingers?</span>
          </div>
          <div className="art-col tight pop">
            <MeltyClock size={120} />
            <span className="art-label">melty clock?</span>
          </div>
        </Row>
      );
    default:
      return (
        <div className="search-sweep big">
          <Magnifier size={150} />
        </div>
      );
  }
}

function Lesson7({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="1rem" className="align-end">
          <Pencil size={150} className="pop" />
          <Calculator size={80} className="pop" />
          <span className="pop"><Pip size={92} mood="happy" bob={false} /></span>
        </Row>
      );
    case 1:
      return (
        <Row gap="1rem" className="align-end">
          <Person size={120} shirt="#208644" />
          <span className="art-neq">&ne;</span>
          <Pip size={110} mood="think" bob={false} />
        </Row>
      );
    case 2:
      return (
        <div className="art-col">
          <Shield size={120} className="pop" />
          <Row gap="0.4rem">
            <Chip color="#208644">my address</Chip>
            <Chip color="#208644">my school</Chip>
            <Chip color="#208644">passwords</Chip>
          </Row>
        </div>
      );
    case 3:
      return <StopSign size={110} className="pop wobble" />;
    default:
      return (
        <Row gap="0.5rem" className="align-end">
          <Person grown size={120} shirt="#ff8fc7" hair="#2b1d14" skin="#c98b62" />
          <Person size={120} shirt="#208644" hair="#f2c14e" />
          <Sparkle size={34} className="twinkle" />
        </Row>
      );
  }
}

const MAP: Record<string, (p: { page: number }) => React.ReactNode> = {
  "what-is-ai": Lesson1,
  "learning-from-examples": Lesson2,
  "guess-the-next-word": Lesson3,
  "sneaky-clues": Lesson4,
  "ai-can-be-wrong": Lesson5,
  "real-or-made-up": Lesson6,
  "smart-and-safe": Lesson7,
};

export function StoryArt({ slug, page }: { slug: string; page: number }) {
  const C = MAP[slug];
  return <div className="stage-inner" key={`${slug}-${page}`}>{C ? <C page={page} /> : null}</div>;
}
