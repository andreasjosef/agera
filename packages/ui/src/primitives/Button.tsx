import { mergeStyles } from "../utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "muted";
  isLoading?: boolean;
}

const variantStyles = {
  primary:
    "cursor-pointer relative bg-brand-primary text-white uppercase px-6 py-2 rounded-sm font-display font-semibold tracking-widest transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-hover",
  secondary:
    "cursor-pointer relative text-brand-primary border border-brand-primary uppercase px-6 py-2 rounded-sm font-display font-semibold tracking-widest transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:bg-brand-hover hover:border-transparent hover:text-white",
  ghost:
    "text-brand-primary cursor-pointer hover:text-brand-hover hover:underline focus:text-brand-hover focus:underline disabled:opacity-50 disabled:pointer-events-none relative",
  outline:
    "cursor-pointer relative border-2 border-content-subtle text-content-main uppercase px-6 py-2 rounded-sm font-display font-semibold tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:bg-app-surface-hover",
  muted:
    "cursor-pointer relative bg-app-surface-hover text-content-main uppercase px-6 py-2 rounded-sm font-display font-semibold tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:bg-app-surface-hover",
};

export function Button({
  children,
  variant = "primary",
  isLoading,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={mergeStyles(variantStyles[variant], className)}
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
