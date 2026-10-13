# PR title

feat: implement NichePath milestone 3 niche exploration

# PR description

## Summary

Complete Milestone 3 niche exploration while preserving the existing five-subject discovery flow and Health Systems activities. Add the actionable M3–M7 roadmap and progress tracking for continued implementation through separate reviewable milestones.

## Changes

- Add `docs/IMPLEMENTATION_PLAN.md` with independently testable tasks, acceptance criteria, verification and merge/deployment boundaries for M3–M7.
- Add `docs/PROGRESS.md` for completed features, checks, branch/PR delivery, blockers and exact resume instructions; update AGENTS to require consulting both documents.
- Add fuller overview descriptions and six directed related-interest connections across the three existing Health Systems niches.
- Display academic concept connections and related niches with rationale, validated navigation and explicit source-review labels.
- Preserve concept filtering and topic discovery; add adaptive niche counts, safe invalid-concept fallback, no-content states and navigation to other subject overviews.
- Validate overview fields, related targets, source references, duplicate relationships, self-links and duplicate concept connections.
- Add a generic retry/return error screen without exposing raw error details.
- Add graph, rendered-component and desktop/mobile browser tests, retaining existing activity/discovery/privacy regressions.
- Add no dependencies and preserve the architecture, runtime constraints and existing source-review warnings.

## Files

Added: `docs/IMPLEMENTATION_PLAN.md`, `docs/PROGRESS.md`, this PR description, `app/error.tsx`, `components/niche-connections.tsx`, `lib/exploration.ts`, `tests/exploration.test.ts`, `tests/e2e/exploration.spec.ts`.

Updated: `AGENTS.md`, `README.md`, `app/globals.css`, `app/layout.tsx`, `app/topics/[topicId]/page.tsx`, `app/topics/[topicId]/niches/[nicheId]/page.tsx`, `components/topic-explorer.tsx`, `data/health-systems.json`, `lib/content-model.ts`, `tests/e2e/journey.spec.ts`.

## Verification

- `npm run lint`: passed, zero lint warnings/errors.
- `npm run typecheck`: passed.
- `npm test`: 25 passed, zero failures/skips. Includes malformed relationship rejection, no-content render states, invalid-concept fallback and generic error-detail privacy.
- `npm run build`: passed, including content validation (five subjects, three niches, six concepts, three source records).
- `npm run test:e2e`: 24 passed, zero failures/skips, at desktop and 360px mobile widths. Includes concept-to-niche and related-interest navigation, keyboard interaction, valid destinations, invalid routes/concepts, existing activities and excerpt paste/privacy/reload checks.
- `git diff --check`: passed.

The generic runtime error screen was checked through component rendering; no production content corruption or forced production crash was introduced to test it.

## Limitations and manual review

- Existing and newly drafted Health Systems descriptions/connections require editorial review. WHO references remain proposed, review-required links; no source verification or academic citation is fabricated.
- Health Systems remains the only subject with complete starter niches. The other four retain their honest pending-guidance overviews until M5.
- This PR does not add explained skill objects, copy summaries, additional topic niches, a deployment or any M4–M7 implementation.
- No AI API, LMS, authentication, database or excerpt persistence is included.
- No public preview is deployed for this milestone. Review locally with `npm run dev`: select Risk pooling and insurance, open financing, follow governance/workforce links, then return through a concept link. Check the same flow at 360px.

## Next action

Review and merge this PR into `main` when satisfied. M4 depends on the M3 niche model and navigation and starts from the latest merged base. Do not merge automatically. Resume using the instruction in `docs/PROGRESS.md`.
