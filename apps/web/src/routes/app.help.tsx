import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Help } from "@ccpilot/ui";

export const Route = createFileRoute("/app/help")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Help
        onGoToFocus={() => navigate({ to: "/app/now" })}
        onConnectCanvas={() => navigate({ to: "/app/settings/integrations" })}
        onAdjustEnergy={() => navigate({ to: "/app/cockpit" })}
        onExploreFlow={() => navigate({ to: "/app/cockpit" })}
      />
    </div>
  );
}
