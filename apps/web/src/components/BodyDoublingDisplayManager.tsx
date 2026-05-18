import { statusQueries } from "@/modules/cockpit/api";
import { BodyDoublingDisplay } from "@ccpilot/ui";
import { useQuery } from "@tanstack/react-query";

export default function BodyDoublingDisplayManager() {
  const { data } = useQuery(statusQueries.getStatusActiveCount());

  if (!data) {
    return <p>Loading...</p>;
  }

  return <BodyDoublingDisplay activeCount={data?.count} />;
}
