# Cart system

## Current status

The cart system does not yet exist. The product customizer (`src/app/components/t-shirt/`) produces a `Design` model with `Customization[]` items that are ready to be serialized into a cart line item.

## Data model anchors

| Model | File | Relevant fields |
|---|---|---|
| `Design` | `src/app/model/` | Serializable design state |
| `Customization` | `src/app/model/` | Position, size, text, image per element |
| `OptionProduct` | `src/app/model/` | `basePrice` — use for line item pricing |
| `ProductSize` | `src/app/model/` | Size variant for a product |

## Planned architecture

- `CartService` — `src/app/services/cart.service.ts` — owns cart state and persistence
- `CartDataService` — `src/app/data-service/cart-data.service.ts` — RxJS Subject for cart event broadcasts (item added, quantity changed, cleared)
- Cart UI component — `src/app/components/cart/` — follows standalone component pattern

## Rules for cart implementation

- Persist cart to backend via `CartService`; do not store in `localStorage` unless offline mode is explicitly required
- A cart line item must reference a `Design` snapshot — the design at time of add-to-cart, not a live reference
- Pricing: start from `OptionProduct.basePrice`; apply size/customization uplifts server-side
- Auth required: cart operations must be behind the MSAL guard (user must be signed in)
