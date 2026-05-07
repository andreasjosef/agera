import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/integrations")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Integration Settings</div>;
}
