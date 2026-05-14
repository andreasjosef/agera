import { createFileRoute } from "@tanstack/react-router";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import { Button, NowCard } from "@ccpilot/ui";

import Heatmap from "@/components/Heatmap";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";
import TimeSelectorManager from "@/components/TimeSelectorManager";
import LiftOffButton from "@/components/LiftOffButton";

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
        <div className="flex flex-col items-end gap-y-2">
          <NowCard step={nextStep} onDone={() => finish(nextStep.id)} />
          <LiftOffButton />
        </div>
        <Heatmap />
        <TimeSelectorManager />
      </NowDashboardLayout>
    </div>
  );
}
