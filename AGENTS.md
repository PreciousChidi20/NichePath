# NichePath project instructions

## Project identity

- Project: NichePath.
- Hackathon track: Guidance, Pathways & Opportunity.
- Purpose: help learners discover specific academic interests and connect them to practical applications, relevant skills, learning activities and actionable next steps.
- Initial audience: online MPH learners.
- Future direction: adaptable to other academic disciplines and learning environments.

## Technology

Use Next.js App Router, TypeScript, Tailwind CSS, version-controlled JSON content and GitHub source control. Follow the existing architecture and conventions. Work in the existing isolated checkout; do not create a worktree unless the user asks.

## Product principles

- Support exploration, not rigid career recommendations.
- Connect broad topics to specific interests and real-world applications.
- Prioritize credible, source-backed guidance.
- Provide concrete, achievable learning activities.
- Keep the interface mobile-friendly, accessible and lightweight.
- Do not invent citations, opportunities, credentials or professional guarantees.
- Preserve explicit source-review warnings until the associated sources and claims have actually been verified.

## MVP constraints

- No external AI API or LMS integration.
- No authentication or database without approval.
- No unnecessary dependencies.
- No storage or transmission of submitted coursework excerpts: input must stay in browser memory, never in URLs, cookies, browser storage, server actions, APIs, analytics or logs.
- Clear coursework input on reload.
- Do not present deterministic keyword matching as AI understanding.
- Do not implement unapproved future milestones.

## Engineering practices

- Inspect before modifying; preserve working functionality.
- Use TypeScript types and reusable components.
- Keep matching logic separate from UI components (`lib/matching.ts`).
- Validate content and relationships (`lib/content-model.ts`).
- Handle empty, ambiguous and unsupported inputs.
- Write or update relevant tests.
- Maintain responsive design, including 360px screens, and keyboard accessibility.
- Health Systems is the initial case study. The agreed discovery subjects are Health Systems, Epidemiology, Biostatistics, Health Policy and Health Promotion.
- Supporting a topic in discovery does not imply its detailed niche guidance is complete; label pending content clearly.

## Permanent milestone workflow

For every future milestone:

1. Read this AGENTS.md before implementing changes.
2. Confirm the correct repository (`PreciousChidi20/NichePath`) and base branch (normally `main`, verify remotely).
3. Create a dedicated milestone feature branch where supported.
4. Implement only the approved milestone.
5. Run lint, TypeScript, automated tests and production build checks.
6. Fix implementation-related failures.
7. Commit changes on the feature branch where supported.
8. Push the branch and open a GitHub pull request if the environment permits.
9. If automatic PR creation is unavailable, prepare changes using the available GitHub workflow and provide exact manual steps.
10. Never merge automatically.
11. Never start another milestone without approval.

Validation commands: `npm run lint`, `npm run typecheck`, `npm test`, `npm run validate:content`, `npm run build`, then `npm run test:e2e`. Browser tests require a free port 3000 and Chromium (see README). Keep command exit statuses intact; report failures, skipped checks and unavailable checks accurately.

## Mandatory final report for every milestone

Always provide:

**A. Implementation summary:** features implemented, files created/modified and key technical decisions.

**B. Verification results:** lint status, TypeScript status, test results, production build status and any checks that could not run.

**C. GitHub delivery status:** repository, base branch, feature branch, commit hash if available, whether the branch was pushed, PR URL if created and any manual steps needed.

**D. Copy-ready pull request:** a complete title and Markdown description covering summary, changes, testing, known limitations and screenshots/preview details when available. Describe completed work accurately rather than planned work.

**E. Next steps:** outstanding issues and the recommended next milestone, without implementing it.

Never claim a branch, commit, push or PR exists unless the operation actually succeeded. If the user specifies a report format, include these elements in that format.
