# Cloth-Store — AI session context

<!-- Keep this file under 120 lines. Extract overflow to .ai/ and link it here. -->

## Project overview

Cloth-Store is a standalone Angular 18 SPA for a custom t-shirt ecommerce platform. Users authenticate via Azure AD, design custom t-shirts using a canvas-based designer (text, images, clipart, drawing), and will checkout via a shopping cart. The project currently has a working product customizer and user auth; cart and order flows are under active development.

## Tech stack

| Technology | Version | Notes |
|---|---|---|
| Angular | 18.2.3 | Standalone components, no NgModules |
| Angular Material | 18.2.3 | UI component library |
| Bootstrap | 5.3.3 | Grid and utility classes |
| Azure MSAL | 4.x | Primary auth (Azure AD) |
| RxJS | 7.8.0 | State via Subjects — no NgRx |
| TypeScript | 5.4.5 | Strict mode enabled |
| SCSS | — | Component-scoped + global theme |
| ngx-dropzone | 3.1.0 | File/image uploads |
| Karma + Jasmine | — | Unit testing |

## Directory structure

```
src/app/
  components/         # Feature UI components
    home/             # Landing, header, footer
    t-shirt/          # Designer: color, text, image, clipart, draw
    customer/         # Profile, addresses, contact prefs
    shared/           # Reusable: button, dialog, spinner
  services/           # HTTP + business logic
  model/              # TypeScript interfaces
  data-service/       # RxJS Subject-based shared state
  enum/               # Type-safe enums
  validation/         # Form validation logic
  configuration/msal/ # Azure AD OAuth config
  theme/              # Global SCSS variables
  mixin/              # SCSS mixins
src/environments/     # env.ts, env.prod.ts, env.local.ts
```

## Key commands

```bash
npm start          # Dev server → http://localhost:4200
npm run build      # Production build (ESBuild)
npm run watch      # Build watch mode (development)
npm test           # Karma/Jasmine unit tests
```

## Critical rules

- **Standalone components only** — no NgModules; all components use `standalone: true`
- **State via RxJS Subjects** — use `data-service/` pattern for cross-component state; do not introduce NgRx
- **SCSS scoping** — component styles go in the component's `.scss` file; use `theme/` variables and `mixin/` mixins
- **Auth guard** — all routes except `/home` must be behind the MSAL guard; check `configuration/msal/` before adding routes
- **No cart service exists yet** — building `CartService` is in-progress; do not assume it exists
- **env.local.ts is gitignored** — local API URLs and secrets go there, never in `env.ts`

## Reference documentation

| Task | Read this file |
|---|---|
| Adding a new route | [.ai/patterns.md](.ai/patterns.md) — routing section |
| Adding cross-component state | [.ai/patterns.md](.ai/patterns.md) — state pattern section |
| Auth / MSAL config | `src/app/configuration/msal/msal.config.ts` |
| Adding a new HTTP service | [.ai/patterns.md](.ai/patterns.md) — service pattern section |
| Designer canvas logic | `src/app/components/t-shirt/` |
| Data models / interfaces | `src/app/model/` |
| Cart system design | [.ai/cart.md](.ai/cart.md) |
| Environment config | `src/environments/` |

## Session resume

1. Read this file first
2. Read [.ai/patterns.md](.ai/patterns.md) to understand architectural conventions
3. Read [.ai/cart.md](.ai/cart.md) if working on cart or checkout flows
4. Check TODO.md for open tasks before starting new work
