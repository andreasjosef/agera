import React from "react";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { mergeStyles } from "../utils";

interface TimeSelectorProps {
  timeMs: number;
  setTime: (value: number) => void;
  handleSelectSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

const timeOptions = [
  { label: "30 min", value: 30 * 60 * 1000 },
  { label: "90 min", value: 90 * 60 * 1000 },
  { label: "2 h", value: 120 * 60 * 1000 },
  { label: "4 h", value: 240 * 60 * 1000 },
] as const;

export function TimeSelector({
  timeMs = 1800000,
  setTime,
  handleSelectSubmit,
}: TimeSelectorProps) {
  return (
    <Card className="grid gap-y-2">
      <h3>Focus Time</h3>
      {/* TODO: This might be a primitive like radio menu or something */}

      <form className="grid gap-y-2" onSubmit={handleSelectSubmit}>
        {/* TODO: We can probably make this more accessable, but use buttons for now */}
        <ul className="grid grid-cols-4 gap-x-2">
          {timeOptions.map(({ label, value }) => {
            const isActive = timeMs === value;

            return (
              <li className="block">
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

        <Button type="submit"> Select </Button>
      </form>
    </Card>
  );
}
