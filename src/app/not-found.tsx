import { Container } from "@/components/ui/Container/Container";

export default function NotFound() {
  return (
    <main id="main-content">
      <Container className="system-message">
        <h1>Page not found</h1>
        <p>The requested page is not available.</p>
      </Container>
    </main>
  );
}
