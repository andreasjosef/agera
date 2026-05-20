import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requirementQueryOptions } from "@/modules/requirement/api";

import { Button } from "@ccpilot/ui";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";
import BodyDoublingSwitchManager from "@/components/BodyDoublingSwitchManager";
import TimeSelectorManager from "@/components/TimeSelectorManager";
import { UpcomingStepsSection } from "@/components/UpcomingStepsWidget";

export const Route = createFileRoute("/app/cockpit")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.preview),
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="h-full container">
      <NowDashboardLayout>
        <div className="flex flex-col items-end gap-y-2">
          <UpcomingStepsSection />
          <Button onClick={() => navigate({ to: "/app/now" })}>Lift Off</Button>
        </div>
        <TimeSelectorManager />
        <BodyDoublingSwitchManager />
      </NowDashboardLayout>
    </div>
  );
}
