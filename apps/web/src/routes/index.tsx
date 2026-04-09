import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      <section className="bg-slate-400 p-12 rounded max-w-xl">
        <h2 className="text-2xl mt-2 font-semibold">Integrate Canvas API</h2>
        <p className="text-secondary mt-1">Status: Buidling Walking Skeleton</p>
      </section>

      <RequirementsList />
    </div>
  );
}
