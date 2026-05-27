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
        return { color: "bg-state-success", message: "Canvas" };
      case "INITIALIZED":
      case "PROCESSING":
        return { color: "bg-state-caution", message: "Synkar..." };
      case "ERROR":
        return { color: "bg-state-danger", message: "Synk fel" };

      default:
        return { color: "bg-cod-gray-400", message: "Fel" };
    }
  };

  if (integrationStatus === "NOT_FOUND") {
    return null;
  }

  return (
    <div className="px-4 py-2 text-md rounded-lg flex items-center gap-x-2">
      <span
        className={mergeStyles("pulse-dot", getStatusMeta(syncStatus).color)}
        aria-hidden
      ></span>
      <span className="text-content-subtle">
        {getStatusMeta(syncStatus).message}
      </span>
    </div>
  );
}
