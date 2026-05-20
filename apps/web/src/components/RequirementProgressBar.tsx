import { Requirement } from "@ccpilot/domain";
import { CheckCircle2, Rocket } from "lucide-react";

interface RequirementProgressProps {
  requirement: Requirement | undefined;
}

const RequirementProgressBar = ({ requirement }: RequirementProgressProps) => {
  if (!requirement) return null;

  const totalSteps = requirement.steps.length;
  const completedSteps = requirement.steps.filter(
    (step) => step.complete,
  ).length;

  const progress = totalSteps === 0 ? 0 : (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium flex items-center gap-2.5">
        {progress === 100 ? (
          <>
            <CheckCircle2
              className="h-4.5 w-4.5 text-violet-500"
              strokeWidth={2.5}
            />
            <span>Alla steg är avklarade!</span>
          </>
        ) : (
          <>
            <Rocket className="text-violet-500 h-4 w-4" strokeWidth={2.3} />
            <span>
              {completedSteps} / {totalSteps} steg klara
            </span>
          </>
        )}
      </div>

      <div className="h-3 w-full rounded bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-electric-violet-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default RequirementProgressBar;
