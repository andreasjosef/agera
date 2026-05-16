import { useTimer } from "@/modules/cockpit/store";
import { PomodoroTimer } from "@ccpilot/ui";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function PomodoroTimerManager() {
  // TODO: Display time remaining in title
  const {
    mode,
    isPaused,
    timeRemainingSeconds,
    setTimeRemaining,
    setIsPaused,
    toggleMode,
  } = useTimer(
    useShallow((state) => ({
      mode: state.mode,
      isPaused: state.isPaused,
      timeRemainingSeconds: state.timeRemainingSeconds,
      setTimeRemaining: state.setTimeRemainingSeconds,
      setIsPaused: state.setIsPaused,
      toggleMode: state.toggleMode,
    })),
  );

  useEffect(() => {
    if (isPaused) return;

    // NOTE: For now this just switches from 25 min to 5 min
    if (timeRemainingSeconds <= 0) {
      toggleMode();
    }

    const interval = setInterval(() => {
      console.log("tick tack tick tack");
      setTimeRemaining(timeRemainingSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeRemainingSeconds]);

  return (
    <PomodoroTimer
      mode={mode}
      isPaused={isPaused}
      timeRemainingSeconds={timeRemainingSeconds}
      handleTogglePause={() => setIsPaused(!isPaused)}
      handleStop={() => {
        // TODO: Toggle user status and navigate to /app/cockpit
        console.log("handle stop");
      }}
    />
  );
}
