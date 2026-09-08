"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export function HeroScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -55]);
  return (
    <motion.div
      ref={ref}
      style={{ y: reduced ? 0 : y }}
      className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[850px] flex-col items-center"
    >
      {children}
    </motion.div>
  );
}
