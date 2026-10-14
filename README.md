# NichePath

A standalone learning companion for online MPH learners, built for the OpenCodex Hackathon **Guidance, Pathways & Opportunity** track. Connect a broad academic interest to a specific niche, practical applications, skills, an achievable activity and a concrete next step.

## Features

- Browser-only topic/question/permitted-excerpt input with a visible character limit, curated word-aware matching and learner confirmation.
- Five subjects: Health Systems, Epidemiology, Biostatistics, Health Policy and Health Promotion; 11 starter niches and 23 concept connections.
- Explained skills, original hypothetical activities, related-interest navigation and illustrative academic/professional domains.
- Copyable curated next-step summaries with keyboard-accessible selection fallback.
- Responsive layouts, including 360px screens, accessible feedback and helpful unsupported/invalid states.

Health Systems is the initial case study, including leadership/governance, financing and workforce. This is illustrative guidance, not an official curriculum or a career recommendation service.

## Setup and local production

Use Node.js 24 (tested with 24.19.0), npm and the existing checkout. `.nvmrc` and `package.json` record the Node major. No environment variables, credentials, database or external services are required.

```sh
git clone https://github.com/PreciousChidi20/NichePath.git
cd NichePath
# If using nvm:
nvm install
nvm use
npm ci
npm run dev
```

Stop the development server before starting production:

```sh
npm run build
npm run start
```

Both listen on port 3000. The build validates content before compiling. The cloud-compatible `.npmrc` uses `/tmp/nichepath-npm-cache`; override with `npm --cache <your-cache-path> ci` if needed.

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run validate:content
npm run build
npm run test:e2e
```

Browser checks require Chromium at `/usr/bin/chromium` or an executable specified by `CHROMIUM_PATH`. If absent, install using the existing Playwright dependency:

```sh
npx playwright install chromium
# Linux may also require system browser libraries:
npx playwright install-deps chromium
CHROMIUM_PATH="$(node -e 'process.stdout.write(require("@playwright/test").chromium.executablePath())')" npm run test:e2e
```

The test configuration intentionally uses an explicit executable. Port 3000 must be free: tests launch a fresh production server themselves. Tests cover desktop/360px journeys, matching, clipboard fallback, strict 404s, keyboard interaction, Axe scans and excerpt privacy. See [QA report](docs/QA_REPORT.md) for scope and limits. Automated scans do not certify accessibility. ESLint 9 is retained for the existing Next.js tooling compatibility; npm reports an upstream deprecation warning.

## Deployment and demo

Vercel is the prepared Next.js deployment target. [Deployment instructions](docs/DEPLOYMENT.md) describe settings, the publication approval boundary, smoke checks and rollback. `vercel.json` preserves native Next.js routing; no static-export or output-directory override is used.

**This work prepares deployment; it does not establish a live application.** Do not publish or enable automatic public deployments without the owner's explicit approval. The [demo script and rehearsal checklist](docs/HACKATHON_DEMO.md) can be used against a local production build first.

## Content and limitations

`data/mph-content.json` is version-controlled starter content. All seven proposed sources and associated claims remain **review-required**: WHO, CDC and NIST link checks were blocked by proxy HTTP 403 in earlier source review. No source quotations, verification dates or academic citations were invented. [Source review](docs/SOURCE_REVIEW.md) lists manual checks, including financing, insurance, risk pooling and resource allocation.

`lib/content-model.ts` checks required fields, ownership, concept/niche relationships and source references. Structural validation does not verify educational accuracy or external availability. Activities use hypothetical examples; pathways do not guarantee jobs or credentials. Learner feedback, source/editorial review and broader assistive-technology/device testing remain outstanding.

## Privacy and future integrations

Submitted text stays in browser memory, clears on reload/leaving the homepage, and is excluded from URLs, storage, logs, network requests and copied summaries. Only curated identifiers enter navigation. Do not submit sensitive, confidential or unauthorised material. Clipboard copying is an explicit user action containing curated guidance only.

Matching uses deterministic aliases and word boundaries, not AI understanding. There is no external AI API, LMS, authentication, database or analytics. Hosting will receive ordinary page requests; never add excerpt logging or analytics to input handling. Typed content, pure matching and UI remain separate for future integrations requiring their own approval and privacy design.

## Development with OpenAI Codex

The owner supplied the product concept and scope. Codex assisted with planning, implementation, verification and review preparation. The [collaboration log](docs/CODEX_COLLABORATION.md) distinguishes session-observed assistance from Git evidence; Git author identity alone does not establish AI authorship. Existing history is preserved.

Before contributing, read [AGENTS.md](AGENTS.md), the [implementation plan](docs/IMPLEMENTATION_PLAN.md) and [progress checkpoint](docs/PROGRESS.md). Milestone branches are reviewed separately; never merge or publish automatically. Remaining improvements beyond this MVP require approval.
