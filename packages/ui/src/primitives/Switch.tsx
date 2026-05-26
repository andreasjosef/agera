import { mergeStyles } from "../utils";

interface SwitchProps {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  onLabel: string;
  offLabel: string;
}

export function Switch({
  isEnabled,
  setIsEnabled,
  onLabel,
  offLabel,
}: SwitchProps) {
  return (
    <div className="grid grid-cols-2 gap-1 p-1 bg-app-surface-raised rounded-xl">
      <button
        type="button"
        onClick={() => setIsEnabled(true)}
        className={mergeStyles(
          "py-2 text-sm font-semibold cursor-pointer rounded-lg",
          isEnabled
            ? "bg-white text-content-main shadow-sm"
            : "text-content-muted",
        )}
      >
        {onLabel}
      </button>

      <button
        type="button"
        onClick={() => setIsEnabled(false)}
        className={mergeStyles(
          "py-2 text-sm font-semibold cursor-pointer rounded-lg",
          !isEnabled
            ? "bg-white text-content-main shadow-sm"
            : "text-content-muted",
        )}
      >
        {offLabel}
      </button>
    </div>
  );
}
