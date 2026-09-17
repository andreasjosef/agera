import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ConfettiSwitch } from "@ccpilot/ui";

export const Route = createFileRoute("/app/settings/user")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: Focus, energy level, maximum daily workload minutes.
  const [isConfettiEnabled, setIsConfettiEnabled] = useState(true);

  return (
    <div>
      <div className="flex flex-col gap-2 mb-5">
        <h3 className="text-2xl font-medium">Preferenser</h3>
        <p> Hantera dina personliga inställningar och upplevelser.</p>
      </div>

      <ConfettiSwitch
        isEnabled={isConfettiEnabled}
        setIsEnabled={setIsConfettiEnabled}
      />
    </div>
  );
}
