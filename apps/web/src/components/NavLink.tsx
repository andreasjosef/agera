import { Link } from "@tanstack/react-router";
import { NavItem } from "@ccpilot/ui";
import { LucideIcon } from "lucide-react";

export interface NavLinkProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

export function NavLink({ to, label, icon }: NavLinkProps) {
  // NOTE: Just discovered this pattern below -> Function as Child ... pretty epic!
  return (
    <Link to={to}>
      {({ isActive }) => (
        <NavItem label={label} icon={icon} isActive={isActive} />
      )}
    </Link>
  );
}
