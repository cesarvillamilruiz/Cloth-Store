# Cloth-Store

A custom t-shirt ecommerce SPA where users design and order personalised t-shirts.

## What this is

Cloth-Store lets authenticated users build a t-shirt design using a canvas-based designer — adding text, uploading images, choosing clipart, or free-drawing — then purchase it through a shopping cart. Authentication is handled by Azure Active Directory. The project is in active development; the designer is complete and the cart system is being built.

## Tech stack

| Technology | Notes |
|---|---|
| Angular 18 | Standalone components, no NgModules |
| Angular Material | UI components |
| Bootstrap 5 | Grid and utilities |
| Azure MSAL | Azure AD auth |
| RxJS | Shared state via Subjects |
| SCSS | Component-scoped + global theme |
| TypeScript 5.4 | Strict mode |

## Setup

1. Install Node.js 20+
2. `npm install`
3. Copy `src/environments/environment.ts` to `src/environments/environment.local.ts` and fill in local API URLs and Azure AD client IDs
4. `npm start`

## Key commands

```bash
npm start          # Dev server → http://localhost:4200
npm run build      # Production build
npm test           # Unit tests (Karma/Jasmine)
npm run watch      # Build watch mode
```

## Project structure

```
src/app/
  components/         # Feature UI by area (home, t-shirt, customer, shared)
  services/           # HTTP and business logic services
  model/              # TypeScript interfaces
  data-service/       # RxJS Subject-based shared state
  configuration/msal/ # Azure AD OAuth config
  theme/ mixin/       # Shared SCSS variables and mixins
src/environments/     # Per-environment config (local is gitignored)
```

## Contributing

- Branch from `dev`; target PRs at `dev`
- Standalone components only — no NgModules
- State via RxJS Subjects in `data-service/` — no NgRx
- All protected routes must include the MSAL guard
