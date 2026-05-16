import { create } from "zustand";

interface TimerState {
  // Setup (Cockpit)
  baseTime: number;

  // Execution
  mode: "focus" | "break";
  isPaused: boolean;
  timeRemainingSeconds: number;
  cyclesRemaining: number;

  setBaseTime: (seconds: number) => void;
  setTimeRemainingSeconds: (seconds: number) => void;
  setIsPaused: (isPaused: boolean) => void;
  toggleMode: () => void;
}

export const useTimer = create<TimerState>((set) => ({
  baseTime: 30 * 60,
  mode: "focus",
  isPaused: true,
  timeRemainingSeconds: 25 * 60,
  cyclesRemaining: 0,

  setBaseTime: (seconds) => set({ baseTime: seconds }),
  setTimeRemainingSeconds: (seconds) => set({ timeRemainingSeconds: seconds }),
  setIsPaused: (isPaused) => set({ isPaused }),
  toggleMode: () => {
    return set((state) => {
      const mode = state.mode;
      return {
        mode: mode === "focus" ? "break" : "focus",
        timeRemainingSeconds: mode === "focus" ? 5 * 60 : 25 * 60,
        isPaused: true,
      };
    });
  },
}));
