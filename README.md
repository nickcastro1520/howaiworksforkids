# How AI Works for Kids

Free, mobile-first games that show kids ages 6–14 how AI works. The live site is [howaiworksforkids.com](https://howaiworksforkids.com).

Built by [Nick Castro](https://nickcastrobuilds.com) in Chicago as a portfolio piece for AI enablement and training. No ads, no kid accounts, and no open chat with an AI model. The games run in the browser.

## Lessons

Kid titles come first. Tweens (11–14) can turn on a reading level that adds a small grown-up name. Kids (6–10) do not see that jargon.

1. **AI isn't magic** — it finds patterns
2. **Learn by trying** — practice and feedback
3. **Words need context** — the same word can change
4. **Tricky look-alikes** — false patterns
5. **What it pays attention to** — the question picks the clue
6. **Check a source** — look it up before you answer
7. **Be safe and honest** — AI can be wrong, privacy, ask a grown-up

Worlds (Rockets & space, Dinosaurs, E-bikes) change examples and art. The lesson mechanics stay the same. The choice is saved in `localStorage` on the device, along with the reading level and finished lessons. Nothing there is sent to a server.

“Tell a parent” asks for a parent email only and opens the device mail app (`mailto:`). The address is not stored. There is no child name or child email field.

## Scripts

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Deploy on Vercel

1. Import the GitHub repo `nickcastro1520/howaiworksforkids`.
2. Framework preset: **Next.js**. Production branch: **main**.
3. Deploy. No database and no required environment variables.
4. In the project, open **Settings → Domains** and add `howaiworksforkids.com` and `www.howaiworksforkids.com`.
5. Redirect `www` to the apex (or the other way around) using the toggle Vercel shows.

Optional environment variables (see `.env.example`):

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (`G-…`). Leave unset to keep analytics off. Do not invent an ID. |
| `GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag token, if you are not verifying by DNS. |
| `RESEND_API_KEY` / `PARENT_NOTIFY_WEBHOOK` | **Off.** Not read by the app. Reserved for a future parent-only email sender. Never collect a child’s name or email. |

The analytics tag, when present, turns off Google signals and ad personalization. A kids’ site can stay on with analytics unset.

## Namecheap DNS

In Namecheap, open the domain → **Advanced DNS**. Remove parking records and any URL redirect that fights Vercel.

Use the records Vercel prints on the domain screen. They are usually:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Save, then wait for Vercel to mark the domain valid. DNS can take a while to propagate.

## Google Search Console

1. Add a property for `https://howaiworksforkids.com` (domain property or URL-prefix).
2. Verify with the DNS TXT record Google gives you, or set `GOOGLE_SITE_VERIFICATION` and redeploy if you use the HTML tag.
3. Submit the sitemap: `https://howaiworksforkids.com/sitemap.xml`.
4. Also published for crawlers: `robots.txt` and `llms.txt`.

## Privacy

The public notice is `/privacy`. It is written for a child-directed site: no ads, no kid profiles, no sale of personal information, and no live model. On-device preferences can be cleared in the browser.
