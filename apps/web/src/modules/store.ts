import { create } from "zustand";

interface AppState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (value) => set({ isSidebarOpen: value }),
}));
