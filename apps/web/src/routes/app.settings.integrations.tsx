import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { integrationQueries } from "@/modules/integrations/api";
import { useCanvasConnect, useSyncPolling } from "@/modules/integrations/hooks";
import CanvasIntegrationForm from "@/components/CanvasIntegrationForm";
import { useInitiateSync } from "@/modules/requirement/hooks";
import { IntegrationStatus } from "@ccpilot/ui";
import { useState } from "react";

export const Route = createFileRoute("/app/settings/integrations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: integration } = useSuspenseQuery(
    integrationQueries.getConnection("CANVAS"),
  );

  const navigate = useNavigate();
  const { pollingData } = useSyncPolling("CANVAS", integration?.status);
  const { mutate, connecting, syncData } = useCanvasConnect();
  const { mutate: reSync } = useInitiateSync();

  const [canvasFormOpen, setCanvasFormOpen] = useState(
    ["ERROR", "NOT_FOUND"].includes(integration.status),
  );

  useEffect(() => {
    if (syncData?.ok) {
      navigate({ to: "/app/help" });
    }
  }, [syncData, navigate]);

  return (
    <>
      <h3 className="text-2xl font-medium"> Integrationer </h3>

      <p className="text-sm text-content-muted mb-2">
        Koppla ditt Canvas-konto för att synkronisera kurser och uppgifter till
        Agera.
      </p>
      {/* NOTE: We might want integration form to be part of integration status component somehow in case we add more integrations */}
      {canvasFormOpen && (
        <CanvasIntegrationForm
          onSubmit={(data) => {
            mutate(data, {
              onSuccess: () => {
                setCanvasFormOpen(false);
              },
            });
          }}
          isLoading={connecting}
          connectionError={!syncData?.ok ? syncData?.error : undefined}
        />
      )}

      {!canvasFormOpen && (
        <IntegrationStatus
          platform="Canvas"
          integration={integration}
          syncPollingData={pollingData}
          handleTokenUpdate={() => setCanvasFormOpen(true)}
          reSync={reSync}
        />
      )}
    </>
  );
}
