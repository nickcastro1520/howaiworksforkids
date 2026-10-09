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
import { GRID, PALETTE, pixelAt, revealOrder } from "@/lib/pixels";
import { MonsterArt } from "../games/MonsterMaker";

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


/* ---------------- Section 2 ---------------- */

function BigEmoji({ e, size = 84, className = "" }: { e: string; size?: number; className?: string }) {
  return (
    <span className={`art-emoji ${className}`} style={{ fontSize: size }} aria-hidden="true">
      {e}
    </span>
  );
}

/** A big old room-sized computer with blinking lights and tape reels. */
function RoomComputer({ size = 220 }: { size?: number }) {
  return (
    <svg viewBox="0 0 220 150" width={size} height={(size * 150) / 220} aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <g key={k} transform={`translate(${8 + k * 70} 10)`}>
          <rect width="62" height="130" rx="6" fill="#c9c4dc" stroke="#231d4f" strokeWidth="4" />
          <circle cx="18" cy="30" r="12" fill="#fff" stroke="#231d4f" strokeWidth="3" />
          <circle cx="44" cy="30" r="12" fill="#fff" stroke="#231d4f" strokeWidth="3" />
          {[0, 1, 2, 3].map((j) => (
            <circle key={j} cx={12 + j * 13} cy="70" r="4" fill={["#ff6b5b", "#ffd34d", "#33c4b0", "#4b9dff"][(j + k) % 4]} className="twinkle" />
          ))}
          <rect x="10" y="88" width="42" height="30" rx="3" fill="#8a84a8" />
        </g>
      ))}
    </svg>
  );
}

function PixelGrid({ size = 150, shown = 144 }: { size?: number; shown?: number }) {
  const order = revealOrder(4);
  const on = new Set(order.slice(0, shown));
  return (
    <svg viewBox={`0 0 ${GRID} ${GRID}`} width={size} height={size} shapeRendering="crispEdges" aria-hidden="true" className="art-pixels">
      {Array.from({ length: GRID * GRID }, (_, i) => (
        <rect
          key={i}
          x={i % GRID}
          y={Math.floor(i / GRID)}
          width="1"
          height="1"
          fill={on.has(i) ? PALETTE[pixelAt("apple", i)] : "#e6e1f3"}
          stroke="#fff"
          strokeWidth="0.04"
        />
      ))}
    </svg>
  );
}

function Lesson8({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="1rem" className="align-end">
          <span className="pop"><Pip size={110} mood="wow" bob={false} /></span>
          <BigEmoji e="🕰️" size={96} className="pop wobble" />
          <BigEmoji e="📜" size={70} className="pop" />
        </Row>
      );
    case 1:
      return (
        <div className="art-col">
          <RoomComputer size={230} />
          <Chip color="#b0306a">artificial intelligence</Chip>
        </div>
      );
    case 2:
      return (
        <Row gap="1rem" className="align-end">
          <BigEmoji e="🐢" size={86} className="pop" />
          <BigEmoji e="📄" size={56} className="pop" />
          <Pip size={92} mood="think" bob={false} />
        </Row>
      );
    case 3:
      return (
        <Row gap="0.7rem">
          <div className="art-col pop"><BigEmoji e="📚" size={70} /><Chip color="#b0306a">more data</Chip></div>
          <div className="art-col pop"><BigEmoji e="⚡" size={70} /><Chip color="#b0306a">faster computers</Chip></div>
          <div className="art-col pop"><BigEmoji e="🧠" size={70} /><Chip color="#b0306a">better learning</Chip></div>
        </Row>
      );
    default:
      return (
        <Row gap="0.8rem" className="align-end">
          <Phone size={100}>
            <Sparkle size={30} />
          </Phone>
          <span className="pop"><Pip size={110} mood="happy" bob={false} /></span>
          <Magnifier size={90} className="pop" />
        </Row>
      );
  }
}

