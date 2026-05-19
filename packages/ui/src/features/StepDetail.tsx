import { Card } from "../primitives/Card";
import { ScoredStep } from "@ccpilot/domain";

export interface StepDetailProps {
  step: ScoredStep;
}

export function StepDetail({ step }: StepDetailProps) {
  return (
    <Card>
      <h2>{step.action}</h2>
    </Card>
  );
}
