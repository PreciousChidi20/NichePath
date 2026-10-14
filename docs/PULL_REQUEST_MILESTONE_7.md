# PR title

docs: prepare NichePath deployment and hackathon demo

# PR description

## Summary

Complete Milestone 7 deployment/demo preparation from merged Milestone 6 (PR #7). Prepare the existing MVP for a reviewed Vercel deployment without publishing or merging automatically.

## Changes made

- Add native Next.js Vercel framework, install and build settings; record Node 24 in `.nvmrc`, package engines and lockfile; ignore local `.vercel/` metadata. No dependencies or application behaviour changed.
- Rewrite README with implemented features, reproducible setup/testing, privacy boundaries, limitations and deployment/demo links.
- Add `docs/DEPLOYMENT.md` with exact manual settings, publication approval boundary, post-deployment smoke checks and rollback guidance.
- Add `docs/HACKATHON_DEMO.md` with a three-minute learner journey, rehearsal checklist and Guidance, Pathways & Opportunity explanation.
- Update implementation/progress and Codex collaboration records with verified M6 merge evidence and actual M7 results.
- Save this copy-ready description in `docs/PULL_REQUEST_MILESTONE_7.md`.

## Testing and build results

- Clean `npm ci`: passed on Node 24.19.0/npm 11.9.0.
- Lint (zero warnings), TypeScript, content validation and production build: passed.
- Unit/component tests: 33 passed, no failures/skips.
- Browser tests: 44 passed across desktop/360px, including accessibility, keyboard, privacy and strict 404 checks.
- Exact scripted demo rehearsed against local production at 1280px and 360px: matching/confirmation, financing, activity/next-step summary copy, source caveats, related governance, ambiguity and unsupported input passed.
- `git diff --check`: passed.

## Known limitations / manual review

- No public deployment or cloud build executed; no live URL claimed. Owner approval is required before publication. Check account runtime availability and any existing deployment automation before merging/importing.
- No Vercel CLI, linked project, deployment credentials or deployment tool were available here; use the manual instructions.
- All seven proposed sources/associated claims remain review-required; prior WHO/CDC/NIST checks were blocked by proxy 403. Structural validation does not establish educational accuracy.
- Automated Chromium/Axe checks do not certify accessibility or replace broader device/assistive-technology review.
- Existing ESLint 9 upstream deprecation warning remains; no unrelated dependency upgrade included.

## AI Collaboration

The project owner supplied the concept, scope and explicit no-merge/no-publication constraint. OpenAI Codex assisted in this session with baseline verification, configuration and documentation preparation, production demo rehearsal, automated checks and GitHub review preparation. `docs/CODEX_COLLABORATION.md` separates session-observed assistance from repository evidence. Git identity alone does not prove AI authorship; no shareable task URL/ID is available. Existing commits were not rewritten.

## Preview details

Demo validated locally at desktop and 360px. No public preview URL or new screenshot artifact is claimed. Follow the demo script against the local production build; publish only after explicit approval.
