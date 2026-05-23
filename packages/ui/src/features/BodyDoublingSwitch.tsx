import { mergeStyles } from "../utils";
import { Card } from "../primitives/Card";

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
  onLabel = "On",
  offLabel = "Off",
}: BodyDoublingSwitchProps) {
  return (
    <Card className="grid gap-y-2">
      <h3 className="text-lg font-semibold">
        {activeCount > 0 ? (
          <>
            Vill du joina
            <span className="text-brand-primary">{activeCount}</span> andra som
            jobbar nu ?
          </>
        ) : (
          `Vill du ser hur många plugga med dig?`
        )}
      </h3>
      <div className="grid grid-cols-2 gap-x-2">
        <button
          type="button"
          className={mergeStyles(
            "rounded-sm border-2 p-2 w-full cursor-pointer",
            enabled
              ? "bg-brand-primary text-app-bg border-brand-primary"
              : "border-cod-gray-300 text-content-main",
          )}
          onClick={() => setIsEnable(true)}
        >
          {onLabel}
        </button>

        <button
          type="button"
          className={mergeStyles(
            "rounded-sm border-2 p-2 w-full cursor-pointer",
            !enabled
              ? "bg-brand-primary text-app-bg border-brand-primary"
              : "border-cod-gray-300 text-content-main",
          )}
          onClick={() => setIsEnable(false)}
        >
          {offLabel}
        </button>
      </div>
    </Card>
  );
}
