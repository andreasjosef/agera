import { and, count, eq, inArray } from "drizzle-orm";

import { type Db } from "../db/client.ts";
import { toDbStep, toDomainStep } from "../mappers/steps.ts";

import {
  type IRequirementRepository,
  type NewRequirement,
  type StepGenerationStatus,
  type NewStep,
  type TokenProvider,
  ok,
  fail,
} from "@ccpilot/domain";

import {
  integrationsTable,
  requirementsTable,
  stepsTable,
} from "../db/schema.ts";
import { toDomainRequirement } from "../mappers/requirements.ts";

export const createRequirementRepo = (db: Db): IRequirementRepository => {
  return {
    save: async (req: NewRequirement, userId: string) => {
      const [row] = await db
        .insert(requirementsTable)
        .values({
          title: req.title,
          due: req.due,
          type: req.type,
          source: req.source,
          user_id: userId,
          integrationId: req.integrationId,
        })
        .returning();

      return ok(toDomainRequirement(row));
    },
    findById: async (reqId: string) => {
      const result = await db.query.requirementsTable.findFirst({
        where: eq(requirementsTable.id, reqId),
        with: {
          steps: true,
        },
      });

      if (!result) return fail("Requirement not found!");

      return ok(toDomainRequirement(result, result.steps.map(toDomainStep)));
    },
    updateStatus: async (id: string, status: StepGenerationStatus) => {
      await db
        .update(requirementsTable)
        .set({ status })
        .where(eq(requirementsTable.id, id));

      return ok(undefined);
    },
    updateSteps: async (
      reqId: string,
      steps: NewStep[],
      status: StepGenerationStatus,
    ) => {
      try {
        await db.transaction(async (tx) => {
          await tx
            .delete(stepsTable)
            .where(eq(stepsTable.requirement_id, reqId));

          if (steps.length > 0) {
            const insertRows = steps.map((step) => toDbStep(step, reqId));
            await tx.insert(stepsTable).values(insertRows);
          }

          await tx
            .update(requirementsTable)
            .set({ status })
            .where(eq(requirementsTable.id, reqId));
        });

        return ok(undefined);
      } catch (error) {
        return fail("Update Step Transaction Failed!");
      }
    },
    getSyncIncomplete: async (userId) => {
      const rows = await db.query.requirementsTable.findMany({
        where: (table, { and, inArray, eq }) =>
          and(
            eq(table.user_id, userId),
            inArray(table.status, ["GENERATING", "RAW"]),
          ),
        with: {
          steps: true,
        },
      });

      return ok(
        rows.map((row) =>
          toDomainRequirement(row, row.steps.map(toDomainStep)),
        ),
      );
    },
    getRecent: async (userId: string, timeWinodwMinutes: number = 10) => {
      const threshold = new Date(Date.now() - timeWinodwMinutes * 60000);

      const rows = await db.query.requirementsTable.findMany({
        where: (table, { and, eq, gte }) =>
          and(eq(table.user_id, userId), gte(table.updatedAt, threshold)),
        with: { steps: true },
      });

      return ok(
        rows.map((row) =>
          toDomainRequirement(row, row.steps.map(toDomainStep)),
        ),
      );
    },
    getAll: async (userId) => {
      const rows = await db.query.requirementsTable.findMany({
        where: (table, { and, eq }) => and(eq(table.user_id, userId)),
        with: { steps: true },
      });

      return ok(
        rows.map((row) =>
          toDomainRequirement(row, row.steps.map(toDomainStep)),
        ),
      );
    },
    getCountsByStatuses: async (
      userId: string,
      provider: TokenProvider,
      statuses: StepGenerationStatus[],
    ) => {
      if (statuses.length === 0) return fail("Need Statuses to filter by!");

      const rows = await db
        .select({
          status: requirementsTable.status,
          count: count(),
        })
        .from(requirementsTable)
        .where(
          and(
            eq(requirementsTable.user_id, userId),
            eq(requirementsTable.source, provider),
            inArray(requirementsTable.status, statuses),
          ),
        )
        .groupBy(requirementsTable.status);

      const statusMap = rows.reduce(
        (acc, row) => {
          const status = row.status as StepGenerationStatus;
          acc[status] = row.count;
          return acc;
        },
        {} as Record<StepGenerationStatus, number>,
      );

      console.log("[DB REQS] statusMap: ", statusMap);

      return ok(statusMap);
    },
    getTotalCount: async (userId: string, provider: TokenProvider) => {
      const [result] = await db
        .select({
          value: count(),
        })
        .from(requirementsTable)
        .innerJoin(
          integrationsTable,
          eq(requirementsTable.integrationId, integrationsTable.id),
        )
        .where(
          and(
            eq(integrationsTable.user_id, userId),
            eq(integrationsTable.provider, provider),
          ),
        );

      return ok(result?.value ?? 0);
    },
  };
};
