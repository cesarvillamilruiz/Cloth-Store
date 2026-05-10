# Project TODO

Tasks that need doing but aren't yet in the sprint backlog.
When picking up an item, move it to a ticket and remove it here.

## Cart

- [ ] Define `CartItem` and `Cart` TypeScript interfaces in `src/app/model/`
- [ ] Implement `CartService` with add, remove, update quantity, clear methods
- [ ] Implement `CartDataService` RxJS Subject for cart event broadcasts
- [ ] Build cart UI component (`src/app/components/cart/`)
- [ ] Wire cart icon/badge into header with live item count
- [ ] Add MSAL guard to cart and checkout routes

## Checkout

- [ ] Design checkout flow (address selection → order summary → payment)
- [ ] Integrate with backend order API
- [ ] Add order confirmation page/component

## General

- [ ] Replace Angular CLI README.md boilerplate with real project README
- [ ] Add `env.local.ts` example to onboarding docs (file is gitignored)
- [ ] Write unit tests for `CartService` once implemented
