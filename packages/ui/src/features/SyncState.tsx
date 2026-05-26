import { IntegrationStatus, SyncStatus } from "@ccpilot/domain";
import { mergeStyles } from "../utils";

interface SyncStateProps {
  integrationStatus?: IntegrationStatus;
  syncStatus?: SyncStatus;
}

export function SyncState({
  integrationStatus = "NOT_FOUND",
  syncStatus = "PROCESSING",
}: SyncStateProps) {
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
        return { color: "bg-cod-gray-400", message: "Okänd" };
    }
  };

  if (integrationStatus === "NOT_FOUND") {
    return null;
  }

  return (
    <div className="border-state-info border rounded-2xl p-2 flex items-center gap-x-2 shadow-[0px_2px_0px] shadow-state-info/50">
      <span
        className={mergeStyles("pulse-dot", getStatusMeta(syncStatus).color)}
        aria-hidden
      ></span>
      <span>{getStatusMeta(syncStatus).message}</span>
    </div>
  );
}
