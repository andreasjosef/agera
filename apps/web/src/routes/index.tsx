import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";
import { getAllRequirements } from "@/models/requirment/api";

export const Route = createFileRoute("/")({
  component: Dashboard,
  loader: () => getAllRequirements(),
});

function Dashboard() {
  const data = Route.useLoaderData();

  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      {/* <section className="bg-slate-400 p-12 rounded max-w-xl">
        <h2 className="text-2xl mt-2 font-semibold">Integrate Canvas API</h2>
        <p className="text-secondary mt-1">Status: Buidling Walking Skeleton</p>
      </section> */}

      <RequirementsList />
    </div>
  );
}
