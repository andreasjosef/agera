import CanvasIntegrationForm from "@/components/CanvasIntegrationForm";
import { useCanvasConnect, useSyncPolling } from "@/modules/integrations/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/integrations/canvas")({
  component: CanvasIntegrationPage,
});

function CanvasIntegrationPage() {
  const { mutate, connecting, syncData } = useCanvasConnect();
  const { refetch } = useSyncPolling();

  return (
    <div className="max-w-2xl mx-auto">
      <CanvasIntegrationForm
        onSubmit={(data) => mutate(data)}
        isLoading={connecting}
        connectionError={!syncData?.ok ? syncData?.error : undefined}
      />

      {syncData?.ok && (
        <button
          disabled={syncData.value.status === "INITIALIZED"}
          onClick={() => refetch()}
        >
          Sync Now
        </button>
      )}
    </div>
  );
}
