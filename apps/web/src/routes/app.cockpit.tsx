import { Suspense } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Card, WelcomeCard } from "@ccpilot/ui";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import BodyDoublingSwitchManager from "@/components/BodyDoublingSwitchManager";
import TimeSelectorManager from "@/components/TimeSelectorManager";
import { UpcomingStepsSection } from "@/components/UpcomingStepsWidget";
import { EnergySelectorWidget } from "@/components/EnergySelectorWidget";

import { useApp } from "@/modules/store";
import { useBodyDoubling, useTimer } from "@/modules/cockpit/store";
import { useToggleAcitve } from "@/modules/cockpit/hooks";
import { useSession } from "@/modules/auth/hooks";

export const Route = createFileRoute("/app/cockpit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const setIsSidebarOpen = useApp((store) => store.setIsSidebarOpen);
  const setIsPause = useTimer((store) => store.setIsPaused);
  const bodyDoublingEnabled = useBodyDoubling((store) => store.isEnabled);
  const { toggleStatusActive } = useToggleAcitve();
  const { user } = useSession();

  const handleLiftoff = () => {
    navigate({ to: "/app/now", search: { bodyDoublingEnabled } });
    toggleStatusActive(true);
    setIsSidebarOpen(false);
    setIsPause(false);
  };

  return (
    <div className="h-full max-w-6xl mx-auto flex flex-col gap-y-2">
      {user && <WelcomeCard username={user.name} onStartPass={handleLiftoff} />}
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
      </NowDashboardLayout>
    </div>
  );
}
