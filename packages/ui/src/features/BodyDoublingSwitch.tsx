import { mergeStyles } from "../utils";
import { Card } from "../primitives/Card";
import { Users } from "lucide-react";

interface BodyDoublingSwitchProps {
  enabled: boolean;
  setIsEnable: (enabled: boolean) => void;
  activeCount: number;
  onLabel?: string;
  offLabel?: string;
}

export function BodyDoublingSwitch({
  enabled,
  setIsEnable,
  activeCount,
  onLabel = "Gå med i flödet",
  offLabel = "Själv",
}: BodyDoublingSwitchProps) {
  return (
    <Card>
      <div className="grid space-y-4">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-content-muted stroke-2" />
          <h3 className="text-xs font-bold tracking-widest text-content-muted uppercase">
            Hur vill du plugga?
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-1 p-1 bg-app-surface-raised rounded-xl">
          <button
            type="button"
            onClick={() => setIsEnable(false)}
            className={mergeStyles(
              "py-2 text-sm font-semibold cursor-pointer rounded-lg",
              !enabled
                ? "bg-white text-content-main shadow-sm"
                : "text-content-muted",
            )}
          >
            {offLabel}
          </button>
          <button
            type="button"
            onClick={() => setIsEnable(true)}
            className={mergeStyles(
              "py-2 px-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer",
              enabled
                ? "bg-white text-content-main shadow-sm"
                : "text-content-muted",
            )}
          >
            <span
              className={mergeStyles(
                "size-2 rounded-full bg-brand-primary shrink-0",
                enabled ? "animate-pulse opacity-100" : "opacity-0",
              )}
            />
            {onLabel} ({activeCount})
          </button>
        </div>
      </div>
    </Card>
  );
}
