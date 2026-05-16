import { statusMutations } from "@/modules/cockpit/api";
import { useTimer } from "@/modules/cockpit/store";
import { PomodoroTimer } from "@ccpilot/ui";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function PomodoroTimerManager() {
  // TODO: Display time remaining in title
  const {
    mode,
    isPaused,
    cyclesRemaining,
    timeRemainingSeconds,
    setTimeRemaining,
    setIsPaused,
    toggleMode,
  } = useTimer(
    useShallow((state) => ({
      mode: state.mode,
      isPaused: state.isPaused,
      cyclesRemaining: state.cyclesRemaining,
      timeRemainingSeconds: state.timeRemainingSeconds,
      setTimeRemaining: state.setTimeRemainingSeconds,
      setIsPaused: state.setIsPaused,
      toggleMode: state.toggleMode,
    })),
  );

  const { mutate: toggleStatusActive } = useMutation({
    mutationFn: statusMutations.toggleStatusActive,
    mutationKey: ["status"],
  });

  // Handle running pomodoro, toggle user status and current mode
  useEffect(() => {
    if (isPaused) {
      toggleStatusActive(false);
      return;
    }

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
      cyclesRemaining={cyclesRemaining}
      timeRemainingSeconds={timeRemainingSeconds}
      handleTogglePause={() => {
        toggleStatusActive(isPaused);
        setIsPaused(!isPaused);
      }}
      handleStop={() => {
        toggleStatusActive(false);
      }}
    />
  );
}
