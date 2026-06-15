# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo with two independent apps:

- `frontend/` — Angular 22 SPA (standalone, zoneless, signals-based)
- `backend/` — Node.js/Express REST API with JWT auth

Each has its own `package.json` and `node_modules/`. Commands must be run from the respective subdirectory.

## Commands

### Frontend (`cd frontend`)
```
yarn install
yarn start        # ng serve → http://localhost:4200
yarn build        # production build → dist/login-app/
yarn test         # Karma + Jasmine, Chrome launcher
yarn lint
```
To run a single spec: `yarn test --include=src/app/path/to/file.spec.ts`

### Backend (`cd backend`)
```
npm install
npm start         # node server.js → http://localhost:3000
```
The backend requires `JWT_SECRET` in `backend/.env` — the server exits on startup if missing.

Backend API endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile` (JWT-protected).

**Note:** The backend uses an in-memory array for users — data is lost on server restart. No database is wired up yet.

## Frontend Architecture

The app bootstraps in standalone mode via `src/main.ts` + `src/app/app.config.ts` (`bootstrapApplication`, `provideRouter`, `provideZonelessChangeDetection`).

**Folder intent:**
- `src/app/core/` — global layout/static pages (`header`, `home`)
- `src/app/feature/` — route-level feature components (`login-page`)
- `src/app/shared/` — reusable pieces: `services/login.service.ts`, `guards/age.guard.ts`, `status/auth-status.component.ts`, `page-not-found/`
- `src/app/models/user.ts` — shared `User` data contract

**Routing** (`app.routes.ts`): all routes use lazy `loadComponent`. The `/login` route has a named outlet child (`status:auth-state`) that renders `AuthStatusComponent`. The `/auth-check` route is always intercepted by `ageGuard`, which redirects to `/login` with a `status` query param (`logged-in`, `underage`, `logged-out`).

## Login/Data Flow (Cross-File)

1. `LoginPageComponent` is a thin shell — it calls `LoginPageService.init()` in `ngOnInit` and exposes the service to the template.
2. Form state and validation live entirely in `LoginPageService` (signals + computed).
3. On submit, `LoginPageService.login()` stores form data in the singleton `LoginService` (signal-based), then navigates to `/auth-check`.
4. `ageGuard` reads `LoginService.getCurrentUser()`, sets the underage-blocked flag if needed, and always redirects to the `login` status outlet with the appropriate `queryParams.status`.
5. `AuthStatusComponent` reads `status` from `ActivatedRoute.queryParamMap` (via `toSignal`) and displays a Bootstrap alert.

## Coding Conventions

These apply to all frontend code:

- **DI:** always use `inject()` — never constructor parameters (`private readonly router = inject(Router)`).
- **Templates:** use built-in control flow (`@if`, `@for`, `@switch`) — never structural directives (`*ngIf`, `*ngFor`). Remove `CommonModule` when it was only needed for those directives.
- **Navigation:** use `router.navigate(['/path'])` — not `router.navigateByUrl()`.
- **Conditionals:** prefer short-circuit evaluation (`isLoggedIn && showDashboard()`) over one-line `if` blocks.
- **Service naming:** short aliases in components (`ls`, `lg`) — follow the existing style in nearby code.
- **Forms:** form logic (state, validation, submission) belongs in the service, not the component. Use `signal` + `computed` for reactive form state.
- UI is Bootstrap 5 via `ng-bootstrap`; classes are applied directly in templates.