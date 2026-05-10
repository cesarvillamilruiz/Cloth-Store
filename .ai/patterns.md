# Project patterns

Org-level coding standards are enforced via hooks. The patterns below extend them for this project.

## Standalone components

All components use `standalone: true` with explicit `imports: []`. There are no NgModules.
Reference: `src/app/components/shared/button/` for a minimal example.

## Routing

Routes are declared in `app.routes.ts`. Every protected route must include the MSAL guard from `@azure/msal-angular`. Check `src/app/configuration/msal/msal.config.ts` for the guard setup before adding routes.

## State pattern

Cross-component state uses RxJS Subjects housed in `src/app/data-service/`. Each data-service file exposes typed `Subject` or `BehaviorSubject` instances and no other logic.

- `ApplicationDataService` — design lifecycle events (`saveDesign$`, `deleteCurrentDesign$`)
- `ProductDataService` — product events (`setTShirtColor$`)

New shared state: add a Subject to the appropriate existing data-service or create a new file in `data-service/` following the same pattern. Do not add state logic to components or HTTP services.

## HTTP services

Services in `src/app/services/` handle all HTTP and business logic. They are injected `providedIn: 'root'`. Each service owns one domain (user, address, blob, etc.). See `src/app/services/user.service.ts` for the standard pattern.

## SCSS

- Component-specific styles: in the component's own `.scss` file
- Shared variables: `src/app/theme/` — import these, do not hardcode values
- Shared mixins: `src/app/mixin/` — import before use in component SCSS
- Bootstrap grid and utilities are available globally

## Legacy patterns

None identified yet. Document here if legacy code is found that cannot be refactored.
