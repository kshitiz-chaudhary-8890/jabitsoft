"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1],
  );
  const reduced = useReducedMotion();
  return (
    <span className="relative inline-block">
      <span className="text-[#d2d8dd]">{word}</span>
      <motion.span
        style={{ opacity: reduced ? 1 : opacity }}
        className="absolute inset-0"
      >
        {word}
      </motion.span>
    </span>
  );
}

export function ScrollHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 45%"],
  });
  const text = "One team. From first idea to what’s next.";
  const words = text.split(" ");
  return (
    <h2
      ref={ref}
      id="intro-heading"
      aria-label={text}
      className="text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.13] tracking-[-0.05em]"
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index} className={index >= 6 ? "text-action" : "text-ink"}>
            <Word
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
            />
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </h2>
  );
}
