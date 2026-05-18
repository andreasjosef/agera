import { create } from "zustand";

interface TimerState {
  // Setup (Cockpit)
  baseTime: number;

  // Execution (Now)
  mode: "focus" | "break";
  isPaused: boolean;
  timeRemainingSeconds: number;
  cyclesRemaining: number;

  // Actions
  setBaseTime: (seconds: number) => void;
  setTimeRemainingSeconds: (seconds: number) => void;
  setIsPaused: (isPaused: boolean) => void;
  toggleMode: () => void;
  submitBaseTime: () => void;
}

export const useTimer = create<TimerState>((set) => ({
  baseTime: 30 * 60,
  mode: "focus",
  isPaused: true,
  timeRemainingSeconds: 25 * 60,
  // timeRemainingSeconds: 5, // If you want to test with shorter time
  cyclesRemaining: 1,

  setBaseTime: (seconds) => set({ baseTime: seconds }),
  setTimeRemainingSeconds: (seconds) => set({ timeRemainingSeconds: seconds }),
  setIsPaused: (isPaused) => set({ isPaused }),
  toggleMode: () => {
    return set((state) => {
      const isModeFocus = state.mode === "focus";
      const cyclesRemaining = isModeFocus
        ? state.cyclesRemaining
        : state.cyclesRemaining - 1;

      console.log("cycles remaining", cyclesRemaining);

      return {
        mode: isModeFocus ? "break" : "focus",
        isPaused: true,
        timeRemainingSeconds: isModeFocus ? 5 * 60 : 25 * 60,
        // timeRemainingSeconds: isModeFocus ? 5 : 5, // For test
        cyclesRemaining,
      };
    });
  },
  submitBaseTime: () => {
    return set((state) => {
      const cycles = Math.floor(state.baseTime / 1800);
      console.log("cycles amount", cycles);

      return {
        isPaused: true,
        mode: "focus",
        timeRemainingSeconds: 25 * 60,
        cyclesRemaining: cycles,
      };
    });
  },
}));
