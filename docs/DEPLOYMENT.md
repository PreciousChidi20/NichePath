# NichePath deployment preparation

## Status and target

Existing live URL: **https://niche-path.vercel.app/**. The owner confirms that GitHub is already connected to Vercel and reports accessing and using the deployed application. Do not create a duplicate project, reconnect GitHub, replace credentials or change production settings as part of this reconciliation.

| Fact | Evidence/status |
| --- | --- |
| Deployment exists and owner has used it | Owner-reported and owner-confirmed; URL supplied above |
| Existing Vercel production branch / deployed Git commit | Not independently established; inspect the existing project's dashboard |
| Milestone 7 included in production | Unknown; branch is not merged into main at this inspection, but the actual production branch is unknown |
| Local production build and journey | Passed during Milestone 7 preparation; separate from the live deployment |
| Live smoke checks, 14 October 2026 | Blocked before application access: curl CONNECT tunnel rejection HTTP 403 (envoy proxy); Chromium `net::ERR_TUNNEL_CONNECTION_FAILED` at the supplied URL |
| Live page, journey, mobile layout, M6 behaviour and deployment metadata | Not verified; no application response reached the test environment |

The failed browser navigation was attempted at 360px. It recorded one failed document request and no application console/page errors; since the app never loaded, this is not evidence of an error-free application. The tunnel's HTTP 403 is not an application HTTP status. No new deployment was performed. Unavailable account access does not imply Vercel is unconfigured.

## Repository configuration and compatibility review

The repository uses native Next.js with root directory `.` and `npm run build` (content validation plus Next build). `vercel.json` declares `framework: nextjs`, `installCommand: npm ci`, and `buildCommand: npm run build`. It introduces no project ID, credentials, routes, output override or integration. These settings match repository scripts and the lockfile and preserve native routing, but existing dashboard overrides have not been inspected.

Milestone 7 adds Node **24.x** in package engines and `24` in `.nvmrc`. Node 24.19.0 was tested locally. This is a new cloud runtime constraint: it may move the next build from the existing Node major to 24 or conflict with account/runtime availability. `.nvmrc` helps local setup; do not assume it establishes the running Vercel runtime. Likewise, repository install/build commands may override different existing dashboard commands. No confirmed conflict can be established without account metadata/build logs. Configuration is left unchanged pending that review, rather than guessing the production runtime.

No environment variables are required by the application. No Vercel CLI, linked project, deployment credentials or account tool was available here; none was requested or replaced. Recommended branch `main` is a proposal, not a verified production setting.

## Local rehearsal before publication

From the repository root with Node 24 and Chromium available:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run validate:content
npm run build
npm run test:e2e
# With the browser suite finished and port 3000 free:
npm run start
```

Follow [HACKATHON_DEMO.md](HACKATHON_DEMO.md) in a browser. Stop only the server you started when finished. No cloud account is required for this rehearsal.

## Existing GitHub-to-Vercel workflow and manual review

1. Open the **existing** NichePath project in the intended Vercel account/team. Record its linked GitHub repository, root directory, configured production branch, current production deployment, deployed commit, Node version and install/build settings. Do not create/import another project. Confirm the URL alias points to the deployment being inspected.
2. Compare those settings/build logs with the repository configuration above. If Node 24 or the install/build commands differ, review the intended runtime/command change with the owner before merging or changing production settings. Record the agreed values; do not change credentials or disconnect GitHub.
3. Review production and preview automation. A push to the configured production branch can trigger a production build and update the production alias; a feature-branch push may trigger a preview, depending on settings. Merging Milestone 7 into `main` may therefore deploy automatically **if main is the configured production branch and automation is enabled**. This task has pushed the existing feature branch as authorised but has not triggered deployment through a dashboard/CLI or observed whether Vercel generated a preview.
4. Review the Milestone 7 PR and explicitly account for any production deployment triggered by merging. Do not merge automatically. Do not change automation/settings or trigger a redeployment without owner approval.
5. For the already existing URL, run the checklist below now: testing the existing application does not require creating or redeploying it. For a later approved deployment, inspect its real cloud build logs and repeat the checklist after it is ready.
6. Record the actual production branch, deployment commit, URL and dated live results in PROGRESS.md. Local successes and owner reports must remain separate from independently executed live checks.

No new project, CLI linking, deployment command, domain change, GitHub deployment workflow or account setting change is executed here.

## Manual live smoke checklist (existing URL; repeat after an approved update)

- Home loads over HTTPS without console exceptions; show the privacy notice and character limit.
- Enter `risk pooling and health insurance`, click Find connections, explicitly confirm Health Systems; only curated identifiers appear in the URL.
- Explore Health financing; check applications, skills, Follow the money, concrete next step, source-review warnings and summary copy/selection fallback.
- Try `epidemiology and health systems`, empty input and `marine biology`; verify multiple/empty/unsupported feedback and supported shortcuts.
- Open all five subjects and a representative niche from each. Reload the homepage: input is empty.
- At 360px and with keyboard-only navigation, verify focus, labels and no horizontal overflow.
- Request `/topics/unknown` and `/topics/health-policy/niches/health-financing`: both should return HTTP 404 with helpful fallback.
- Inspect browser network/storage using a harmless synthetic marker, never private coursework. Confirm no excerpt in requests, URLs, cookies or browser storage. Check hosting observability/third-party additions have not changed these boundaries.
- Follow proposed reference links manually; leave review-required labels until page relevance and associated claims have been checked. External link failures are not fixed by fabricating citations.

## Rollback and maintenance

If cloud checks fail, record the observed application response separately from environment access failures; do not advertise unexecuted checks as verified. In the Vercel dashboard, inspect the deployment and use the project's supported rollback/promote-previous-deployment action if a known-good deployment exists; confirm the target commit and re-run smoke checks. For a first failed deployment, there is no known-good version to promise: correct the issue in a reviewed branch and redeploy only within approval. If withdrawing publication, use the account's access/unpublish controls and verify the resulting access behaviour.

Content changes run structural validation before every build. Perform separate editorial source review and periodically rerun browser/privacy/accessibility checks. No external API budget or secrets are required for the current MVP.
