"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container/Container";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content">
      <Container className="system-message">
        <h1>Something went wrong</h1>
        <p>Please try loading this page again.</p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </Container>
    </main>
  );
}
