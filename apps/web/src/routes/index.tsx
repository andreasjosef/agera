import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";
import { requirementQueryOptions } from "@/models/requirement/api";

export const Route = createFileRoute("/")({
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