function Lesson9({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="1rem" className="align-end">
          <span className="pop"><Pip size={110} mood="happy" bob={false} /></span>
          <PhotoCard tilt={-4}>
            <Cat size={110} />
          </PhotoCard>
        </Row>
      );
    case 1:
      return (
        <Row gap="1rem">
          <PixelGrid size={160} />
          <Pip size={96} mood="think" bob={false} />
        </Row>
      );
    case 2:
      return (
        <div className="art-col">
          <svg viewBox="0 0 3 3" width="130" height="130" shapeRendering="crispEdges" aria-hidden="true" className="pop">
            {["#e2483d", "#e2483d", "#ffd34d", "#e2483d", "#3faa4f", "#e2483d", "#4b9dff", "#e2483d", "#e2483d"].map((c, i) => (
              <rect key={i} x={i % 3} y={Math.floor(i / 3)} width="1" height="1" fill={c} stroke="#231d4f" strokeWidth="0.06" />
            ))}
          </svg>
          <Chip color="#0b7591">1 square = 1 pixel</Chip>
        </div>
      );
    case 3:
      return (
        <Row gap="1rem">
          <PixelGrid size={150} />
          <span className="art-neq" aria-hidden="true">&rarr;</span>
          <BigEmoji e="🍎" size={86} className="pop" />
        </Row>
      );
    default:
      return (
        <Row gap="1rem">
          <PixelGrid size={110} shown={18} />
          <span className="art-neq" aria-hidden="true">&rarr;</span>
          <PixelGrid size={110} shown={110} />
        </Row>
      );
  }
}

function Lesson10({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="1rem" className="align-end">
          <Computer size={190} />
          <Chip color="#8a45d0">prompt</Chip>
        </Row>
      );
    case 1:
      return (
        <Row gap="0.6rem">
          <Pip size={100} mood="think" bob={false} />
          <BigEmoji e="❓" size={60} className="pop wobble" />
          <BigEmoji e="👾" size={80} className="pop" />
          <BigEmoji e="❓" size={60} className="pop wobble" />
        </Row>
      );
    case 2:
      return (
        <div className="art-col">
          <Row gap="0.4rem">
            <Chip color="#8a45d0">small</Chip>
            <Chip color="#208644">green</Chip>
            <Chip color="#8a45d0">3 eyes</Chip>
          </Row>
          <span className="pop"><MonsterArt m={{ color: "green", eyes: 3, size: "small", place: "hill" }} label="A small green monster with 3 eyes on a hill" size={150} /></span>
        </div>
      );
    case 3:
      return (
        <Row gap="1.2rem">
          <div className="art-col"><BigEmoji e="🌫️" size={70} /><Chip color="#8a84a8">fuzzy</Chip></div>
          <div className="art-col"><BigEmoji e="🔍" size={70} /><Chip color="#8a45d0">clear</Chip></div>
        </Row>
      );
    default:
      return (
        <Row gap="0.8rem" className="align-end">
          <Person size={120} shirt="#8a45d0" />
          <span className="hop"><MonsterArt m={{ color: "purple", eyes: 1, size: "big", place: "water" }} label="A big purple monster with 1 eye in the water" size={130} /></span>
          <Sparkle size={34} className="twinkle" />
        </Row>
      );
  }
}

function Lesson11({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="1rem" className="align-end">
          <span className="pop"><Pip size={110} mood="oops" bob={false} /></span>
          <BigEmoji e="🌀" size={70} className="pop wobble" />
        </Row>
      );
    case 1:
      return (
        <Row gap="1rem">
          <Magnifier size={120} className="pop" />
          <BigEmoji e="📝" size={80} />
        </Row>
      );
    case 2:
      return (
        <Row gap="0.6rem" className="align-end">
          <Person grown size={120} shirt="#ff8fc7" hair="#2b1d14" skin="#c98b62" />
          <Book size={90} color="#b14c16" />
          <Person size={110} shirt="#b14c16" />
        </Row>
      );
    case 3:
      return (
        <div className="art-col">
          <BigEmoji e="🕷️" size={80} className="pop" />
          <Row gap="0.4rem">
            <Chip color="#b14c16">8 legs</Chip>
            <Chip color="#b14c16">please fix it</Chip>
          </Row>
        </div>
      );
    default:
      return (
        <Row gap="0.7rem">
          <div className="art-col pop"><BigEmoji e="🔎" size={66} /><Chip color="#b14c16">find it</Chip></div>
          <div className="art-col pop"><BigEmoji e="📖" size={66} /><Chip color="#b14c16">check it</Chip></div>
          <div className="art-col pop"><BigEmoji e="🛠️" size={66} /><Chip color="#b14c16">fix it</Chip></div>
        </Row>
      );
  }
}

