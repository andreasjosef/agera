import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requirementQueryOptions } from "@/modules/requirement/api";

import { Button } from "@ccpilot/ui";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";
import BodyDoublingSwitchManager from "@/components/BodyDoublingSwitchManager";
import TimeSelectorManager from "@/components/TimeSelectorManager";
import { UpcomingStepsSection } from "@/components/UpcomingStepsWidget";
import { useApp } from "@/modules/store";
import { useTimer } from "@/modules/cockpit/store";
import { useToggleAcitve } from "@/modules/cockpit/hooks";

export const Route = createFileRoute("/app/cockpit")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.preview),
});

function RouteComponent() {
  const navigate = useNavigate();
  const setIsSidebarOpen = useApp((store) => store.setIsSidebarOpen);
  const setIsPause = useTimer((store) => store.setIsPaused);
  const { toggleStatusActive } = useToggleAcitve();

  const handleLiftoff = () => {
    navigate({ to: "/app/now" });
    toggleStatusActive(true);
    setIsSidebarOpen(false);
    setIsPause(false);
  };

  return (
    <div className="h-full">
      <NowDashboardLayout>
        <div className="flex flex-col items-end gap-y-2">
          <UpcomingStepsSection />
        </div>
        <TimeSelectorManager />
        <BodyDoublingSwitchManager />
        <Button onClick={handleLiftoff}>STARTA PASSET</Button>
      </NowDashboardLayout>
    </div>
  );
}
