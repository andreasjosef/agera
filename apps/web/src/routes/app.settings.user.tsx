import { createFileRoute } from "@tanstack/react-router";
import { Card, ConfettiSwitch } from "@ccpilot/ui";

export const Route = createFileRoute("/app/settings/user")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: Focus, energy level, maximum daily workload minutes.

  return (
    <div>
      <h3 className="text-xl font-medium">Preferenser</h3>

      <ConfettiSwitch />
    </div>
  );
}
