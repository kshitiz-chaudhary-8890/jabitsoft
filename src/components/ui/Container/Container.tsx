import type { ComponentPropsWithoutRef } from "react";

import styles from "./Container.module.css";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "default" | "wide";
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  const classes = [styles.container, styles[size], className].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}
