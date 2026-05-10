import { requirementQueryOptions } from "@/modules/requirement/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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
    <div className="bg-app-surface p-5">
      <h2 className="text-2xl font-medium text-content-main">
        {requirement?.title}
      </h2>
      <p className="text-content-subtle">
        Den här uppgiften har totalt {requirement?.steps.length} Steg
      </p>
      <ul>
        {requirement?.steps.map((step) => (
          <li key={step.stepKey} className="mb-2 py-1">
            <h3 className="font-bold">Step {step.dependencyOrder} </h3>
            <p>{step.action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
