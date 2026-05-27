import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { integrationQueries } from "@/modules/integrations/api";
import { useCanvasConnect, useSyncPolling } from "@/modules/integrations/hooks";
import CanvasIntegrationForm from "@/components/CanvasIntegrationForm";
import { useInitiateSync } from "@/modules/requirement/hooks";
import { Button, Card } from "@ccpilot/ui";

export const Route = createFileRoute("/app/settings/integrations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: integration } = useQuery(
    integrationQueries.getConnection("CANVAS"),
  );

  const { pollingData } = useSyncPolling("CANVAS", integration?.status);
  const { mutate, connecting, syncData } = useCanvasConnect();
  const { mutate: reSync } = useInitiateSync();

  return (
    <>
      <h3 className="text-2xl font-medium"> Integrationer </h3>

      <p className="text-sm text-content-muted mb-2">
        Koppla ditt Canvas-konto för att synkronisera kurser och uppgifter till
        Agera.
      </p>
      <Card>
        {integration?.status === "NOT_FOUND" && (
          <CanvasIntegrationForm
            onSubmit={(data) => mutate(data)}
            isLoading={connecting}
            connectionError={!syncData?.ok ? syncData?.error : undefined}
          />
        )}

        {/* TODO: Should this be a component ? */}
        {(integration?.status === "STABLE" ||
          integration?.status === "SYNCING") && (
          <div className="surface-container divide-y divide-cod-gray-200 grid gap-y-2">
            <header className="flex justify-between items-center pb-2">
              <h4>Canvas</h4>
              <div className="pulse-dot bg-state-success">
                <span className="sr-only">Connected</span>
              </div>
            </header>
            <div className="grid">
              <ul>
                <li> Sync Status: {pollingData?.status}</li>
                <li> Last Sync: {integration.lastSync?.toLocaleString()} </li>
                <li> Total: {pollingData?.stats.total} </li>
              </ul>
              <Button
                className="ml-auto disabled:bg-brand-subtle"
                isLoading={pollingData?.status === "PROCESSING"}
                onClick={() => {
                  reSync();
                }}
              >
                Re-sync
              </Button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
