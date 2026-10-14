# PR title

feat: implement NichePath milestone 4 practical pathways

# PR description

## Summary

Complete Milestone 4 on the merged Milestone 3 baseline: explain practical skills, clarify illustrative pathways and evidence context, and let learners take a curated activity and next step with them. Preserve the existing discovery and related-interest journeys.

## Changes

- Convert nine Health Systems skills into typed explanations linked to practical applications.
- Preserve the original achievable activities; add reflection prompts and tangible next-step outputs.
- Distinguish academic exploration and professional domains, with explicit entry-requirement and employment caveats.
- Map applications/skills, activity/next-step and pathway context to proposed source references. Clearly distinguish original hypothetical exercises from published material.
- Compose summaries exclusively from curated topic/niche/source fields, including activity steps, output, next step, references and review limitations. No excerpt or query input enters the composer.
- Add explicit clipboard copying, accessible status feedback and a selectable read-only fallback for unavailable or denied clipboard access.
- Validate skill/application indices, evidence coverage and source references; update unit and desktop/mobile browser coverage.
- Update README, implementation plan and progress records. No dependencies or unapproved subject content added.

## Files

Added: `components/next-step-summary.tsx`, `lib/summary.ts`, `tests/pathways.test.ts`, `tests/e2e/pathways.spec.ts`, this PR description.

Updated: `README.md`, `app/topics/[topicId]/niches/[nicheId]/page.tsx`, `components/topic-explorer.tsx`, `data/health-systems.json`, `lib/content-model.ts`, `docs/IMPLEMENTATION_PLAN.md`, `docs/PROGRESS.md`.

## Verification

- Lint: passed, zero warnings/errors.
- TypeScript: passed.
- Unit/component tests: 31 passed; zero failures/skips.
- Production build: passed, including content validation.
- Browser tests: 32 passed; zero failures/skips at desktop and 360px mobile widths.
- Git whitespace checks: passed.

Coverage includes actual clipboard copy, missing/denied clipboard fallback, keyboard controls, explained skills, evidence validation, summary ownership/references, excerpt exclusion, request/storage privacy and all previous discovery/exploration regressions.

## Known limitations and manual review

- WHO governance, financing and workforce pages were retried and returned proxy HTTP 403. Guidance and references remain explicitly review-required; no source verification or citations are fabricated.
- References provide proposed educational background, not validation of the original exercises or endorsement of programmes, credentials or jobs.
- Only the three Health Systems niches are expanded in this milestone. Other subject niche content waits for M5.
- Copying writes the curated summary to the device clipboard only after explicit action; clipboard permissions vary, so manual selection is available.
- No AI API, LMS, authentication, database, public deployment or M5–M7 work is included.

No new public preview or screenshots are included. Review locally with `npm run dev`: follow risk pooling to financing, read the skill explanations and evidence notes, copy the next steps and inspect the review caveat/source URLs. Check mobile layout and manual selection.

## Next action

Review and merge into `main` when satisfied. M5 starts from the merged M4 content model. Follow `docs/PROGRESS.md`; do not merge automatically.
