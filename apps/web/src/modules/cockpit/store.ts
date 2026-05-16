import { create } from "zustand";

interface CockpitSettingsState {
  timeMs: number;
  setTime: (timeMs: number) => void;
}

export const useCockpitSettings = create<CockpitSettingsState>((set) => ({
  timeMs: 30 * 60 * 1000,
  setTime: (timeMs) => set({ timeMs }),
}));