function Lesson12({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="0.8rem" className="align-end">
          <span className="pop"><Pip size={110} mood="happy" bob={false} /></span>
          <BigEmoji e="❓" size={56} className="pop" />
          <BigEmoji e="💡" size={70} className="pop" />
          <BookStack size={110} />
        </Row>
      );
    case 1:
      return (
        <Row gap="0.8rem" className="align-end">
          <Person size={120} shirt="#2f5fd0" />
          <BigEmoji e="😴" size={60} className="pop" />
          <Pip size={96} mood="think" bob={false} />
        </Row>
      );
    case 2:
      return (
        <Row gap="1.2rem">
          <div className="art-col"><BigEmoji e="🤝" size={74} /><Chip color="#208644">helper</Chip></div>
          <div className="art-col"><BigEmoji e="🛋️" size={74} /><Chip color="#cb4834">doer</Chip></div>
        </Row>
      );
    case 3:
      return (
        <Row gap="0.6rem" className="align-end">
          <Pip size={96} mood="happy" bob={false} />
          <BigEmoji e="💡" size={56} className="pop" />
          <span className="art-neq" aria-hidden="true">&rarr;</span>
          <Person size={120} shirt="#2f5fd0" />
          <Pencil size={110} />
        </Row>
      );
    default:
      return (
        <Row gap="0.8rem" className="align-end">
          <BigEmoji e="🐉" size={70} className="pop" />
          <span className="art-neq" aria-hidden="true">+</span>
          <BigEmoji e="🍕" size={70} className="pop" />
          <Sparkle size={34} className="twinkle" />
        </Row>
      );
  }
}


function Lesson13({ page }: { page: number }) {
  const round1 = G("teal", 2, "horns", false, "round");
  const round2 = G("orange", 1, "antenna", false, "round");
  const square = G("teal", 2, "antenna", false, "square");
  const spiky = G("orange", 3, "horns", false, "spiky");
  switch (page) {
    case 0:
      return (
        <Row gap="0.6rem" className="align-end">
          <span className="pop"><Pip size={100} mood="happy" bob={false} /></span>
          <BigEmoji e="🏐" size={56} className="pop" />
          <Glorb g={round1} size={84} />
          <Glorb g={round2} size={84} />
        </Row>
      );
    case 1:
      return (
        <Row gap="0.8rem" className="align-end">
          <div className="art-col">
            <Row gap="0.2rem">
              <Glorb g={round1} size={64} />
              <Glorb g={round2} size={64} />
            </Row>
            <Chip color="#208644">picked</Chip>
          </div>
          <div className="art-col">
            <Row gap="0.2rem">
              <Glorb g={square} size={64} />
              <Glorb g={spiky} size={64} />
            </Row>
            <Chip color="#cb4834">left out</Chip>
          </div>
        </Row>
      );
    case 2:
      return (
        <Row gap="0.6rem" className="align-end">
          <Glorb g={square} size={96} className="pop" />
          <Glorb g={spiky} size={96} className="pop" />
          <Pip size={96} mood="think" bob={false} />
        </Row>
      );
    case 3:
      return (
        <Row gap="0.8rem" className="align-end">
          <div className="art-col">
            <BigEmoji e="📦" size={64} />
            <Row gap="0.1rem">
              <Glorb g={round1} size={44} />
              <Glorb g={square} size={44} />
              <Glorb g={spiky} size={44} />
            </Row>
          </div>
          <BigEmoji e="⚖️" size={74} className="pop" />
        </Row>
      );
    default:
      return (
        <Row gap="0.3rem" className="align-end">
          <Glorb g={round1} size={72} className="pop" />
          <Glorb g={square} size={72} className="pop" />
          <span className="pop"><Pip size={96} mood="proud" bob={false} /></span>
          <Glorb g={spiky} size={72} className="pop" />
        </Row>
      );
  }
}

