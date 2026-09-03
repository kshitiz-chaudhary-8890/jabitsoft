import type { ReactNode } from "react";

import { SmoothScrollProvider } from "./SmoothScrollProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
