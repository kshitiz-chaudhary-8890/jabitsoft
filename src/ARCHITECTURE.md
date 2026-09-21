# Source architecture

The Next.js foundation uses responsibility-based directories and creates them only when they own working code.

- `app/`: App Router layouts, route groups, metadata routes, and route-level boundaries.
- `components/layout/`: shared Header, Footer, and navigation components when Phase 2 begins.
- `components/pages/`: page-owned UI. Each route keeps its sections, local hooks, content, and CSS together.
  - `pages/home/`: homepage composition and sections.
  - `pages/about/`: About page composition and sections.
  - `pages/services/landing/`: the services index page only.
  - `pages/services/details/`: service-detail registry and shared detail types.
  - `pages/services/details/<service-slug>/`: every single-service page owns its content and components.
- `components/ui/`: reusable presentation primitives; currently owns `Container`.
- `components/providers/`: the root provider composition boundary and future interactive providers.
- `features/`: domain workflows such as forms, careers, products, and services when implemented.
- `data/`: typed business data shared by pages, metadata, sitemap generation, and related content.
- `lib/`: framework-independent services and infrastructure helpers; currently owns SEO foundations.
- `hooks/`: reusable client hooks only when browser behavior requires them.
- `types/`: shared domain types only when more than one owner needs them.
- `styles/`: global tokens, animation policy, and small global utilities. Complex sections may use colocated CSS Modules.

The existing JSX application remains in `src/` and continues to run through the `legacy:*` scripts until each approved section is migrated and visually verified.
