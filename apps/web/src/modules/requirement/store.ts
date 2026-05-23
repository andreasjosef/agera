import { create } from "zustand";

type StepFilterType = "all" | "done" | "todo";

interface RequirementState {
  stepFilter: StepFilterType;
  setStepFilter: (filter: StepFilterType) => void;
}

export const useRequirementStore = create<RequirementState>((set) => ({
  stepFilter: "all",
  setStepFilter: (filter) => set({ stepFilter: filter }),
}));
