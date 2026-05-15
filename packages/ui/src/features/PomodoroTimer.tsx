import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";

interface PomodoroTimerProps {
  /* NOTE: In future we can have long break as well, so this is why unions are used */
  mode: "focus" | "break";
  isPaused: boolean;
  timeRemainingSeconds: number;
  handleTogglePause: () => void;
  handleStop: () => void;
}

export function PomodoroTimer({
  mode,
  isPaused,
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
    <Card>
      <h3>{mode === "focus" ? "Focus Time" : "Short Break Time"}</h3>
      <span className="font-bold"> {formatTime(timeRemainingSeconds)} </span>
      <div className="grid grid-cols-2 gap-x-2">
        <Button onClick={handleTogglePause}>
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button onClick={handleStop}> Stop </Button>
      </div>
    </Card>
  );
}
