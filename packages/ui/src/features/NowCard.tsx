import { ScoredStep } from "@ccpilot/domain";
import { Play, Goal, WandSparkles } from "lucide-react";

import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { Error } from "../primitives/Error";
import { NowItem } from "../primitives/NowItem";

export interface NowCardProps {
  step?: ScoredStep;
  isLoading?: boolean;
  error?: string | null;
  onDone?: (stepId: string) => void;
}

export function NowCard({ step, isLoading, error, onDone }: NowCardProps) {
  // TODO: should be improved
  if (isLoading) return <p>Loading Next Step...</p>;

  if (error)
    return (
      <Card width="max-w-2xl">
        <Error message={error} />
      </Card>
    );
  if (!step) return <p>No step available.</p>;

  return (
    <Card width="max-w-2xl">
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

            {/*
            <section>
              <header className="flex gap-2 items-center mb-2">
                <Play className="stroke-brand-subtle" />
                <h3 className="text-content-muted">
                  Steg {step.dependencyOrder}
                </h3>
              </header>
              <p className="text-lg leading-relaxed">{step.action}</p>
            </section>
            <section>
              <header className="flex gap-2 items-center mb-2">
                <Goal className="stroke-brand-subtle" />
                <h3 className="text-content-muted">Varför?</h3>
              </header>
              <p className="text-lg leading-relaxed">
                {step.outcomeDefinition}
              </p>
            </section>


            <section>
              <header className="flex gap-2 items-center mb-2">
                <WandSparkles className="stroke-brand-subtle" />
                <h3 className="text-content-muted">Hur börjar jag?</h3>
              </header>
              <p className="text-lg leading-relaxed">
                {step.quickStartLinkHint}
              </p>
            </section>
            */}
          </div>
        </div>

        <Button variant="primary" children="Done" />
      </article>
    </Card>
  );
}
