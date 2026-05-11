import React from "react";

interface CardProps {
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export const Card = ({
  children,
  width = "w-full",
  className = "",
}: CardProps) => {
  return (
    <div
      className={`
        ${width}
        bg-app-surface 
        border-2 border-app-border
        rounded-sm
        p-6
        transition-all
        ${className}
      `}
      style={{
        boxShadow: "3px 3px 0px var(--color-app-shadow)",
      }}
    >
      {children}
    </div>
  );
};
