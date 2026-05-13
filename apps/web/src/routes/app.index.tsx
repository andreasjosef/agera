import { NowCard } from "@ccpilot/ui";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  const { mutate: finish } = useFinishStep();

  if (!nextStep)
    return (
      <div className="max-w-2xl mx-auto">
        <NowCard.Empty />
      </div>
    );
  if (error) return <NowCard.Error message={error.message} />;
  if (isLoading)
    return (
      <div className="max-w-2xl mx-auto">
        <NowCard.Loading />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <NowCard step={nextStep} onDone={() => finish(nextStep.id)} />
    </div>
  );
}
