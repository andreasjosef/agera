import { Link } from "@tanstack/react-router";
import { Requirement } from "@ccpilot/domain";

import { RequirementCard } from "@ccpilot/ui";

interface RequirementCardLinkProps {
  requirement: Requirement;
  index?: number;
}

export function RequirementCardLink({
  requirement,
  index,
}: RequirementCardLinkProps) {
  return (
    <Link to="/app/requirements/$id" params={{ id: requirement.id }}>
      <RequirementCard requirement={requirement} index={index} />
    </Link>
  );
}
