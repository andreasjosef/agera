import { integrationQueries } from "@/modules/integrations/api";
import { useSyncPolling } from "@/modules/integrations/hooks";
import { useQuery } from "@tanstack/react-query";

export default function SyncState() {
  const { data: integration } = useQuery(
    integrationQueries.getConnection("CANVAS"),
  );
  const { pollingData } = useSyncPolling("CANVAS", integration?.status);

  if (integration?.status === "NOT_FOUND") {
    return;
  }

  /* TODO: Make this less distracting */
  return (
    <p className="bg-canvas-primary text-app-bg p-2 rounded-2xl">
      Sync Status: {pollingData?.status}
    </p>
  );
}
