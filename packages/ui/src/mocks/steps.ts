import { ScoredStep } from "@ccpilot/domain";

export const mockStep: ScoredStep = {
  id: "step_123",
  requirementTitle: "u12 - Projektarbete",
  estimatedMinutes: 25,
  effectiveDeadline: new Date("2026-06-01"),
  dependencyOrder: 1,
  category: "deepwork",
  complexity: 5,
  curiosityTrigger: "How does this relate to this?",
  priorityScore: 0.98,
  stepKey: "skapa-drizzle-skiss",
  theWin: "Get going",
  action: "Skapa en första skiss av databasmodellen i Drizzle.",
  outcomeDefinition:
    "Du har en visuell karta över hur informationen flödar, vilket gör kodningen 50% snabbare.",
  quickStartLinkHint:
    "Öppna din anteckningsbok eller Excalidraw och rita tre boxar: User, Step, Requirement.",
};
