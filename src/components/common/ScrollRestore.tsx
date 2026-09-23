"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestore() {
  const pathname = usePathname();
  const [veil, setVeil] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      const nav = performance.getEntriesByType?.("navigation") as
        | Array<{ type?: string }>
        | undefined;
      const type = nav?.[0]?.type ?? "";

      if (type !== "reload" && type !== "navigate") return undefined;

      const raw = Number(sessionStorage.getItem(`jabit-scroll:${location.pathname}`));
      const shouldRestore = Boolean(location.hash) || (Number.isFinite(raw) && raw > 0);

      if (!shouldRestore) return undefined;

      history.scrollRestoration = "manual";

      let timer: number | undefined;

      if (!location.hash && raw > 0) {
        const el = document.documentElement;
        const prev = el.style.scrollBehavior;
        el.style.scrollBehavior = "auto";
        window.scrollTo(0, raw);
        el.style.scrollBehavior = prev;

        // On home the site loader covers the screen, so no veil is needed —
        // showing one there would flash white over the loader animation.
        if (pathname !== "/") {
          timer = window.setTimeout(() => {
            setVeil(true);
            setFading(false);
            timer = window.setTimeout(() => {
              setFading(true);
              window.setTimeout(() => {
                setVeil(false);
                setFading(false);
              }, 450);
            }, 350);
          }, 0);
        }
      }

      return () => window.clearTimeout(timer);
    } catch {
      return undefined;
    }
  }, [pathname]);

  if (!veil) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        zIndex: 9998,
        pointerEvents: "none",
        opacity: fading ? 0 : 1,
        transition: "opacity 400ms ease",
      }}
    />
  );
}
