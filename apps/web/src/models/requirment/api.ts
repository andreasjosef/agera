import { fetchList, zodRawParser } from "@ccpilot/ts-fetch";
import { RequirementSchema } from "@ccpilot/domain";

// TODO: Switch to zodWrappedParser when the /requirment endpoint is implemented
const RequirementParser = zodRawParser(RequirementSchema);

export const getAllRequirements = async () => {
  const res = await fetchList("/requirements.json", RequirementParser, {
    extractArray: (data) => data.value,
    onItemError: (item, err) => {
      console.error("Failed to parse item:", err, item);
    },
  });

  if (!res.ok) {
    throw new Error(res.error);
  }

  return res.value;
};
