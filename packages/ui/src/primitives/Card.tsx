import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  width?: string;
  className?: string;
  variant?: "default" | "warm" | "subtle";
  noShadow?: boolean;
}

export const Card = ({
  children,
  title,
  width = "w-full",
  className = "",
  variant = "default",
  noShadow = true,
}: CardProps) => {
  const variantStyles = {
    default: "bg-app-surface border-2 border-app-border",
    warm: "bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-violet-50/30 border-2 border-orange-100/70",
    subtle: "bg-zinc-50/50 border border-zinc-100/80 shadow-none",
  };

  const hasCustomShadow = variant !== "subtle" && !noShadow;

  return (
    <div
      className={`
        ${width}
        ${variantStyles[variant]}
        rounded-sm
        p-6
        transition-all
        duration-300
        ${className}
      `}
      style={
        hasCustomShadow
          ? { boxShadow: "3px 3px 0px var(--color-app-shadow)" }
          : undefined
      }
    >
      {title && (
        <h2 className="text-xl font-bold tracking-tight text-zinc-800 mb-4">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
