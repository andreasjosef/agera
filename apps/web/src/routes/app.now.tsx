import { NowCard } from "@ccpilot/ui";
import { useFinishStep, useNextStep } from "@/modules/requirement/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import PomodoroTimerManager from "@/components/PomodoroTimerManager";
import BodyDoublingDisplayManager from "@/components/BodyDoublingDisplayManager";
import { ArrowLeft } from "lucide-react";
import z from "zod";

const NowSearchSchema = z.object({
  bodyDoublingEnabled: z.boolean().optional(),
});

export const Route = createFileRoute("/app/now")({
  component: RouteComponent,
  validateSearch: NowSearchSchema,
});

function RouteComponent() {
  const { nextStep, error, isLoading } = useNextStep();
  const { mutate: finish } = useFinishStep();
  const { bodyDoublingEnabled } = Route.useSearch();

  if (!nextStep)
    return (
      <div className="h-full grid">
        <NowCard.Empty />
      </div>
    );
  if (error) return <NowCard.Error message={error.message} />;
  if (isLoading) return <NowCard.Loading />;

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/app/cockpit"
        className="flex gap-1 text-sm font-medium items-center py-2 text-content-subtle hover:text-brand-hover transition-colors duration-200"
      >
        <ArrowLeft size={18} />
        <span>Till Översikt</span>
      </Link>
      <div className="now-grid items-start gap-2">
        <div className="[grid-area:pomodoro]">
          <PomodoroTimerManager />
        </div>

        <div className="[grid-area:now-card]">
          <NowCard step={nextStep} onDone={() => finish(nextStep.id)} />
        </div>
        <div className="[grid-area:body-doubling]">
          {bodyDoublingEnabled && <BodyDoublingDisplayManager />}
        </div>
      </div>
    </div>
  );
}
