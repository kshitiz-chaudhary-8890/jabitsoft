# Source architecture

The Next.js foundation uses responsibility-based directories and creates them only when they own working code.

- `app/`: App Router layouts, route groups, metadata routes, and route-level boundaries.
- `components/layout/`: shared Header, Footer, and navigation components when Phase 2 begins.
- `components/sections/`: visually complete reusable page sections as they are migrated.
- `components/ui/`: reusable presentation primitives; currently owns `Container`.
- `components/providers/`: the root provider composition boundary and future interactive providers.
- `features/`: domain workflows such as forms, careers, products, and services when implemented.
- `data/`: typed business data shared by pages, metadata, sitemap generation, and related content.
- `lib/`: framework-independent services and infrastructure helpers; currently owns SEO foundations.
- `hooks/`: reusable client hooks only when browser behavior requires them.
- `types/`: shared domain types only when more than one owner needs them.
- `styles/`: global tokens, animation policy, and small global utilities. Complex sections may use colocated CSS Modules.

The existing JSX application remains in `src/` and continues to run through the `legacy:*` scripts until each approved section is migrated and visually verified.
