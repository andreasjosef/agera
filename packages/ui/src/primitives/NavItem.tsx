import { mergeStyles } from "../utils";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={mergeStyles(
        "w-full flex items-center gap-2 px-3 py-2 rounded-sm font-display text-sm font-medium transition-all duration-200 cursor-pointer text-clip",
        isActive
          ? "bg-brand-primary text-white"
          : "text-content-muted hover:text-content-subtle",
      )}
    >
      <Icon
        size={18}
        className={isActive ? "stroke-white" : "stroke-content-muted"}
      />
      <span className="tracking-wide sr-only md:not-sr-only">{label}</span>
    </button>
  );
};
