import { fetchList, zodRawParser } from "@ccpilot/ts-fetch";
import { RequirementSchema } from "@ccpilot/domain";
import { useQuery } from "@tanstack/react-query";

// TODO: Switch to zodWrappedParser when the /requirment endpoint is implemented
const RequirementParser = zodRawParser(RequirementSchema);

const getAllRequirements = async () => {
  const res = await fetchList("/requirements.json", RequirementParser, {
    extractArray: (data) => data.requirements,
    onItemError: (item, err) => {
      console.error("Failed to parse item:", err, item);
    },
  });

  if (!res.ok) {
    throw new Error(res.error);
  }

  return res.value;
};

export default function RequirementsList() {
  const {
    data: requirements,
    isPending,
    error,
  } = useQuery({
    queryKey: ["requirements"],
    queryFn: getAllRequirements,
  });

  if (isPending) {
    return <p> Loading requirements...</p>;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  return (
    <ul>
      {requirements.map((req) => (
        <li key={req.id}> {req.id} </li>
      ))}
    </ul>
  );
}
