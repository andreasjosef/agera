import { createFileRoute, useNavigate } from "@tanstack/react-router";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import { Button, UpcomingSteps } from "@ccpilot/ui";

import Heatmap from "@/components/Heatmap";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import TimeSelectorManager from "@/components/TimeSelectorManager";

export const Route = createFileRoute("/app/cockpit")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.preview),
});

function RouteComponent() {
  const { data: preview } = useSuspenseQuery(requirementQueryOptions.preview);
  const navigate = useNavigate();

  return (
    <div className="h-full mx-auto max-w-6xl">
      <NowDashboardLayout>
        <div className="flex flex-col items-end gap-y-2">
          <UpcomingSteps steps={preview} />
          <Button onClick={() => navigate({ to: "/app" })}> Lift Off </Button>
        </div>
        <TimeSelectorManager />
        <Heatmap />
      </NowDashboardLayout>
    </div>
  );
}
