import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { integrationQueries } from "@/modules/integrations/api";
import { useCanvasConnect, useSyncPolling } from "@/modules/integrations/hooks";
import CanvasIntegrationForm from "@/components/CanvasIntegrationForm";

export const Route = createFileRoute("/app/settings/integrations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: integration } = useQuery(
    integrationQueries.getConnection("CANVAS"),
  );

  const { pollingData, refetch } = useSyncPolling(
    "CANVAS",
    integration?.status,
  );
  const { mutate, connecting, syncData } = useCanvasConnect();

  return (
    <div>
      <h2> Integrations </h2>

      {integration?.status === "NOT_FOUND" && (
        <CanvasIntegrationForm
          onSubmit={(data) => mutate(data)}
          isLoading={connecting}
          connectionError={!syncData?.ok ? syncData?.error : undefined}
        />
      )}

      {/* TODO: Should this be a component ? */}
      {integration?.status === "STABLE" ||
        (integration?.status === "SYNCING" && (
          <div className="bg-app-surface">
            <header className="flex justify-between items-center">
              <h3>Canvas</h3>
              <span className="p-2 bg-green-500 rounded-2xl text-app-bg">
                Connected
              </span>
            </header>
            <div className="grid">
              <ul>
                <li> Sync Status: {pollingData?.status}</li>
                <li> Last Sync: {integration.lastSync?.toLocaleString()} </li>
                <li> Total: {pollingData?.stats.total} </li>
              </ul>
              <button
                className="primary-button ml-auto"
                onClick={() => {
                  console.log("re-sync");
                  refetch();
                }}
              >
                Re-sync
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
