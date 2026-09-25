"use client";

import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";

const revealEase = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.2 } as const;
const motionElements = motion as unknown as Record<string, ElementType>;

type RevealOwnProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export type RevealProps<T extends ElementType = "div"> = {
  as?: T;
} & RevealOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps | "as">;

function getRevealVariants(distance: number, delay = 0) {
  return {
    hidden: { opacity: 0, y: distance, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay, ease: revealEase },
    },
  };
}

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  distance = 28,
  ...props
}: RevealProps<T>) {
  const reduced = useReducedMotion();
  const MotionElement =
    typeof as === "string" ? motionElements[as] ?? motion.div : motion.div;

  return (
    <MotionElement
      {...props}
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={viewport}
      variants={getRevealVariants(distance, delay)}
    >
      {children}
    </MotionElement>
  );
}

function getMotionChild(child: ReactNode, index: number, distance: number, delay: number, reduced: boolean | null) {
  if (!isValidElement(child) || typeof child.type !== "string") return child;

  const element = child as ReactElement<Record<string, unknown>>;
  const elementType = element.type as string;
  const MotionChild = motionElements[elementType] ?? motion.div;

  return (
    <MotionChild
      key={element.key ?? index}
      {...element.props}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -5% 0px" }}
      variants={getRevealVariants(distance, delay + Math.min(index * 0.06, 0.18))}
    />
  );
}

export function RevealGroup({
  children,
  className,
  delay = 0,
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div className={className}>
      {Children.map(children, (child, index) =>
        getMotionChild(child, index, distance, delay, reduced),
      )}
    </motion.div>
  );
}
