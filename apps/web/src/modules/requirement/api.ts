import {
  _fetchRaw,
  fetchList,
  safeFetchItem,
  zodRawParser,
  zodWrappedParser,
} from "@ccpilot/ts-fetch";
import {
  RequirementSchema,
  ScoredStep,
  ScoredStepSchema,
} from "@ccpilot/domain";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:4000"}/api`;

const RequirementParser = zodRawParser(RequirementSchema);

export const requirementMutations = {
  finishStep: () =>
    mutationOptions({
      mutationKey: ["requirements", "finish"],
      mutationFn: async (stepId: string) => {
        const result = await _fetchRaw(
          `${BASE_URL}/steps/finish/${stepId}`,
          "POST",
          {},
          {},
        );

        if (!result.ok) throw new Error(result.error);

        return result.value;
      },
    }),
};

export const requirementQueryOptions = {
  all: queryOptions({
    queryKey: ["requirements"],
    queryFn: async () => {
      const res = await fetchList(
        `${BASE_URL}/requirements`,
        RequirementParser,
        {
          extractArray: (data) => data.value,
          onItemError: (item, err) => {
            console.error("Failed to parse item:", err, item);
          },
        },
      );

      if (!res.ok) {
        throw new Error(res.error);
      }

      return res.value;
    },
  }),
  getById: (id: string) => {
    return queryOptions({
      queryKey: ["requirements", id],
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/requirements/${id}`,
          zodWrappedParser(RequirementSchema),
        );

        if (!result.ok) throw new Error(result.error);

        return result.value;
      },
    });
  },

  stepById: (id: string) => {
    return queryOptions({
      queryKey: ["step", id],
      queryFn: async () => {
        const result = await safeFetchItem(
          `${BASE_URL}/steps/${id}`,
          zodWrappedParser(ScoredStepSchema),
        );

        if (!result.ok) throw new Error(result.error);

        return result.value;
      },
    });
  },

  next: queryOptions({
    queryKey: ["requirements", "next"],
    queryFn: async () => {
      const result = await safeFetchItem(
        `${BASE_URL}/requirements/next`,
        zodWrappedParser(ScoredStepSchema),
      );

      if (!result.ok) throw new Error(result.error);

      return result.value;
    },
  }),
  preview: queryOptions({
    queryKey: ["requirements", "preview"],
    queryFn: async () => {
      const result = await fetchList<ScoredStep>(
        `${BASE_URL}/requirements/preview`,
        zodRawParser(ScoredStepSchema),
        {
          extractArray: (data) => data.value,
          onItemError: (item, err) => {
            console.error("Failed to parse item:", err, item);
          },
        },
      );

      if (!result.ok) throw new Error(result.error);

      console.log("[PREVIEW RESULT]: ", result.value);
      return result.value;
    },
  }),
};
