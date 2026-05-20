import { requirementQueryOptions } from "@/modules/requirement/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import RequirementProgressBar from "@/components/RequirementProgressBar";
import RequirementStepStatus from "@/components/RequirementStepStatus";

import { Card } from "@ccpilot/ui";

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

  {
    /* NOTE: For now we just sort the steps here in place. But this should ideally be part of a filter and sort bar*/
  }
  const stepsSorted = [...(requirement?.steps ?? [])].sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? 1 : -1;
    return a.dependencyOrder - b.dependencyOrder;
  });

  const nextStepIndex = stepsSorted.findIndex((step) => !step.complete);

  return (
    <Card className="bg-app-surface px-10 py-10 lg:px-15 flex flex-col gap-5 @container">
      <div className="flex flex-col @2xl:flex-row @2xl:justify-between @2xl:items-center">
        <div>
          <h2 className="text-3xl font-medium text-content-main ">
            {requirement?.title}
          </h2>
          <p className="text-content-muted py-2">
            Den här uppgiften har totalt {requirement?.steps.length} Steg
          </p>
        </div>

        <RequirementProgressBar requirement={requirement} />
      </div>

      <ul>
        {stepsSorted.map((step, index) => (
          <li
            key={step.stepKey}
            className="flex flex-col items-start gap-4 py-3"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex  gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-violet-200 text-sm font-semibold text-electric-violet-700">
                  {step.dependencyOrder}
                </div>

                <p className="pt-1 text-content-main cursor-pointer">
                  {step.action}
                </p>
              </div>

              <RequirementStepStatus
                complete={step.complete}
                isNextStep={index === nextStepIndex}
              />
            </div>

            {index !== stepsSorted.length - 1 && (
              <div className="my-2 h-0.5 w-full bg-zinc-200/60" />
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
