import { ScoredStep } from "@ccpilot/domain";
import { Card } from "../primitives/Card";
import { ReactNode, useMemo, useState } from "react";

export interface UpcomingStepsProps {
  steps: ScoredStep[];
  RequirementLink: React.ComponentType<{ id: string; children: ReactNode }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  admin: "Admin",
  deepwork: "Deepwork",
  research: "Research",
  planning: "Planning",
  polish: "Polish",
  decisions: "Beslut",
};

export function UpcomingSteps({ steps, RequirementLink }: UpcomingStepsProps) {
  const [activeTab, setActiveTab] = useState<"flow" | "all">("flow");

  const groupedSteps = useMemo(() => {
    const stepMap = new Map<string, ScoredStep[]>();

    for (const step of steps) {
      const group = stepMap.get(step.requirementId);
      if (group) {
        group.push(step);
      } else {
        stepMap.set(step.requirementId, [step]);
      }
    }

    for (const [, group] of stepMap) {
      group.sort((a, b) => b.priorityScore - a.priorityScore);
    }

    return [...stepMap.entries()].sort(([, a], [, b]) => {
      return b[0].priorityScore - a[0].priorityScore;
    });
  }, [steps]);

  if (steps.length <= 0) {
    return (
      <Card className="min-h-72">
        <div className="grid space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-content-muted uppercase">
            Kommande Steg
          </h3>
          <p className="text-sm text-content-subtle">
            Alla steg är klara, bra jobbat!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="min-h-72">
      <div className="grid space-y-4">
        <h3 className="flex text-xs font-bold tracking-widest text-content-muted uppercase">
          Det här skulle passa dig idag!
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("flow")}
                className={`text-sm font-bold tracking-wide pb-2 transition-all border-b-2 ${
                  activeTab === "flow"
                    ? "border-brand-primary text-content-main"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Steg
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`text-sm font-bold tracking-wide pb-2 transition-all border-b-2 ${
                  activeTab === "all"
                    ? "border-brand-primary text-content-main"
                    : "border-transparent text-content-subtle hover:text-zinc-600"
                }`}
              >
                Uppgifter
              </button>
            </div>
            <span className="text-xs font-semibold text-content-main bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-100">
              {steps.length} rekommenderade
            </span>
          </div>

          {activeTab === "flow" ? (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
              {groupedSteps.map(([reqId, reqSteps]) => (
                <div key={reqId} className="relative">
                  <div className="absolute -left-5.5 top-1 size-3.5 rounded-full bg-brand-primary" />

                  <RequirementLink id={reqId}>
                    <h4 className="text-sm font-bold text-brand-primary hover:text-brand-hover transition-colors mb-3">
                      {reqSteps[0].requirementTitle}
                    </h4>
                  </RequirementLink>

                  <div className="space-y-4">
                    {reqSteps.map((step) => (
                      <div key={step.id}>
                        <div className="space-y-1 flex">
                          <p className="text-base text-content-main font-medium leading-relaxed hover:text-violet-600 transition-colors cursor-pointer">
                            {step.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-content-subtle font-medium">
              TODO
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
