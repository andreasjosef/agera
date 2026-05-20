import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/step/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Step id</div>;
}
