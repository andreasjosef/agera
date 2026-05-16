import { createFileRoute } from "@tanstack/react-router";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import { NowCard, UpcomingSteps } from "@ccpilot/ui";

import Timer from "@/components/Timer";
import Heatmap from "@/components/Heatmap";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/app/now")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.preview),
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  const { data: preview } = useSuspenseQuery(requirementQueryOptions.preview);

  if (!nextStep) return <NowCard.Empty />;
  if (isLoading) return <NowCard.Loading />;
  if (error) return <NowCard.Error message={error.message} />;

  return (
    <div className="h-full mx-auto max-w-6xl">
      <NowDashboardLayout>
        <UpcomingSteps steps={preview} />
        <Heatmap />
        <Timer />
      </NowDashboardLayout>
    </div>
  );
}
