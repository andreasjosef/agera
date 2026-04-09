import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";
import { requirmentQueryOptions } from "@/models/requirment/api";

export const Route = createFileRoute("/")({
  component: Dashboard,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirmentQueryOptions.all),
});

function Dashboard() {
  const requirments = Route.useLoaderData();

  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      <RequirementsList requirments={requirments} />
    </div>
  );
}
