import { useSuspenseQuery } from "@tanstack/react-query";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { UpcomingSteps } from "@ccpilot/ui";
import { RequirementNavLink } from "./RequirementNavLink";

export function UpcomingStepsSection() {
  const { data: preview, isLoading } = useSuspenseQuery(
    requirementQueryOptions.preview,
  );

  if (isLoading) return <p>Colecting next Steps</p>;

  return <UpcomingSteps steps={preview} RequirementLink={RequirementNavLink} />;
}
