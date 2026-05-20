import React from "react";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { mergeStyles } from "../utils";

interface TimeSelectorProps {
  timeSeconds: number;
  setTime: (value: number) => void;
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
}: TimeSelectorProps) {
  return (
    <Card className="grid gap-y-2">
      <h3>Total Focus Time</h3>
      {/* TODO: This might be a primitive like radio menu or something */}

      {/* TODO: We can probably make this more accessable, but use buttons for now */}
      <ul className="grid grid-cols-4 gap-x-2">
        {timeOptions.map(({ label, value }) => {
          const isActive = timeSeconds === value;

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
    </Card>
  );
}
