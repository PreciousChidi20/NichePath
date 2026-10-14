# NichePath deployment preparation

## Status and target

Prepared target: Vercel's native Next.js integration, repository `PreciousChidi20/NichePath`, root directory `.`, production branch `main`. Node.js **24.x**, npm lockfile installation (`npm ci`), build `npm run build`. No environment variables or secrets are needed. `vercel.json` declares the framework/install/build commands; package engines and `.nvmrc` declare the tested Node major. Keep Vercel's native output configuration; do not set static export or a custom output directory.

Local production is validated separately from cloud deployment. This milestone does not publish anything or verify a public URL. No Vercel CLI, local linked project or deployment credentials were available during preparation. No deployment tool was exposed. These observations do not establish whether the owner's Vercel account already contains a project.

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

## Exact manual Vercel steps

1. Review and merge the Milestone 7 PR into `main` yourself. Check any existing Git-hosting integrations before merging: a previously configured Vercel project may deploy automatically on pushes/merges. This task has not configured such an integration.
2. Review the concrete settings above with the owner and obtain explicit approval to make NichePath public. **Importing a project and clicking Deploy publishes an application. Do not take that publication step before approval.** If a project already exists, inspect its current settings instead of creating a duplicate.
3. After approval, sign into the intended Vercel account/team. Choose Add New → Project, grant access only to the intended GitHub repository and select `PreciousChidi20/NichePath`.
4. Select Next.js, root `.`, Node 24.x in project settings, install `npm ci`, build `npm run build`, and leave output directory at the framework default. Keep the production branch `main`. Add no environment variables. If the account does not offer Node 24.x, stop and resolve the runtime mismatch rather than claiming the tested configuration is supported there.
5. Review whether Git integration will create publicly reachable preview deployments for feature branches. Enable public production/preview automation only within the owner's approval. Do not add analytics or input logging. Apply access protection if the account supports it and the owner wants it; plan availability must be checked in the account.
6. Click Deploy only after approval. Inspect installation/build logs, record the deployed commit and actual URL, then perform the smoke checks below. A green local build is not evidence of a successful Vercel build.
7. Record the URL, commit, publication approval and smoke-test results in PROGRESS.md and the collaboration log through a follow-up review unit. Do not invent a URL or report success before checks complete.

No CLI linking, deployment command, custom domain, GitHub deployment workflow or account integration is executed by this milestone.

## Post-deployment smoke checks (only after approval)

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

If cloud checks fail, do not advertise the URL as verified. In the Vercel dashboard, inspect the deployment and use the project's supported rollback/promote-previous-deployment action if a known-good deployment exists; confirm the target commit and re-run smoke checks. For a first failed deployment, there is no known-good version to promise: correct the issue in a reviewed branch and redeploy only within approval. If withdrawing publication, use the account's access/unpublish controls and verify the resulting access behaviour.

Content changes run structural validation before every build. Perform separate editorial source review and periodically rerun browser/privacy/accessibility checks. No external API budget or secrets are required for the current MVP.
