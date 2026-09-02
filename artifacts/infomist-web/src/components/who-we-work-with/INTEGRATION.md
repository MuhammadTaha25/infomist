# "Who We Work With" — buyer-routing experience

Turns the six static persona cards into an interactive buyer journey:
**role → business problem → challenge → capability → approach → proof →
engagement model → contact.**

## What's here

| File | Purpose |
| --- | --- |
| `src/data/whoWeWorkWithData.ts` | Data model — 6 personas, challenges, capability pathways (linked to real `/solutions/*` routes), engagement models, delivery process, per-persona FAQs, SEO. |
| `src/data/proofData.ts` | Proof-of-work items (mirrors the Case Studies page) + `proofFor(tags)` context filter. |
| `src/components/who-we-work-with/PersonaExplorer.tsx` | Interactive main section — persona rail + dynamic panel. Drop-in replacement for the static `<WhoWeWorkWith />`. |
| `src/components/who-we-work-with/ChallengeSelector.tsx` | The challenge router: pick a challenge → approach + relevant capabilities + filtered proof + context-carrying CTA. `ChallengePreview` is the compact version. |
| `src/components/who-we-work-with/PersonaDetail.tsx` | Full persona page body — breadcrumb, hero, challenge selector, capabilities, engagement models, proof, process, FAQ (+FAQ JSON-LD), persona nav, dark CTA. |
| `src/pages/WhoWeWorkWithPage.tsx` | `/who-we-work-with` — hero + `PersonaExplorer` + "why clients come to us" + process + CTA. |
| `src/pages/PersonaPage.tsx` | `/who-we-work-with/:slug` — looks up the persona, renders `PersonaDetail` or `NotFoundBlock`. |

All of it composes the existing design system (`components/site/primitives`,
`components/site/Faq`, `Reveal`, `useMeta`) — no new visual language.

## Routing

Both routes are wired in `src/App.tsx` (inside `MarketingSite`, before `/contact`):

```tsx
import { WhoWeWorkWithPage } from "@/pages/WhoWeWorkWithPage";
import { PersonaPage } from "@/pages/PersonaPage";
// ...
<Route path="/who-we-work-with" component={WhoWeWorkWithPage} />
<Route path="/who-we-work-with/:slug" component={PersonaPage} />
```

Persona slugs: `ceos-founders`, `ctos-engineering`, `coos-operations`,
`cmos-marketing`, `product-design`, `content-marketing`.

## Remaining integration (optional)

1. **Home page** — swap the static section for the interactive one:
   `import { WhoWeWorkWith }` → `import { PersonaExplorer as WhoWeWorkWith } from "@/components/who-we-work-with/PersonaExplorer"`.
   The old `src/components/WhoWeWorkWith.tsx` is left untouched.

2. **NavBar** — add a "Who We Work With" entry pointing at `/who-we-work-with`.

3. **Contact context carry-over** — persona CTAs already pass query params:
   `/talk-to-strategist?topic=<TTS topic>&persona=<title>&challenge=<label>`.
   `topic` values match the `TOPICS` list in `TalkToStrategist.tsx`. To pre-select,
   add near the top of that page's form component:

   ```tsx
   useEffect(() => {
     const t = new URLSearchParams(window.location.search).get("topic");
     if (t && TOPICS.some((x) => x.label === t)) { setTopic(t); setStep(2); }
   }, []);
   ```

   The links work without this — they just land on step 1.

## Content that needs real agency input

The spec bars fabricating client names, metrics, engagement terms, and partner
claims, so these use only what the site already publishes:

- **Proof** — mirrors `CaseStudies.tsx`; links go to `/case-studies` (no
  per-study route exists yet). Point `href` at individual studies when they exist.
- **Engagement models** — generic structure; confirm they match the real
  commercial model or edit `ENGAGEMENT_MODELS` in `whoWeWorkWithData.ts`.
- **FAQ answers** — written to be truthful and non-committal; review against how
  the team actually works.
- **No "Technology / ecosystem / stack" section** was built — it needs a real,
  verified list of tools/partners. Add it to `PersonaDetail` when that list exists.
