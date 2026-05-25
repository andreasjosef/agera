import { Suspense } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button, Card } from "@ccpilot/ui";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import BodyDoublingSwitchManager from "@/components/BodyDoublingSwitchManager";
import TimeSelectorManager from "@/components/TimeSelectorManager";
import { UpcomingStepsSection } from "@/components/UpcomingStepsWidget";
import { EnergySelectorWidget } from "@/components/EnergySelectorWidget";

import { useApp } from "@/modules/store";
import { useTimer } from "@/modules/cockpit/store";
import { useToggleAcitve } from "@/modules/cockpit/hooks";

export const Route = createFileRoute("/app/cockpit")({
  component: RouteComponent,
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
          <EnergySelectorWidget />
          <Suspense
            fallback={
              <Card
                className="grid gap-3 min-h-72 w-full"
                title="Kommande Steg"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl bg-app-surface-hover h-24 w-full"
                  />
                ))}
              </Card>
            }
          >
            <UpcomingStepsSection />
          </Suspense>
        </div>
        <TimeSelectorManager />
        <BodyDoublingSwitchManager />
        {/* TODO / NOTE: this should probaly become an orchestrator component which whould make
          this file much cleaner as a lot of the imports related in here are the state this button handles */}
        <Button onClick={handleLiftoff}>STARTA PASSET</Button>
      </NowDashboardLayout>
    </div>
  );
}
