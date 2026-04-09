import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";
import { requirmentQueries } from "@/models/requirment/api";

export const Route = createFileRoute("/")({
  component: Dashboard,
  loader: () => requirmentQueries.all();
});

function Dashboard() {
  const requirments = Route.useLoaderData();

  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      <RequirementsList requirments={requirments} />
    </div>
  );
}
