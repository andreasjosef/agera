import { integrationQueries } from "@/modules/integrations/api";
import { useSyncPolling } from "@/modules/integrations/hooks";
import { SyncStatus } from "@ccpilot/domain";
import { mergeStyles } from "@ccpilot/ui";
import { useQuery } from "@tanstack/react-query";

export default function SyncState() {
  const { data: integration } = useQuery(
    integrationQueries.getConnection("CANVAS"),
  );
  const { pollingData } = useSyncPolling("CANVAS", integration?.status);

  const getStatusMeta = (
    status?: SyncStatus,
  ): { color: string; message: string } => {
    switch (status) {
      case "COMPLETE":
      case "IDLE":
        return { color: "bg-state-success", message: "Stabil koppling" };
      case "INITIALIZED":
      case "PROCESSING":
        return { color: "bg-state-caution", message: "Synkar..." };
      case "ERROR":
        return { color: "bg-state-danger", message: "Synk fel" };

      default:
        return { color: "bg-cod-500", message: "Okänd" };
    }
  };

  if (!integration || integration.status === "NOT_FOUND") {
    return null;
  }

  return (
    <div className="border-state-info border rounded-2xl p-2 flex items-center gap-x-2 shadow-[0px_2px_0px] shadow-state-info/50 bg-state-">
      <span
        className={mergeStyles(
          "pulse-dot",
          getStatusMeta(pollingData?.status).color,
        )}
        aria-hidden
      ></span>
      <span>{getStatusMeta(pollingData?.status).message}</span>
    </div>
  );
}
