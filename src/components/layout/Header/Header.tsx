"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import jabitLogo from "@/assets/jabit-logo.png";

import { HeaderMenu } from "./HeaderMenu";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const track = useRef({ lastY: 0, acc: 0, hidden: false, init: false });
  track.current.hidden = hidden;

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const t = track.current;
    if (!t.init) {
      t.lastY = window.scrollY;
      t.init = true;
    }
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 60);
      const dy = y - t.lastY;
      t.lastY = y;
      if (y <= 240) {
        t.acc = 0;
        if (t.hidden) {
          t.hidden = false;
          setHidden(false);
        }
        return;
      }
      t.acc += dy;
      if (!t.hidden && t.acc > 10) {
        t.hidden = true;
        t.acc = 0;
        setHidden(true);
      } else if (t.hidden && t.acc < -8) {
        t.hidden = false;
        t.acc = 0;
        setHidden(false);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        className={`site-nav ${styles.header} ${isHome ? styles.homeOverlay : ""} ${
          isHome && solid ? styles.homeSolid : ""
        } ${hidden ? styles.headerHidden : ""}`}
      >
        <div className={styles.bar}>
          <Link className={styles.logo} href="/" aria-label="JabitSoft home">
            <Image
              src={jabitLogo}
              alt=""
              width={781}
              height={200}
              preload
              sizes="(max-width: 560px) 136px, (max-width: 1153px) 138px, (max-width: 1446px) 11.5vw, 172px"
            />
          </Link>
          <HeaderMenu />
        </div>
      </header>
      {!isHome && <div className={styles.headerSpacer} aria-hidden="true" />}
    </>
  );
}
