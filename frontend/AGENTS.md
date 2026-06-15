# AGENTS.md

## Project Snapshot
- Angular SPA (`@angular/*` 17.3) with a simple login-like flow and route-based pages.
- Entry shell is `src/app/app.component.html`: always renders `app-header` + `router-outlet`.
- UI uses Bootstrap classes from `node_modules/bootstrap/dist/css/bootstrap.min.css` (wired in `angular.json`).

## Architecture That Matters
- Folder intent:
  - `src/app/core/*` = global layout/static pages (`header`, `home`).
  - `src/app/feature/*` = route features (`login-page`).
  - `src/app/shared/*` = reusable bits (`services/login.service.ts`, `page-not-found`).
  - `src/app/models/user.ts` = shared data contract.
- Routing is centralized in `src/app/app-routing.module.ts`:
  - `'' -> /home`, `/loginPage`, technical `/auth-check`, wildcard `** -> PageNotFoundComponent`.

## Login/Data Flow (Cross-File)
- `LoginPageComponent` (`src/app/feature/login-page/login-page.component.ts`) builds a reactive form and dynamically applies validators in a `valueChanges` subscription.
- On submit, `login()` pushes form data into `LoginService.setSubmittedData(...)` then navigates to `/auth-check`.
- `LoginService` stores state in a `BehaviorSubject<User>` and exposes `sharedUser` observable.
- `ageGuard` performs age validation and redirects to `loginPage` status outlet with proper auth status.

## Developer Workflows
- Install/run:
  - `yarn install`
  - `yarn start` (same as `ng serve`, default `http://localhost:4200`)
- Build/test/lint:
  - `yarn build`
  - `yarn test` (Karma + Jasmine, Chrome launcher)
  - `yarn lint`
- Production build: `ng build --configuration production` (or `--prod` alias from older docs).
- E2E note: repo still contains `e2e/` + `protractor.conf.js`, but no `yarn e2e` script in current `package.json`.

## Project-Specific Conventions
- Reactive forms style: validators are conditionally attached during typing, not only at form init.
- Navigation control is implemented with a functional route guard (`ageGuard`) and status outlet on `loginPage`.
- Templates often check explicit statuses (e.g., `control.status === 'INVALID'`) and inline error blocks.
- Service naming is short (`ls`, `lg` in components); preserve existing constructor injection style when editing nearby code.

## Existing AI Guidance Sources
- Glob scan found only `README.md`; no existing `.github/copilot-instructions.md`, `CLAUDE.md`, or prior `AGENTS.md`.
- Treat this file as the primary agent instruction set for this repository.

