import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";
import type {
  IntegrationStatus,
  IntegrationStatusResponse,
  SyncStatusResponse,
} from "@ccpilot/domain";
import { mergeStyles } from "../utils";

interface IntegrationStatusProps {
  platform: "Canvas";
  integration: IntegrationStatusResponse;
  syncPollingData?: SyncStatusResponse;
  handleTokenUpdate: () => void;
  reSync: () => void;
}

export function IntegrationStatus({
  platform,
  integration,
  syncPollingData,
  handleTokenUpdate,
  reSync,
}: IntegrationStatusProps) {
  const withLastSync =
    integration.status === "ERROR" ||
    integration.status === "SYNCING" ||
    integration.status === "STABLE";

  const getIntegrationStatusMeta = (
    status: IntegrationStatus,
  ): { color: string; message: string } => {
    switch (status) {
      case "STABLE":
        return { color: "bg-state-success", message: "Ansluten" };
      case "CONNECT":
      case "SYNCING":
        return { color: "bg-state-caution", message: "Laddar" };
      case "ERROR":
      case "NOT_FOUND":
        return { color: "bg-state-danger", message: "Misslyckades" };
      default:
        return { color: "bg-cod-gray-400", message: "Okänd" };
    }
  };

  return (
    <Card className="surface-container divide-y divide-cod-gray-200 grid gap-y-2">
      <header className="flex justify-between items-center pb-2">
        <h4 className="font-bold">{platform}</h4>
        <div
          className={mergeStyles(
            "pulse-dot",
            getIntegrationStatusMeta(integration.status).color,
          )}
        >
          <span className="sr-only">
            {getIntegrationStatusMeta(integration.status).message}
          </span>
        </div>
      </header>
      <div className="grid">
        <ul>
          <li>
            <span className="font-medium text-content-muted">Synk status:</span>{" "}
            {syncPollingData?.status}
          </li>
          <li>
            <span className="font-medium text-content-muted">
              Senaste uppdatering:{" "}
            </span>
            {withLastSync
              ? integration.lastSync?.toLocaleDateString()
              : "Saknas"}
          </li>
          <li>
            <span className="font-medium text-content-muted">Totalt: </span>{" "}
            {syncPollingData?.stats.total ?? 0}
          </li>
        </ul>
        <div className="flex flex-row justify-end @max-2xl:flex-col gap-2">
          <Button onClick={handleTokenUpdate}>Redigera</Button>
          <Button
            className="disabled:bg-brand-subtle"
            isLoading={syncPollingData?.status === "PROCESSING"}
            disabled={
              syncPollingData?.status === "PROCESSING" ||
              integration.status === "NOT_FOUND"
            }
            onClick={reSync}
          >
            Synka om
          </Button>
        </div>
      </div>
    </Card>
  );
}
