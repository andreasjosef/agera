import { Card } from "../primitives/Card";
import { ScoredStep } from "@ccpilot/domain";
import {
  Tag,
  Info,
  CircleCheck,
  Clock,
  ChartNoAxesColumnIncreasing,
  X,
} from "lucide-react";

export interface StepDetailProps {
  step: ScoredStep;
}

export function StepDetail({ step }: StepDetailProps) {
  return (
    <div className="flex flex-col gap-7 max-w-5xl mx-auto w-full">
      <div className="space-y-1.5">
        <h1 className="flex gap-2 text-2xl items-center">
          <Info />
          Step Information
        </h1>
        <p className="text-content-muted">
          Detailed information about this step
        </p>
      </div>

      <Card className="flex justify-between">
        <div className="flex items-center gap-6 p-4">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
            <Tag className="size-5" />
          </div>

          <div>
            <h2 className="text-sm font-medium text-content-main">Category</h2>
            <div className="text-sm text-content-muted">
              {step.category[0].toUpperCase() + step.category.slice(1)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 p-4">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <ChartNoAxesColumnIncreasing className="size-5" />
          </div>

          <div>
            <h2 className="text-sm font-medium text-content-main">
              Complexity
            </h2>
            <div className="text-sm text-content-muted">{step.complexity}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 p-4">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <Clock className="size-5" />
          </div>

          <div>
            <h2 className="text-sm font-medium text-content-main">
              Estimated Minutes
            </h2>
            <div className="text-sm text-content-muted">
              {step.estimatedMinutes}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 p-4">
          <div
            className={`rounded-xl p-3 ${
              step.complete
                ? "bg-emerald-100 text-emerald-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {step.complete ? (
              <CircleCheck className="size-5" />
            ) : (
              <X className="size-5" />
            )}
          </div>

          <div>
            <h2 className="text-sm font-medium text-content-main">Status</h2>

            <div
              className={`text-sm font-medium text-content-muted ${step.complete}`}
            >
              {step.complete ? "Completed" : "Not Completed"}
            </div>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-8">
        <div className="grid grid-cols-3 items-center">
          <h2 className="text-sm font-medium text-content-main">Action</h2>
          <div className="col-span-2 text-sm text-content-muted">
            {step.action}
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">
          <h2 className="text-sm font-medium text-content-main">
            Curiosity Trigger
          </h2>
          <div className="col-span-2 text-sm text-content-muted">
            {step.curiosityTrigger}
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">
          <h2 className="text-sm font-medium text-content-main">
            Outcome Definition
          </h2>

          <div className="col-span-2 text-sm text-content-muted">
            {step.outcomeDefinition}
          </div>
        </div>

        <div className="grid grid-cols-3 items-center">
          <h2 className="text-sm font-medium text-content-main">
            Quick Start Link Hint
          </h2>

          <div className="col-span-2 text-sm text-content-muted">
            {step.quickStartLinkHint}
          </div>
        </div>
      </Card>

      <div
        className={`mt-6 rounded-2xl border px-5 py-4 ${
          step.complete
            ? "border-green-100 bg-green-50"
            : "border-zinc-200 bg-zinc-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <p
            className={`text-sm font-medium ${
              step.complete ? "text-green-900" : "text-zinc-700"
            }`}
          >
            {step.complete
              ? "This step is completed."
              : "This step is not completed yet."}
          </p>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              step.complete
                ? "bg-green-100 text-green-700"
                : "bg-zinc-200 text-zinc-700"
            }`}
          >
            {step.complete ? "Completed" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}
