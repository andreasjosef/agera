import { Requirement, ScoredStep } from "@ccpilot/domain";
import { Card } from "../primitives/Card";
import { ReactNode, useMemo, useState } from "react";
import { differenceInDays } from "date-fns";

export interface UpcomingStepsProps {
  steps: ScoredStep[];
  requirements?: Requirement[];
  RequirementLink: React.ComponentType<{ id: string; children: ReactNode }>;
}

function dueText(due: string): string {
  const days = differenceInDays(new Date(due), new Date());
  if (days === 0) return "Idag";
  if (days > 0) return `Om ${days} dagar`;
  return `För ${Math.abs(days)} dagar sedan`;
}

function typeBadgeColor(type: string): string {
  switch (type) {
    case "assignment":
      return "bg-amber-100 text-amber-700";
    case "lecture":
      return "bg-blue-100 text-blue-700";
    case "message":
      return "bg-green-100 text-green-700";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

export function UpcomingSteps({
  steps,
  requirements,
  RequirementLink,
}: UpcomingStepsProps) {
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

  const relevantRequirements = useMemo(() => {
    if (!requirements) return [];
    const reqIds = new Set(steps.map((s) => s.requirementId));
    return requirements
      .filter((req) => reqIds.has(req.id))
      .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
  }, [steps, requirements]);

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
    <Card className="min-h-72 @container p-4 @md:p-6">
      <div className="grid space-y-4">
        <h3 className="flex text-xs font-bold tracking-widest text-content-muted uppercase">
          Det här skulle passa dig idag!
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between pb-2 gap-2 @md:gap-0">
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
                Mer om Uppgifterna
              </button>
            </div>
            <span className="text-xs font-semibold text-content-main bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-100 w-fit">
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
            <div className="space-y-3">
              {relevantRequirements.length > 0 ? (
                relevantRequirements.map((req) => {
                  const totalSteps = req.steps.length;
                  const completedSteps = req.steps.filter(
                    (s) => s.complete,
                  ).length;
                  return (
                    <RequirementLink key={req.id} id={req.id}>
                      <div className="rounded-lg border border-app-border px-3 py-2 @md:px-4 @md:py-3 cursor-pointer mb-2">
                        <div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-1 @md:gap-2">
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-content-main truncate">
                              {req.title}
                            </h4>
                            <p className="text-xs text-content-muted mt-0.5">
                              {dueText(req.due)}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide w-fit ${typeBadgeColor(req.type)}`}
                          >
                            {req.type}
                          </span>
                        </div>
                        <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between mt-2 gap-1 @md:gap-0">
                          <span className="text-xs text-content-subtle">
                            {completedSteps}/{totalSteps} Steg Klar
                          </span>
                          <div className="w-full @md:w-16 h-2 bg-app-surface-hover rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-primary rounded-full transition-all"
                              style={{
                                width:
                                  totalSteps > 0
                                    ? `${(completedSteps / totalSteps) * 100}%`
                                    : "0%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </RequirementLink>
                  );
                })
              ) : (
                <div className="py-8 text-center text-sm text-content-subtle font-medium">
                  Inga uppgifter ännu.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
