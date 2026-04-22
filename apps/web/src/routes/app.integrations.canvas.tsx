import ConnectionForm from "@/components/CanvasIntegrationForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/integrations/canvas")({
  component: CanvasIntegrationPage,
});

function CanvasIntegrationPage() {
  return <ConnectionForm />;
}
