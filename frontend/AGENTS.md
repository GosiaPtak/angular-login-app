# AGENTS.md

## Project Snapshot
- Angular SPA (`@angular/*` 21.2.x) with a simple login-like flow and route-based pages.
- Entry shell is `src/app/app.component.html`: always renders `app-header` + `router-outlet`.
- UI uses Bootstrap classes from `node_modules/bootstrap/dist/css/bootstrap.min.css` (wired in `angular.json`).

## Architecture That Matters
- Folder intent:
  - `src/app/core/*` = global layout/static pages (`header`, `home`).
  - `src/app/feature/*` = route features (`login-page`).
  - `src/app/shared/*` = reusable bits (`services/login.service.ts`, `page-not-found`).
  - `src/app/models/user.ts` = shared data contract.
- App bootstraps in standalone mode via `src/main.ts` + `src/app/app.config.ts` (`bootstrapApplication`, `provideRouter`, `provideZonelessChangeDetection`).
- Routing source of truth is `src/app/app.routes.ts` (lazy `loadComponent` routes):
  - `'' -> /home`, `/loginPage` with named outlet child `status:auth-state`, technical `/auth-check`, wildcard `** -> PageNotFoundComponent`.

## Login/Data Flow (Cross-File)
- On submit, `login()` pushes form data into `LoginService.setSubmittedData(...)` then navigates to `/auth-check`.
- `LoginService` stores user state in a `signal<User | null>(null)`; `sharedUser` is a `computed` derived from it and is `null` before first submit/after logout.
- `ageGuard` performs age validation and always redirects to `loginPage` named status outlet with `queryParams.status` (`logged-in`, `underage`, `logged-out`).

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
- Form handling lives in the service, not the component — use signals and signal-based forms (`signal` + `computed`).
- The component is a thin shell that calls `service.init()` in `ngOnInit` and exposes `service` to the template.
- Navigation control is implemented with a functional route guard (`ageGuard`) and status outlet on `loginPage`.
- Templates check computed error arrays (e.g., `errors().name.includes('pattern')`) and inline alert blocks.
- Prefer short-circuit evaluation for simple conditional calls and simple conditional assignments (e.g., `isLoggedIn && showDashboard()` or `isLoggedIn && (dashboardVisible = true)`) instead of one-line `if` blocks like `if (isLoggedIn) { showDashboard(); }`.
- Use `inject()` (Angular 19+ style) for all dependency injection — never use constructor parameters for DI (e.g., `private readonly router = inject(Router)` not `constructor(private router: Router)`).
- Use `router.navigate(['/path'])` instead of `router.navigateByUrl('/path')` for all programmatic navigation.
- In all HTML templates use built-in control flow syntax (`@if`, `@for`, `@switch`) — never use structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`). Remove `CommonModule` from `imports` when it was only needed for structural directives.
- Service naming is short (`ls`, `lg` in components); preserve existing `inject()` style when editing nearby code.

## Existing AI Guidance Sources
- Glob scan found project guidance in `AGENTS.md` and `README.md` under `frontend/`; no `.github/copilot-instructions.md`, `CLAUDE.md`, `.cursorrules`, or `.windsurfrules` in this repo.
- Treat this file as the primary agent instruction set for this repository.

