import RequirementsList from "@/components/RequirementsList";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/requirements/")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.all),
});

function RouteComponent() {
  const { data: requirements } = useSuspenseQuery(requirementQueryOptions.all);
  return <RequirementsList requirements={requirements} />;
}
