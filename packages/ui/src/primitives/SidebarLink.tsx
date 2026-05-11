import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarLink = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: SidebarLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-3 py-2 rounded-sm
        font-display text-sm font-medium transition-all duration-200 cursor-pointer
        ${
          isActive
            ? "bg-brand-primary text-white"
            : "text-content-muted hover:text-content-subtle"
        }
      `}
    >
      <Icon
        size={18}
        className={isActive ? "stroke-white" : "stroke-content-muted"}
      />
      <span className="tracking-wide">{label}</span>
    </button>
  );
};
