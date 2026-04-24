import CanvasIntegrationForm from "@/components/CanvasIntegrationForm";
import { useCanvasConnect } from "@/modules/integrations/hooks";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/integrations/canvas")({
  component: CanvasIntegrationPage,
});

function CanvasIntegrationPage() {
  const { mutate, connecting, syncData } = useCanvasConnect();
  const navigate = useNavigate();

  const handleSyncNow = () => {
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CanvasIntegrationForm
        onSubmit={(data) => mutate(data)}
        isLoading={connecting}
        connectionError={!syncData?.ok ? syncData?.error : undefined}
      />

      {syncData?.ok && (
        <button disabled={connecting} onClick={handleSyncNow}>
          Sync Now
        </button>
      )}
    </div>
  );
}
