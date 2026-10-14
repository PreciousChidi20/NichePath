# PR title

feat: expand NichePath curated MPH content

# PR description

## Summary

Complete Milestone 5 content expansion on the verified merged M1–M4 baseline. All five agreed MPH subjects now support full curated niche exploration, activities, pathways and next-step summaries. Source access was attempted but independent claim verification remains explicitly pending.

## Changes

- Preserve the three Health Systems niches; add two niches each for Epidemiology, Biostatistics, Health Policy and Health Promotion (11 total).
- Supply descriptions, practical applications, explained skills, achievable hypothetical activities, reflection/output, concrete next steps, illustrative pathways and evidence mappings for every niche.
- Add 23 total concepts, useful cross-topic links and an explicit Health Systems resource-allocation connection; retain insurance/risk-pooling distinctions.
- Rename the widened JSON dataset to `data/mph-content.json` and update all consumers.
- Activate every subject's existing exploration route and update guidance-availability copy. Preserve discovery confirmation, focused concept navigation, related interests, clipboard fallback and excerpt privacy.
- Attempt all seven proposed WHO/CDC/NIST source destinations with TLS verification. Record proxy 403 responses and a manual claim-review checklist in `docs/SOURCE_REVIEW.md`; retain review-required status and null review dates.
- Update documentation/progress/collaboration records and parameterise tests for the expanded catalogue. No dependencies or AI/LMS/authentication integration added.

## Files

Dataset: `data/health-systems.json` renamed/expanded as `data/mph-content.json`.

Application/consumers: `app/page.tsx`, `app/not-found.tsx`, `app/topics/[topicId]/page.tsx`, `app/topics/[topicId]/niches/[nicheId]/page.tsx`, `lib/content.ts`, `scripts/validate-content.ts`.

Tests: content, matching, exploration and pathway unit tests; discovery/exploration/journey browser tests; new `tests/e2e/content-expansion.spec.ts`.

Documentation: README, implementation plan, progress, Codex collaboration log, source-review checkpoint and this PR draft.

## Testing and build results

- Content validation: passed (five subjects, 11 niches, 23 concepts, seven source records).
- Lint and TypeScript: passed.
- Unit/component tests: 33 passed; no failures/skips.
- Production build: passed; all 11 niche paths built.
- Desktop/360px browser tests: 34 passed; no failures/skips, including all subject-to-niche-to-summary journeys and existing clipboard/paste/privacy regressions.
- Git whitespace and relative documentation links: checked.

An initial browser run had two failures from a stale unfiltered-list expectation after a confirmed concept match. Tests now verify the intended focused result, clearing to the complete list and direct subject navigation; the final suite passes.

## Known limitations

Every external source request returned proxy HTTP 403. Publisher/reference URLs are proposed educational context, not independently verified support for specific claims. All relevant UI and copied summaries flag review requirements. Official page accessibility, precise relevance and educational framing need manual review before authoritative use; no citations, quotations, review dates or opportunities were fabricated.

Activities use fictional examples and pathways describe illustrative domains, not eligibility or guaranteed outcomes. No public deployment or M6/M7 implementation is included. M6 depends on this expanded dataset being merged into the approved base.

## AI Collaboration

The owner defined NichePath and authorised this scope. Codex inspected merged history and actual implementation, drafted eight new hypothetical starter niches and curated connections, updated JSON consumers/tests, attempted source access, documented limitations, ran validation and prepared the branch/PR materials. Session involvement is documented in `docs/CODEX_COLLABORATION.md`; Git identities alone do not prove AI authorship. No shareable Codex task URL/ID is available. Commit/push/PR outcomes are recorded only after tool confirmation in PROGRESS.

## Manual review

Run `npm run dev`, enter a supported subject or question, confirm it, explore both new niches and copy a next-step summary. Check cross-topic links, source-review flags and the 360px layout. Review `SOURCE_REVIEW.md` before treating the educational guidance as authoritative. No public preview is deployed. Review and merge when satisfied; do not merge automatically.
