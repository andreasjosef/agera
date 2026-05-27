import { ScoredStep } from "@ccpilot/domain";
import { Play, Goal, WandSparkles, Cable } from "lucide-react";

import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { Error } from "../primitives/Error";
import { NowItem } from "../primitives/NowItem";
import { Link } from "@tanstack/react-router";

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
                deadline:{" "}
                <span>
                  {step.effectiveDeadline.toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
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
          className="p-0"
          children="Klart"
          onClick={() => onDone(step.id)}
        />
      </article>
    </Card>
  );
}

NowCard.Empty = () => (
  <Card className="min-h-96 grid place-content-center gap-y-2 text-center">
    <Cable className="mx-auto size-8" />
    <h2 className="text-xl font-display font-semibold text-center text-balance">
      Inga steg finns tillgängliga. Anslut ditt Canvas för att få det !
    </h2>
    <Link
      className="text-brand-primary underline font-medium hover:text-brand-hover focus:text-brand-hover"
      to="/app/settings/integrations"
    >
      Gå till inställningar
    </Link>
  </Card>
);
NowCard.Loading = () => <Card>Loading...</Card>;
NowCard.Error = ({ message }: { message: string }) => (
  <Card>
    <Error message={message} />
  </Card>
);
