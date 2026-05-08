import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/user")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: Focus, energy level, maximum daily workload minutes.

  return (
    <div>
      <h2>User Preferences</h2>
    </div>
  );
}
