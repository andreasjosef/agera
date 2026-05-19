import { Check, Clock, CircleAlert } from "lucide-react";

interface StepStatusProps {
  complete: boolean;
  isNextStep: boolean;
}

const RequirementStepStatus = ({ complete, isNextStep }: StepStatusProps) => {
  if (complete) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-1.75 text-sm text-emerald-600">
        <Check className="size-5" />
        <span className="sr-only @md:not-sr-only"> Genomförd </span>
      </div>
    );
  }

  if (isNextStep) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-1.75 text-sm text-red-600">
        <CircleAlert className="size-5" />
        <span className="sr-only @md:not-sr-only"> Nästa steg </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-stone-200 bg-stone-50 px-4 py-1.75 text-sm text-stone-600">
      <Clock className="size-5" />
      <span className="sr-only @md:not-sr-only"> Kommande </span>
    </div>
  );
};

export default RequirementStepStatus;
