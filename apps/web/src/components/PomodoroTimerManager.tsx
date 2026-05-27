import { useToggleAcitve } from "@/modules/cockpit/hooks";
import { useTimer } from "@/modules/cockpit/store";
import { PomodoroTimer } from "@ccpilot/ui";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function PomodoroTimerManager() {
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
  const { toggleStatusActive } = useToggleAcitve();

  const navigate = useNavigate();

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
        navigate({ to: "/app/cockpit" });
      }}
    />
  );
}
