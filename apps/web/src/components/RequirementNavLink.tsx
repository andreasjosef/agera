import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { RequirementAnchor } from "@ccpilot/ui";

export interface RequirementNavLinkProps {
  id: string;
  children: ReactNode;
}

export function RequirementNavLink({ id, children }: RequirementNavLinkProps) {
  return (
    <Link to={"/app/requirements/$id"} params={{ id }}>
      <RequirementAnchor>{children}</RequirementAnchor>
    </Link>
  );
}