function Lesson14({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="0.6rem" className="align-end">
          <Person size={110} shirt="#a3343c" />
          <BigEmoji e="💬" size={52} className="fly-in" />
          <span className="art-neq" aria-hidden="true">&rarr;</span>
          <BigEmoji e="🏢" size={84} />
        </Row>
      );
    case 1:
      return (
        <Row gap="0.8rem" className="align-end">
          <BigEmoji e="🏢" size={84} />
          <div className="art-col">
            <BigEmoji e="🗂️" size={60} className="pop" />
            <Chip color="#231d4f">chat history</Chip>
          </div>
        </Row>
      );
    case 2:
      return (
        <Row gap="0.8rem">
          <Shield size={110} className="pop" />
          <div className="art-col">
            <Chip color="#a3343c">full name</Chip>
            <Chip color="#a3343c">school</Chip>
            <Chip color="#a3343c">address</Chip>
            <Chip color="#a3343c">password</Chip>
          </div>
        </Row>
      );
    case 3:
      return (
        <Row gap="0.6rem">
          <div className="art-col">
            <Chip color="#cb4834" className="art-strike">Maya Lopez</Chip>
            <span className="art-neq" aria-hidden="true">&darr;</span>
            <Chip color="#208644">my friend</Chip>
          </div>
          <Pip size={100} mood="happy" bob={false} />
        </Row>
      );
    default:
      return (
        <Row gap="0.8rem" className="align-end">
          <BigEmoji e="🧽" size={70} className="pop" />
          <span className="pop"><Pip size={110} mood="proud" bob={false} /></span>
          <Shield size={84} className="pop" />
        </Row>
      );
  }
}

function Lesson15({ page }: { page: number }) {
  switch (page) {
    case 0:
      return (
        <Row gap="0.8rem" className="align-end">
          <Person size={120} shirt="#4a4a9e" />
          <BigEmoji e="🛠️" size={60} className="pop" />
          <Pip size={100} mood="wow" bob={false} />
        </Row>
      );
    case 1:
      return (
        <Row gap="1rem">
          <BigEmoji e="🐾" size={64} className="pop" />
          <BigEmoji e="🍎" size={64} className="pop" />
          <BigEmoji e="😀" size={64} className="pop" />
        </Row>
      );
    case 2:
      return (
        <Row gap="0.8rem">
          <Basket label="Land" color="#208644">
            <BigEmoji e="🐕" size={40} />
            <BigEmoji e="🐔" size={40} />
          </Basket>
          <Basket label="Water" color="#2774d1">
            <BigEmoji e="🐟" size={40} />
            <BigEmoji e="🐙" size={40} />
          </Basket>
        </Row>
      );
    case 3:
      return (
        <Row gap="0.6rem">
          <div className="art-col">
            <BigEmoji e="🐍" size={64} />
            <Chip color="#cb4834">oops: water?</Chip>
          </div>
          <span className="art-neq" aria-hidden="true">+</span>
          <div className="art-col">
            <BigEmoji e="➕" size={48} className="pop" />
            <Chip color="#208644">add an example</Chip>
          </div>
        </Row>
      );
    default:
      return (
        <Row gap="0.8rem" className="align-end">
          <span className="pop"><Pip size={110} mood="proud" bob={false} /></span>
          <div className="art-card-mini pop">
            <b>My AI Card</b>
            <span>🧪 tested</span>
            <span>⚖️ every kind</span>
            <span>🛡️ safety rule</span>
          </div>
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
  "where-did-ai-come-from": Lesson8,
  "how-ai-sees-pictures": Lesson9,
  "say-it-clearly": Lesson10,
  "check-it-fix-it": Lesson11,
  "ai-learning-helper": Lesson12,
  "fair-for-everyone": Lesson13,
  "secrets-stay-safe": Lesson14,
  "build-your-own-ai": Lesson15,
};

export function StoryArt({ slug, page }: { slug: string; page: number }) {
  const C = MAP[slug];
  return <div className="stage-inner" key={`${slug}-${page}`}>{C ? <C page={page} /> : null}</div>;
}
