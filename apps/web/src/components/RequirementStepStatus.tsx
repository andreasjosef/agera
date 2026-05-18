import { Check, Clock, CircleAlert } from "lucide-react";

interface StepStatusProps {
  complete: boolean;
  isNextStep: boolean;
}

const RequirementStepStatus = ({ complete, isNextStep }: StepStatusProps) => {
  if (complete) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-1.75 text-sm text-emerald-600">
        <Check className="h-5 w-5" />
        Genomförd
      </div>
    );
  }

  if (isNextStep) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-1.75 text-sm text-red-600">
        <CircleAlert className="h-5 w-5" />
        Nästa steg
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-stone-200 bg-stone-50 px-4 py-1.75 text-sm text-stone-600">
      <Clock className="h-5 w-5" />
      Kommande
    </div>
  );
};

export default RequirementStepStatus;
