import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";
import { ClockFading } from "lucide-react";

interface PomodoroTimerProps {
  /* NOTE: In future we can have long break as well, so this is why unions are used */
  mode: "focus" | "break";
  isPaused: boolean;
  cyclesRemaining: number;
  timeRemainingSeconds: number;
  handleTogglePause: () => void;
  handleStop: () => void;
}

export function PomodoroTimer({
  mode,
  isPaused,
  cyclesRemaining,
  timeRemainingSeconds,
  handleTogglePause,
  handleStop,
}: PomodoroTimerProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Card className="grid gap-y-1">
      <header className="flex justify-between items-center">
        <h3>{mode === "focus" ? "Focus Time" : "Short Break Time"}</h3>
        <span className="flex gap-x-2">
          <ClockFading /> {cyclesRemaining}
        </span>
      </header>
      <span className="font-bold text-2xl">
        {formatTime(timeRemainingSeconds)}
      </span>
      <div className="grid grid-cols-2 gap-x-2">
        <Button onClick={handleTogglePause} disabled={!cyclesRemaining}>
          {isPaused ? "Start" : "Pause"}
        </Button>
        <Button onClick={handleStop}> Stop </Button>
      </div>
    </Card>
  );
}
