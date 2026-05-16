import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  width?: string;
  className?: string;
}

export const Card = ({
  children,
  title,
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
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};
