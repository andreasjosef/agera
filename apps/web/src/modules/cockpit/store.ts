import { create } from "zustand";

interface TimerState {
  // Setup (Cockpit)
  baseTime: number;
  selectionMessage: string;

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
}

interface BodyDoublingState {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}

// TODO: Should this be map object be here ?
const selectionTimeMessages = {
  1: "Kort och intensivt. Nu kör vi!", // 30 min
  3: "Perfekt för att hitta ditt flow.", // 90 min
  4: "Ambitiöst! Dags att djupdyka.", // 2 h
  8: "Ett maraton! Glöm inte pauser.", // 4 h
};

export const useTimer = create<TimerState>((set) => ({
  baseTime: 30 * 60,
  selectionMessage: selectionTimeMessages[1],
  mode: "focus",
  isPaused: true,
  timeRemainingSeconds: 25 * 60,
  // timeRemainingSeconds: 5, // If you want to test with shorter time
  cyclesRemaining: 1,

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
  setBaseTime: (seconds) => {
    return set(() => {
      const cycles = Math.floor(seconds / 1800);
      const message = selectionTimeMessages[cycles as 1 | 3 | 4 | 8];

      return {
        baseTime: seconds,
        selectionMessage: message,
        isPaused: true,
        mode: "focus",
        timeRemainingSeconds: 25 * 60,
        cyclesRemaining: cycles,
      };
    });
  },
}));

export const useBodyDoubling = create<BodyDoublingState>((set) => ({
  isEnabled: true,
  setIsEnabled: (value) => set({ isEnabled: value }),
}));
