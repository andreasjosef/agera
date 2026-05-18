import { mergeStyles } from "../utils";
import { Card } from "../primitives/Card";

interface BodyDoublingSwitchProps {
  enabled: boolean;
  setIsEnable: (enabled: boolean) => void;
}

export function BodyDoublingSwitch({
  enabled,
  setIsEnable,
}: BodyDoublingSwitchProps) {
  return (
    <Card className="grid gap-y-2">
      <h3>Body Doubling</h3>
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
          On
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
          Off
        </button>
      </div>
    </Card>
  );
}
