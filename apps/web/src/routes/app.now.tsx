import { NowCard } from "@ccpilot/ui";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";
import { createFileRoute } from "@tanstack/react-router";
import PomodoroTimerManager from "@/components/PomodoroTimerManager";
import BodyDoublingDisplayManager from "@/components/BodyDoublingDisplayManager";
import { useBodyDoubling } from "@/modules/cockpit/store";

export const Route = createFileRoute("/app/now")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  const { mutate: finish } = useFinishStep();
  const isEnabled = useBodyDoubling((store) => store.isEnabled);

  if (!nextStep)
    return (
      <div className="h-full grid">
        <NowCard.Empty />
      </div>
    );
  if (error) return <NowCard.Error message={error.message} />;
  if (isLoading) return <NowCard.Loading />;

  return (
    <div className="now-grid items-start gap-2">
      <div className="[grid-area:pomodoro]">
        <PomodoroTimerManager />
      </div>

      <div className="[grid-area:now-card]">
        <NowCard step={nextStep} onDone={() => finish(nextStep.id)} />
      </div>
      <div className="[grid-area:body-doubling]">
        {isEnabled && <BodyDoublingDisplayManager />}
      </div>
    </div>
  );
}
