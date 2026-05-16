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

// TODO: Switch to zodWrappedParser when the /requirment endpoint is implemented
const RequirementParser = zodRawParser(RequirementSchema);

export const requirementMutations = {
  finishStep: () =>
    mutationOptions({
      mutationKey: ["requirements", "finish"],
      mutationFn: async (stepId: string) => {
        const result = await _fetchRaw(
          `http://localhost:4000/api/steps/finish/${stepId}`,
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
        "http://localhost:4000/api/requirements",
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
          `http://localhost:4000/api/requirements/${id}`,
          zodWrappedParser(RequirementSchema),
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
        "http://localhost:4000/api/requirements/next",
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
        "http://localhost:4000/api/requirements/preview",
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
