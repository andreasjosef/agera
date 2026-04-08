import { fetchList, zodRawParser } from "@ccpilot/ts-fetch";
import { RequirementSchema } from "@ccpilot/domain";
import { useEffect } from "react";

// TODO: Switch to zodWrappedParser when the /requirment endpoint is implemented
const RequirementParser = zodRawParser(RequirementSchema);

const getAllRequirements = async () => {
  console.log("getAllRequirements");

  const res = await fetchList("/requirements.json", RequirementParser, {
    extractArray: (data) => data.requirements,
    onItemError: (item, err) => {
      console.error("Failed to parse item:", err, item);
    },
  });

  if (res.ok) {
    console.log(res.value);
  }
};

export default function RequirementsList() {
  useEffect(() => {
    getAllRequirements();
  }, []);

  return (
    <>
      <p> RequirementsList </p> <ul></ul>
    </>
  );
}
