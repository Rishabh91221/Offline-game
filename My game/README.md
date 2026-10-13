# Ramayan: The Eternal Path — Act I (playable)

An original interactive retelling of the Ayodhya Kanda arc. You play Rama through five scenes
(coronation, Kaikeyi's boons, the citizens follow, Sita and Lakshmana, Bharata at Chitrakuta),
in **English and Hindi**. Each choice is weighed on five axes of dharma; the breakdown and tier
are revealed only when the act ends.

## Run
```bash
corepack enable
pnpm install
cp .env.example apps/web/.env.local   # set SESSION_SECRET
pnpm test          # core game logic tests (node:test)
pnpm typecheck
pnpm dev           # http://localhost:3000
pnpm build && pnpm start
```
Needs Node >= 22.18 and pnpm 10. No database or Redis is required for Act I.

## Layout
- `packages/core` — dependency-free game logic: Act I content (en/hi), scoring, injection guard,
  deterministic rubric, server-authoritative state machine. **Tested.**
- `apps/web` — Next.js 15 app. API routes keep progress in an HMAC-signed, httpOnly cookie;
  the server re-derives scores from content, so a client cannot submit its own score.

## Verification status (be honest before shipping)
| Part | Status |
|---|---|
| `packages/core` logic + 23 tests | Run and passing on Node 22 |
| `apps/web`, Dockerfile | **Written but never installed, built or run** — the build environment had no npm access |
| TypeScript typecheck | Not run |
| Accessibility, load, security testing | Not done |

## Before a public release
- Have a Ramayana scholar review all narration and the dharma scoring; the scoring encodes one
  interpretation. No verse is quoted in this build on purpose (the previous draft's citations
  were unreliable).
- Set a strong `SESSION_SECRET`; serve over HTTPS; add rate limiting at your host/CDN.
- Add privacy policy / terms. The app stores only a signed cookie; optional justification text
  is kept in that cookie (not on a server).
- Not included from the original design: AI (Claude/OpenAI) evaluator, accounts, Postgres/Redis,
  other acts, audio/3D. The rubric evaluator is deterministic and keyword-based.


## Offline Android build (modified project)

Gameplay is implemented locally in `apps/web/app/page.tsx` using `packages/core`; it does not call `/api/game/start` or `/api/game/choose`. The original API handlers are preserved in `server-api-backup/` and are not included in the static Next.js route tree. `apps/web/next.config.mjs` uses static export and `capacitor.config.json` points Capacitor at `apps/web/out`.

To prepare Android locally, install Node.js 22.18+ and pnpm 10, install workspace dependencies, build the web export, add/install Capacitor CLI and Android platform, then sync and build the Android project. This ZIP does not include generated `android/` project files or a prebuilt APK.
