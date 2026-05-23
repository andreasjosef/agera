import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { requirementQueryOptions } from "@/modules/requirement/api";
import { StepDetail } from "@ccpilot/ui";
import BackButtonManager from "@/components/BackButtonManager";

export const Route = createFileRoute("/app/step/$id")({
  component: RouteComponent,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      requirementQueryOptions.stepById(params.id),
    ),
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: step } = useSuspenseQuery(requirementQueryOptions.stepById(id));

  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto w-full max-w-305">
        <BackButtonManager />
        <StepDetail step={step} />
      </div>
    </div>
  );
}
