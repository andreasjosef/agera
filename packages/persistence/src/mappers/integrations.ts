import { type IntegrationToken, type IntegrationStatusResponse } from "@ccpilot/domain";
import { type IntegrationRow } from "../db/schema.ts";

export const mapIntegrationRowToStatus = (
  row: IntegrationRow | null | undefined,
): IntegrationStatusResponse => {
  if (!row) return { status: "NOT_FOUND" };

  if (row.status === "ERROR") {
    return {
      status: "ERROR",
      lastSync: row.updatedAt,
      error: row.error ?? "Unknown integration Error",
    };
  }

  if (row.status === "SYNCING") {
    return {
      status: "SYNCING",
      lastSync: row.updatedAt ?? undefined,
    };
  }

  return {
    status: "STABLE",
    lastSync: row.updatedAt ?? new Date(),
  };
};

export const mapIntegrationRowToToken = (
  row: IntegrationRow | null | undefined
): IntegrationToken => {
  return {
    token: row?.encryptedToken ?? "",
    provider: row?.provider ?? "CANVAS"
  }
}