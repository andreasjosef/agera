import { integrationQueries } from "@/modules/integrations/api";
import { useSyncPolling } from "@/modules/integrations/hooks";
import { SyncState } from "@ccpilot/ui";
import { useQuery } from "@tanstack/react-query";

export default function SyncStateManager() {
  const { data: integration } = useQuery(
    integrationQueries.getConnection("CANVAS"),
  );
  const { pollingData } = useSyncPolling("CANVAS", integration?.status);

  return (
    <SyncState
      integrationStatus={integration?.status}
      syncStatus={pollingData?.status}
    />
  );
}
