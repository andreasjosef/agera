import { Card } from "../primitives/Card";
import { Clock } from "lucide-react";
import { mergeStyles } from "../utils";

interface TimeSelectorProps {
  timeSeconds: number;
  setTime: (value: number) => void;
  title?: string;
  selectionMessage: string;
}

// Value in seconds
const timeOptions = [
  { label: "30 min", value: 30 * 60 },
  { label: "90 min", value: 90 * 60 },
  { label: "2 h", value: 120 * 60 },
  { label: "4 h", value: 240 * 60 },
] as const;

export function TimeSelector({
  timeSeconds = 30 * 60,
  setTime,
  title = "Hur mycket tid har du just nu?",
  selectionMessage,
}: TimeSelectorProps) {
  return (
    <Card className="grid gap-y-4">
      <div className="flex items-center gap-2">
        <Clock className="size-4 text-content-muted stroke-2"></Clock>
        <h3 className="text-xs font-bold tracking-widest text-content-muted uppercase">
          {title}
        </h3>
      </div>
      {/* TODO: This might be a primitive like radio menu or something */}
      {/* TODO: We can probably make this more accessable, but use buttons for now */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-app-surface-raised rounded-lg">
        {timeOptions.map(({ label, value }) => {
          const isActive = timeSeconds === value;

          return (
            <li key={value} className="grid">
              <button
                type="button"
                className={mergeStyles(
                  "py-2 px-1 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-brand-primary text-white shadow-sm"
                    : "border-app-border text-content-main",
                )}
                onClick={() => setTime(value)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-sm text-content-muted italic">{selectionMessage}</p>
    </Card>
  );
}
