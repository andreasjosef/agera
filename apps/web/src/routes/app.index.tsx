import { NowCard } from "@ccpilot/ui";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";
import { createFileRoute } from "@tanstack/react-router";
import PomodoroTimerManager from "@/components/PomodoroTimerManager";
import BodyDoublingDisplayManager from "@/components/BodyDoublingDisplayManager";
import { useBodyDoubling } from "@/modules/cockpit/store";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  const { mutate: finish } = useFinishStep();
  const isEnabled = useBodyDoubling((store) => store.isEnabled);

  if (!nextStep)
    return (
      <div className="max-w-4xl mx-auto">
        <NowCard.Empty />
      </div>
    );
  if (error) return <NowCard.Error message={error.message} />;
  if (isLoading)
    return (
      <div className="max-w-4xl mx-auto">
        <NowCard.Loading />
      </div>
    );

  // TODO: Lets make it a grid to fit other components nicely */
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-[2fr_1fr] items-start gap-x-2">
      <NowCard step={nextStep} onDone={() => finish(nextStep.id)} />
      <div className="grid gap-y-2">
        <PomodoroTimerManager />
        {isEnabled && <BodyDoublingDisplayManager />}
      </div>
    </div>
  );
}
