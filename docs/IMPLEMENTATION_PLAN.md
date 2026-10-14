# NichePath MVP implementation plan: Milestones 3–7

## Scope and continuity

Repository: PreciousChidi20/NichePath. Approved base: latest merged main. Milestones 1–5 are merged (implementation PRs #1, #2, #3, #5 and #6; collaboration documentation PR #4). M6 validates the five-subject, 11-niche catalogue. PROGRESS records actual delivery and prerequisites.

Read `AGENTS.md` and `docs/PROGRESS.md` before work. This plan defines approved scope; PROGRESS records actual results. Use the existing checkout, architecture and dependencies. Do not restart completed tasks. Amend these documents when evidence or user instructions change the plan.

Keep Next.js App Router, TypeScript, Tailwind and version-controlled JSON. No external AI API, LMS, authentication or database. Excerpts stay in transient browser memory, never requests, URLs, cookies, storage, analytics or logs. Educational pathways are illustrative, with no employment or qualification guarantees. Only mark sources verified after reviewing their actual content and associated claims; inaccessible sources remain labelled for review.

## Delivery contract

Each milestone is a separate review unit, branched from current approved `main`. Run lint, TypeScript, relevant unit/integration/browser tests and production build before delivery. Record passed, failed, skipped and unavailable checks honestly. Commit, push and attempt PR creation; retain a copy-ready PR description if API access is blocked. Never merge automatically. Public deployment requires user approval of the concrete target and configuration.

Milestones run in order. M4 uses the M3 niche model/navigation, M5 extends M4 content, M6 validates expanded content, and M7 packages the tested application. Do not stack dependent milestones on an unmerged branch. At a merge boundary, record the blocker and exact resume instruction, then stop until the preceding PR is merged. The user has authorised implementation of M3–M7; a new scope approval is not needed after a prerequisite merge.

## Milestone 3 — Niche Exploration

Branch: `feat/milestone-3-niche-exploration`. PR title: `feat: implement NichePath milestone 3 niche exploration`.

| Task                                       | Acceptance criteria                                                                                                                                                                                | Verification                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| M3.1 Record roadmap and progress           | This document covers M3–M7; PROGRESS identifies completed work, results, Git delivery and blockers; AGENTS links both.                                                                             | Documentation review                     |
| M3.2 Extend the typed niche model          | Niches have fuller overview text and curated related-niche edges with explanations/source references. Invalid targets, self-links, duplicate edges and missing sources fail validation.            | Content unit tests and build validation  |
| M3.3 Browse concepts and niches            | Topic overview preserves discovery and concept filtering; counts adapt to content; no-content states offer a useful route back.                                                                    | Browser tests and component render tests |
| M3.4 Explore related interests             | Each Health Systems niche shows its fuller description, academic concept connections and related niches with rationale. Links use validated topic/niche IDs; source-review labels remain explicit. | Browser navigation tests                 |
| M3.5 Handle invalid inputs and regressions | Unknown/wrong-owner routes return helpful 404s; invalid concept query values do not invent content; discovery, existing activities and privacy checks still pass.                                  | Existing and new tests; lint/type/build  |

No new subject niches or copy-summary feature in M3. Preserve the existing activities and pathway content.

## Milestone 4 — Practical Skills and Pathways

Branch: `feat/milestone-4-practical-pathways`. Suggested PR title: `feat: implement NichePath milestone 4 practical pathways`.

| Task                                | Acceptance criteria                                                                                                                                                                                 | Verification                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| M4.1 Explain skills                 | Each skill has a clear explanation and connection to a practical application; update types/data consistently.                                                                                       | Schema and rendering tests                       |
| M4.2 Strengthen learning activities | Every niche has an achievable activity, objective, steps, time estimate, tangible output and concrete next step. Existing activities remain accessible.                                             | Content checks and niche journey tests           |
| M4.3 Clarify pathways and evidence  | Distinguish academic/professional domains from entry requirements; map supporting references to guidance, with review status visible. Never fabricate citations.                                    | Editorial review and source-reference validation |
| M4.4 Copy next-step summaries       | Copy a selected niche's activity, next step, caveat and source URLs; exclude submitted excerpts. Provide accessible success/failure feedback and selectable fallback when clipboard is unavailable. | Clipboard/failure tests and privacy regressions  |
| M4.5 Deliver review unit            | All required checks pass; PROGRESS and PR description record actual limitations.                                                                                                                    | Full milestone validation                        |

Prerequisite: M3 merged into `main` so the richer niche model and navigation are the approved baseline.

## Milestone 5 — Content Expansion

Branch: `feat/milestone-5-content-expansion`. Suggested PR title: `feat: expand NichePath curated MPH content`.

| Task                              | Acceptance criteria                                                                                                                                                         | Verification                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| M5.1 Curate five subject areas    | Health Systems, Epidemiology, Biostatistics, Health Policy and Health Promotion each have two or three useful niches; retain valid existing content.                        | Dataset inventory and editorial review           |
| M5.2 Complete each niche          | Descriptions, applications, explained skills, activity/output, next step, illustrative pathways, concept connections and source references satisfy the current model.       | Content validation                               |
| M5.3 Curate relationships         | Concept and related-interest links are useful, include rationale, and never point to missing content.                                                                       | Graph/ownership tests                            |
| M5.4 Review authoritative sources | Check source pages and claims where access permits; record actual dates/notes. Inaccessible or unchecked materials stay explicitly review-required, including in summaries. | Manual source review; no fabricated verification |
| M5.5 Activate subject exploration | Replace pending states only for completed content. All five discovery-to-niche routes work on mobile.                                                                       | Parameterised browser tests                      |

Prerequisite: M4 merged. Source access can limit verification but not justify inventing evidence; document remaining editorial review.

## Milestone 6 — Quality Assurance

Branch: `feat/milestone-6-quality-assurance`. Suggested PR title: `test: harden NichePath MVP quality and privacy`.

| Task                                 | Acceptance criteria                                                                                                                                                         | Verification                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| M6.1 Responsive/accessibility review | No overflow at 360px; labelled controls, visible focus, readable contrast, logical headings and keyboard routes across all subjects.                                        | Automated browser tests plus manual review          |
| M6.2 Loading/error/empty states      | Useful loading and retry experiences where asynchronous boundaries exist; unknown content and unsupported input offer safe alternatives. Do not suppress validation errors. | Targeted state tests                                |
| M6.3 Privacy regression              | Real excerpt input/paste stays client-side; reload clears it; requests, URL, cookies and persistent browser storage contain no excerpt. Summaries never include it.         | Privacy browser tests and code review               |
| M6.4 Unit/integration coverage       | Matching, validation, relationships, rendered guidance and summary composition include meaningful failure cases.                                                            | Tests with reported executed counts                 |
| M6.5 Fix implementation defects      | Fix issues introduced by the implementation; all required checks pass or concrete external blockers are documented.                                                         | Lint, typecheck, build, full relevant browser suite |

Prerequisite: M5 merged. Do not substitute trivial checks, disable assertions or claim accessibility certification from automated checks alone.

## Milestone 7 — Deployment and Hackathon Demo

Branch: `feat/milestone-7-deployment-demo`. Suggested PR title: `docs: prepare NichePath deployment and hackathon demo`.

| Task                                   | Acceptance criteria                                                                                                                                                                                                                           | Verification                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| M7.1 Production configuration          | Document one supported Next.js deployment target, Node/runtime requirements, build/start commands and configuration; no secrets committed.                                                                                                    | Production build/start and representative HTTP/browser requests |
| M7.2 Setup/deployment README           | A fresh checkout can follow exact setup, validation and deployment steps; requirements and known limitations are explicit.                                                                                                                    | Execute reproducible local commands                             |
| M7.3 Demo journey and script           | Concise script demonstrates input, ambiguity/unsupported handling, a concept-to-niche connection, activity and next-step summary; includes source-review caveats.                                                                             | Run the scripted journey against production                     |
| M7.4 Review deployment access          | Inspect available tool/configuration metadata without exposing secrets. If access is missing, provide exact manual steps. If available, prepare a concrete deployable configuration and request public-deployment approval before publishing. | Access diagnosis and configuration review                       |
| M7.5 Verify deployment when authorised | After successful deployment, test the actual public URL and report evidence. Otherwise explicitly report no live deployment.                                                                                                                  | Public smoke tests only after approval                          |
| M7.6 Close roadmap                     | Record completed features, checks, Git/PR/deployment state, limitations and future AI/LMS opportunities without implementing them.                                                                                                            | PROGRESS and final report                                       |

Prerequisite verified: M6 merged into main through PR #7 at `cddc069`. M7 prepares native Next.js/Vercel settings, local production rehearsal and manual publication instructions. Public deployment and public-URL verification remain deliberately unexecuted without explicit approval. See PROGRESS.md for actual checks and delivery. Never claim an application is live based on a local server or a prepared configuration.

## Standard validation

From the repository root: `npm run lint`, `npm run typecheck`, `npm test`, `npm run validate:content`, `npm run build`, and `npm run test:e2e`. Browser tests require Chromium and a free port 3000 (see README). Reuse valid installations; use `npm ci` if dependencies need restoration. Add dependencies only when existing tools cannot reasonably meet the task.

## Resume protocol

Read PROGRESS first, verify recorded remote refs against Git, inspect the working tree and complete only unfinished tasks. At a merge boundary: fetch `origin/main`, verify the preceding milestone's files/commit are merged, then create the next named branch from that approved base. Do not merge, reset user work, or recreate completed commits to proceed.
