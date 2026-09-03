import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface RevealHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  children?: ReactNode;
}

export default function RevealHeading(
  props: RevealHeadingProps,
): ReactNode;
