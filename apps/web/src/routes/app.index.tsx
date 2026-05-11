import { NowCard } from "@ccpilot/ui";
import { useNextStep } from "@/modules/requirement/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  return (
    <div className="max-w-2xl mx-auto">
      <NowCard step={nextStep} />
    </div>
  );
}
