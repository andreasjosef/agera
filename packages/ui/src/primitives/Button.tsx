import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  isLoading,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className="cursor-pointer relative bg-brand-primary text-white uppercase px-6 py-2 rounded-sm font-display font-semibold tracking-widest transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-hover"
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className={isLoading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}
