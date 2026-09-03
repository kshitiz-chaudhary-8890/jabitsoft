# Provider boundary

`AppProviders` is the single composition point for application-wide providers.

- Add `SmoothScrollProvider` only during the approved Lenis migration. It must own the site's one global Lenis instance and respect reduced motion.
- Add `ModalProvider` when the shared modal and forms work begins. It must implement accessible focus management before use.
- Do not make the root layout a Client Component; keep each interactive provider as a small client boundary.
