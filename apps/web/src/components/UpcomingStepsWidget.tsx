import { useSuspenseQuery } from "@tanstack/react-query";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { UpcomingSteps } from "@ccpilot/ui";
import { RequirementNavLink } from "./RequirementNavLink";
import { useEnergy } from "@/modules/cockpit/store";

export function UpcomingStepsSection() {
  const energyLevel = useEnergy((s) => s.energyLevel);
  const { data: preview, isLoading } = useSuspenseQuery(
    requirementQueryOptions.preview(energyLevel),
  );
  const { data: requirements } = useSuspenseQuery(requirementQueryOptions.all);

  if (isLoading) return <p>Collecting next Steps</p>;

  return (
    <UpcomingSteps
      steps={preview}
      requirements={requirements}
      RequirementLink={RequirementNavLink}
    />
  );
}
