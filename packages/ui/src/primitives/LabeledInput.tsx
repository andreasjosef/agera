import React from "react";

interface LabeledInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
}

export function LabeledInput({ label, error, ...rest }: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-display text-xs font-semibold uppercase tracking-wider text-content-subtle">
        {label}
      </label>
      <input
        placeholder=""
        className="border-app-border border rounded-sm p-3 font-body font-light focus:ring-2 focus:ring-app-ring outline-none transition-all"
        {...rest}
      />
      {error && <p className="text-state-danger">{error}</p>}
    </div>
  );
}
