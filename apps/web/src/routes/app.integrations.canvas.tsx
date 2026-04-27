import CanvasIntegrationForm from "@/components/CanvasIntegrationForm";
import { integrationQueries } from "@/modules/integrations/api";
import { useCanvasConnect, useSyncPolling } from "@/modules/integrations/hooks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/integrations/canvas")({
  component: CanvasIntegrationPage,
  loader: async ({ context }) => {
    const integration = await context.queryClient.ensureQueryData(
      integrationQueries.getConnection("CANVAS"),
    );

    return { integration };
  },
});

function CanvasIntegrationPage() {
  const { data: integration } = useQuery(
    integrationQueries.getConnection("CANVAS"),
  );

  const { pollingData } = useSyncPolling(integration?.status);
  const { mutate, connecting, syncData } = useCanvasConnect();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-2">Canvas Integration</h2>

      {integration?.status === "NOT_FOUND" && (
        <CanvasIntegrationForm
          onSubmit={(data) => mutate(data)}
          isLoading={connecting}
          connectionError={!syncData?.ok ? syncData?.error : undefined}
        />
      )}

      {integration?.status === "STABLE" && (
        <div className="bg-neutral-200 p-4">
          <p>
            Status: <span className="text-green-500 font-semibold">Stable</span>
          </p>
          <p>Last Sync: {integration.lastSync.toLocaleString()}</p>
          <p>Sync Status: {pollingData?.status}</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold my-1">Synced Requirements</h3>
      {pollingData?.payload.map((item) => (
        <p className="p-1 bg-neutral-200">{item.title}</p>
      ))}

      <h3 className="text-2xl font-semibold my-1">Generated Steps</h3>
      {pollingData?.payload.map((item) =>
        item.steps.map((step) => (
          <div className="p-1 bg-neutral-200 flex flex-col mb-1">
            <p>
              <strong>Outcome:</strong> {step.outcomeDefinition}
            </p>
            <p>
              <strong>Action:</strong> {step.action}
            </p>
            <p>
              <strong>Quick Start:</strong> {step.quickStartLinkHint}
            </p>
          </div>
        )),
      )}
    </div>
  );
}
