import { ScoredStep } from "@ccpilot/domain";

import { Folder } from "lucide-react";
import { NowItem } from "../primitives/NowItem";
import { Card } from "../primitives/Card";

export interface UpcomingStepsProps {
  steps: ScoredStep[];
}

export function UpcomingSteps({ steps }: UpcomingStepsProps) {
  return (
    <Card title="Kommande Steg">
      <ul className="flex flex-col gap-8">
        {steps.map((step) => {
          return (
            <li key={step.stepKey}>
              <NowItem
                icon={Folder}
                title={`${step.requirementTitle} - ${step.estimatedMinutes} min - ${step.category}`}
                content={step.action}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
