import {
  fetchList,
  safeFetchItem,
  zodRawParser,
  zodWrappedParser,
} from "@ccpilot/ts-fetch";
import { RequirementSchema, ScoredStepSchema } from "@ccpilot/domain";
import { queryOptions } from "@tanstack/react-query";

// TODO: Switch to zodWrappedParser when the /requirment endpoint is implemented
const RequirementParser = zodRawParser(RequirementSchema);

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
};
