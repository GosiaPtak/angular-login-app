# LoginApp

This is an Angular-based login application. The project provides a foundation for authentication and user management in a web environment.

## Overview

LoginApp is built with [Angular](https://angular.io/) and uses [Bootstrap](https://getbootstrap.com/) for styling. It features a modular structure with core components, shared services, and feature-based pages.

## Tech Stack

- **Framework**: Angular 19.2.19
- **Styling**: Bootstrap 5.3.2, @ng-bootstrap/ng-bootstrap 19.0.1
- **Language**: TypeScript
- **Package Manager**: Yarn
- **Testing**: Jasmine, Karma

## Requirements

- [Node.js](https://nodejs.org/) (Recommended: LTS)
- [Yarn](https://yarnpkg.com/) package manager
- [Angular CLI](https://angular.io/cli) (optional, but recommended for development)

## Setup and Run

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd login-app
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Development server**:
   Run `yarn start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

4. **Build**:
   Run `yarn build` or `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Available Scripts

- `yarn start`: Runs the app in development mode.
- `yarn build`: Builds the app for production.
- `yarn test`: Executes unit tests via Karma.
- `yarn lint`: Runs the linter to check code quality.
- `yarn ng`: Accesses the Angular CLI.

## Project Structure

```text
src/
├── app/
│   ├── core/           # Singleton services and components (e.g., Header, Home)
│   ├── feature/        # Feature-specific modules and components (Page1, Page2)
│   ├── shared/         # Reusable components and services (Login service)
│   ├── models/         # TypeScript interfaces and classes (User model)
│   ├── app-routing.module.ts
│   └── app.module.ts
├── assets/             # Static assets like images
├── environments/       # Environment-specific configurations
├── main.ts             # Application entry point
└── styles.css          # Global styles
```

## Environment Variables

Currently, the project uses Angular environment files located in `src/environments/`.
- `environment.ts`: Development configuration.
- `environment.prod.ts`: Production configuration.

## Tests

- **Unit Tests**: Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- **End-to-End Tests**: (TODO: Update E2E configuration, as `e2e` folder exists but Protractor is deprecated in newer Angular versions).

## TODOs

- [ ] Add license information.
- [ ] Implement/Update end-to-end tests (migrate from Protractor if necessary).
- [ ] Add specific environment variable requirements (e.g., API base URL).
- [ ] Document deployment process.

## License

TODO: Add License (e.g., MIT).
