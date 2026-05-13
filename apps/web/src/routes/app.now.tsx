import { createFileRoute } from "@tanstack/react-router";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import { NowCard } from "@ccpilot/ui";

import Timer from "@/components/Timer";
import Heatmap from "@/components/Heatmap";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";

export const Route = createFileRoute("/app/now")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  const { mutate: finish } = useFinishStep();

  if (!nextStep) return <NowCard.Empty />;
  if (isLoading) return <NowCard.Loading />;
  if (error) return <NowCard.Error message={error.message} />;

  return (
    <div className="h-full mx-auto max-w-6xl">
      <NowDashboardLayout>
        <NowCard step={nextStep} onDone={() => finish(nextStep.id)} />
        <Heatmap />
        <Timer />
      </NowDashboardLayout>
    </div>
  );
}
