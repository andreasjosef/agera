import { ScoredStep } from "@ccpilot/domain";

import { Folder } from "lucide-react";
import { NowItem } from "../primitives/NowItem";
import { Card } from "../primitives/Card";
import React, { ReactNode } from "react";

export interface UpcomingStepsProps {
  steps: ScoredStep[];
  RequirementLink: React.ComponentType<{ id: string; children: ReactNode }>;
}

export function UpcomingSteps({ steps, RequirementLink }: UpcomingStepsProps) {
  if (steps.length <= 0) {
    return (
      <Card className="min-h-72" title="Kommande Steg">
        <p>Alla steg är klara, bra jobbat !</p>
      </Card>
    );
  }

  return (
    <Card className="min-h-72" title="Kommande Steg">
      <ul className="flex flex-col gap-8">
        {steps.map((step) => {
          return (
            <li key={step.stepKey}>
              <NowItem
                icon={Folder}
                title={
                  <>
                    <RequirementLink id={step.requirementId}>
                      {step.requirementTitle}
                    </RequirementLink>
                    <span className="text-content-muted font-normal">
                      {" "}
                      — {step.estimatedMinutes} min • {step.category}
                    </span>
                  </>
                }
                content={step.action}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
