# NichePath

A standalone learning companion that helps students connect academic topics to specific interests, practical activities and actionable next steps. Initial case study: online, self-directed MPH study. Built for OpenCodex Hackathon Track 3: Guidance, Pathways & Opportunity.

## Implemented milestones

Next.js App Router, TypeScript, Tailwind CSS and version-controlled JSON. Milestone 1 established Health Systems starter niches for leadership and governance, financing, and workforce, with six curated concept-to-interest connections.

Milestone 2 supports learning input and deterministic discovery across Health Systems, Epidemiology, Biostatistics, Health Policy and Health Promotion. Enter a topic, question or permitted excerpt, then explicitly confirm a suggested subject. All five subjects also have direct shortcuts. Health Systems retains its complete starter exploration journey; the other four routes are clearly labelled topic overviews with detailed guidance pending. Their niche content is not implemented.

Read `AGENTS.md` before contributing. It records project constraints and the required milestone, validation and PR workflow.

Milestone 3 adds fuller Health Systems niche overviews, explicit concept connections, and curated related-interest navigation with explanations and review-required source references. Topic browsing includes adaptive counts, invalid-concept fallback and no-content states. Existing discovery, activities and pathways are preserved.

See `docs/IMPLEMENTATION_PLAN.md` for the complete M3–M7 roadmap and `docs/PROGRESS.md` for the current checkpoint, checks, delivery status and exact resume instruction. Implement dependent milestones only after their preceding PR is merged into the approved base.

## Run locally

Use Node.js 24 (tested with 24.19.0) and npm. Work in the existing checkout; no separate worktree is needed.

```sh
npm ci
npm run dev
```

Development listens on port 3000. For a production run:

```sh
npm run build
npm run start
```

The repository's `.npmrc` directs npm's cache to `/tmp/nichepath-npm-cache`, which is writable in the cloud environment. Override using `npm --cache <your-cache-path> ci` if needed. No environment variables, credentials, databases or external services are required.

## Validation

```sh
npm run lint
npm run validate:content
npm test
npm run typecheck
npm run build
npm run test:e2e
```

Browser tests start a fresh production server automatically; run the build first and stop any server on port 3000 before testing. They use `/usr/bin/chromium`, or a browser executable supplied through `CHROMIUM_PATH`. Tests run at desktop and 360px mobile sizes. They cover all five subject confirmation and shortcut routes, the three existing niche journeys, ambiguous/empty/unsupported states, character limits, keyboard interaction, layout overflow, and privacy checks including requests, cookies, web storage, IndexedDB, Cache Storage and input reset on reload.

ESLint uses Next.js Core Web Vitals and TypeScript rules with zero warnings allowed. The additional packages are development tooling only; no runtime dependency was added for Milestone 2.

## Content and source status

`data/health-systems.json` contains the labelled starter dataset. These are illustrative categories, not an official university curriculum. Activities are original, hypothetical practice exercises; pathways are illustrative, not employment or qualification promises.

**All starter guidance and sources require editorial review.** Proposed WHO topic pages could not be accessed during implementation: the network proxy returned HTTP 403. URLs are references to review, not verified academic citations. No page quotations, publication details or source-verification dates have been invented. In particular, review the financing connections to health insurance, risk pooling, collection and purchasing against authoritative materials before presenting them as source-backed guidance.

`lib/content-model.ts` defines and validates the typed model. Validation checks fields, HTTPS source URLs, identifiers, topic-niche ownership, concept connections and source references. It runs before every production build. It does **not** establish the accuracy of content or verify source availability. To mark a source verified, first review the page and associated claims, then record its review date and specific review note.

## Privacy and integration boundaries

Submitted text remains in React state on the homepage. Matching is browser-only, using curated phrase aliases with word boundaries. Only known topic and concept identifiers enter navigation URLs. Text is cleared on leaving the homepage or reloading; no excerpts enter persistent storage, logs, analytics or network requests. There is no AI API, authentication, LMS, or remote font loading. Matching identifies possible connections; learners confirm their choice. It does not infer meaning, assess interests or rank careers.

Content access, the typed model, and the pure topic matcher have separate boundaries. Future AI resolution or LMS input can use these boundaries in a later milestone, with a separate privacy design. No integration scaffolding or credentials are added now.

## Next milestone (requires approval)

- Verify authoritative sources and review the starter guidance, including financing and risk pooling.
- Expand curated content to the remaining approved MPH subjects.
- Refine concept connections using learner feedback and perform a fuller accessibility review.
- Consider optional copyable next steps after the core content is reviewed.
