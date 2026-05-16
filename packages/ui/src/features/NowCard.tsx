import { ScoredStep } from "@ccpilot/domain";
import { Play, Goal, WandSparkles } from "lucide-react";

import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { Error } from "../primitives/Error";
import { NowItem } from "../primitives/NowItem";

export interface NowCardProps {
  step: ScoredStep;
  onDone: (stepId: string) => void;
}

export function NowCard({ step, onDone }: NowCardProps) {
  return (
    <Card>
      <article className="surface-container grid gap-y-6">
        <div className="divide-y divide-gray-200 grid gap-y-4">
          <header className="flex justify-between items-center pb-4 mb-3">
            <div>
              <h2 className="text-3xl font-display font-semibold">
                {step.requirementTitle}
              </h2>
              <p className="text-sm text-content-subtle">
                est:
                <span> {step.estimatedMinutes} min, </span>
                due:
                <span> {step.effectiveDeadline.toDateString()}</span>
              </p>
            </div>
          </header>

          <div className="grid gap-y-10">
            <NowItem
              icon={Play}
              title={`Steg ${step.dependencyOrder}`}
              content={step.action}
            />

            <NowItem
              icon={Goal}
              title="Varför?"
              content={step.outcomeDefinition}
            />

            <NowItem
              icon={WandSparkles}
              title="Hur börjar jag?"
              content={step.quickStartLinkHint}
            />
          </div>
        </div>

        <Button
          variant="primary"
          children="Done"
          onClick={() => onDone(step.id)}
        />
      </article>
    </Card>
  );
}

NowCard.Empty = () => (
  <Card>No Steps available. Connect your LMS to generate steps first!</Card>
);
NowCard.Loading = () => <Card>Loading...</Card>;
NowCard.Error = ({ message }: { message: string }) => (
  <Card>
    <Error message={message} />
  </Card>
);
