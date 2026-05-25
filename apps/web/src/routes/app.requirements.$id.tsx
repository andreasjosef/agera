import { requirementQueryOptions } from "@/modules/requirement/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import RequirementProgressBar from "@/components/RequirementProgressBar";
import RequirementStepStatus from "@/components/RequirementStepStatus";
import { Link } from "@tanstack/react-router";

import { Card, StepFilter } from "@ccpilot/ui";
import BackButtonManager from "@/components/BackButtonManager";
import { useRequirementStore } from "@/modules/requirement/store";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute("/app/requirements/$id")({
  component: RouteComponent,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      requirementQueryOptions.getById(params.id),
    ),
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: requirement } = useQuery(requirementQueryOptions.getById(id));
  const { stepFilter, setStepFilter } = useRequirementStore(
    useShallow((store) => ({
      stepFilter: store.stepFilter,
      setStepFilter: store.setStepFilter,
    })),
  );

  const filteredSteps = (requirement?.steps ?? []).filter((step) => {
    if (stepFilter === "done") return step.complete;
    if (stepFilter === "todo") return !step.complete;
    return true;
  });

  /* NOTE: Implemnet other sorting methods ? */
  const sortedSteps = filteredSteps.sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? 1 : -1;
    return a.dependencyOrder - b.dependencyOrder;
  });

  const nextStepIndex = sortedSteps.findIndex((step) => !step.complete);

  return (
    <Card className="bg-app-surface px-10 py-10 lg:px-15 flex flex-col gap-5 @container min-h-screen">
      <BackButtonManager />
      <header className="flex flex-col gap-y-2">
        <div className="flex flex-col @2xl:flex-row @2xl:justify-between @2xl:items-center">
          <div>
            <h2 className="text-3xl font-medium text-content-main ">
              {requirement?.title}
            </h2>
            <p className="text-content-muted max-w-2xl py-2">
              {requirement?.requirementSummary}
            </p>
          </div>

          <RequirementProgressBar requirement={requirement} />
        </div>

        <StepFilter stepFilter={stepFilter} setStepFilter={setStepFilter} />
      </header>

      <ul>
        {sortedSteps.map((step, index) => (
          <li
            key={step.stepKey}
            className="flex flex-col items-start gap-4 py-3"
          >
            <Link
              to={`/app/step/$id`}
              params={{ id: step.id }}
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <div className="flex  gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-violet-200 text-sm font-semibold text-electric-violet-700">
                  {step.dependencyOrder}
                </div>

                <p className="pt-1 text-content-main">{step.action}</p>
              </div>

              <RequirementStepStatus
                complete={step.complete}
                isNextStep={index === nextStepIndex}
              />
            </Link>

            {index !== sortedSteps.length - 1 && (
              <div className="my-2 h-0.5 w-full bg-zinc-200/60" />
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
