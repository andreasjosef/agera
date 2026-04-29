// TODO: These are generic for now. They should be tweaked more for our domain language
export const EnergyLevelValues = ["low", "medium", "high"] as const;

export const RequirementTypeValues = ["assignment", "lecture"] as const;
export const RequirementSourceValues = ["canvas"] as const;

export const StepGenerationStatusValues = [
  "RAW",
  "GENERATING",
  "COMPLETE",
  "ERROR",
] as const;
export const SyncStatusValues = [
  "INITIALIZED",
  "IDLE",
  "PROCESSING",
  "COMPLETE",
  "ERROR",
] as const;
