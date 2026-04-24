import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";
import { requirementQueryOptions } from "@/modules/requirement/api";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.all),
});

function Dashboard() {
  const requirements = Route.useLoaderData();

  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      <RequirementsList requirements={requirements} />
    </div>
  );
}
