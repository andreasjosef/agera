import { requirementQueryOptions } from "@/modules/requirement/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import RequirementProgressBar from "@/components/RequirementProgressBar";
import { Check, Clock } from "lucide-react";

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

  return (
    <div className="bg-app-surface px-15 py-10 flex flex-col gap-5">
      <div className="flex items-center justify-between">
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
        {requirement?.steps.map((step, index) => (
          <li
            key={step.stepKey}
            className="flex flex-col items-start gap-4 py-3"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex  gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-violet-200 text-sm font-semibold text-electric-violet-700">
                  {step.dependencyOrder}
                </div>

                <p className="pt-1 text-content-main">{step.action}</p>
              </div>

              {step.complete ? (
                <div className="flex gap-2 items-center rounded-md border border-emerald-300 bg-emerald-50 px-4 py-1.75 text-sm text-emerald-600">
                  <Check className="h-5 w-5" /> Genomförd
                </div>
              ) : (
                <div className="flex gap-2 items-center rounded-md border border-stone-200 bg-stone-50 px-4 py-1.75 text-sm font-medium text-stone-600">
                  <Clock className="h-5 w-5" /> Kommande
                </div>
              )}
            </div>

            {index !== requirement.steps.length - 1 && (
              <div className="my-2 h-0.5 w-full bg-zinc-200/60" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
