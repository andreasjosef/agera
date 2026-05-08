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
    <div>
      <h2 className="text-xl font-medium text-content-main">
        {requirement?.title}
      </h2>
      <p>This has a total of {requirement?.steps.length} Steps</p>
      <ul>
        {requirement?.steps.map((step) => (
          <li
            key={step.stepKey}
            className="bg-app-surface-raised mb-2 px-2 py-1"
          >
            <p>
              <span className="font-bold">Step {step.dependencyOrder} </span>
              {step.action}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
