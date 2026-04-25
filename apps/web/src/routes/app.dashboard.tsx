import { createFileRoute } from "@tanstack/react-router";
import RequirementsList from "@/components/RequirementsList";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { useSyncPolling } from "@/modules/integrations/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.all),
});

function Dashboard() {
  const { data: requirements } = useSuspenseQuery(requirementQueryOptions.all);
  const { pollingData } = useSyncPolling();

  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      {pollingData && <p> Syncing: {pollingData.status} </p>}
      <RequirementsList requirements={requirements} />
    </div>
  );
}
