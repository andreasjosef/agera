import { Card } from "../primitives/Card";
import { mergeStyles } from "../utils";

interface TimeSelectorProps {
  timeSeconds: number;
  setTime: (value: number) => void;
  title?: string;
  selectionMessage: string;
}

// Value in seconds
const timeOptions = [
  { label: "30 minuter", value: 30 * 60 },
  { label: "90 minuter", value: 90 * 60 },
  { label: "2 timmar", value: 120 * 60 },
  { label: "4 timmar", value: 240 * 60 },
] as const;

export function TimeSelector({
  timeSeconds = 30 * 60,
  setTime,
  title = "Total Focus Time",
  selectionMessage,
}: TimeSelectorProps) {
  return (
    <Card className="grid gap-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {/* TODO: This might be a primitive like radio menu or something */}
      {/* TODO: We can probably make this more accessable, but use buttons for now */}
      <ul className="grid grid-cols-2 gap-2">
        {timeOptions.map(({ label, value }) => {
          const isActive = timeSeconds === value;

          return (
            <li className="grid">
              <button
                type="button"
                className={mergeStyles(
                  "rounded-sm border-2 p-2 w-full cursor-pointer",
                  isActive
                    ? "bg-brand-primary text-app-bg border-brand-primary"
                    : "border-cod-gray-300 text-content-main",
                )}
                onClick={() => setTime(value)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-base text-cod-gray-700 font-medium">
        {selectionMessage}
      </p>
    </Card>
  );
}
