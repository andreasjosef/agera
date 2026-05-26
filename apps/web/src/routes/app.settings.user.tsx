import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/user")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: Focus, energy level, maximum daily workload minutes.

  return (
    <div>
      <h3 className="text-xl font-medium">Preferencer</h3>
    </div>
  );
}
