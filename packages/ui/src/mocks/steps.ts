import { ScoredStep } from "@ccpilot/domain";

export const mockStep: ScoredStep = {
  id: "step_123",
  requirementId: "",
  requirementTitle: "u12 - Projektarbete",
  estimatedMinutes: 25,
  effectiveDeadline: new Date("2026-06-01"),
  dependencyOrder: 1,
  category: "deepwork",
  complexity: 5,
  complete: false,
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

export const mockUpcomingSteps: ScoredStep[] = [
  {
    id: "step_124",
    requirementId: "",
    requirementTitle: "u12 - Projektarbete",
    estimatedMinutes: 45,
    effectiveDeadline: new Date("2026-06-01"),
    dependencyOrder: 2,
    category: "deepwork",
    complexity: 7,
    complete: false,
    curiosityTrigger:
      "How does Drizzle handle relational mapping compared to Prisma?",
    priorityScore: 0.95,
    stepKey: "implementera-drizzle-schema",
    theWin: "Schema locked",
    action: "Översätt din Drizzle-skiss till kod och kör din första migration.",
    outcomeDefinition:
      "Databasen är nu redo att lagra riktig data, vilket tar oss från skiss till fungerande prototyp.",
    quickStartLinkHint:
      "Kör 'pnpm drizzle-kit generate' och titta i mappen /migrations för att se vad som skapades.",
  },
  {
    id: "step_125",
    requirementId: "",
    requirementTitle: "u12 - Projektarbete",
    estimatedMinutes: 30,
    effectiveDeadline: new Date("2026-06-02"),
    dependencyOrder: 3,
    category: "admin",
    complexity: 3,
    complete: false,
    curiosityTrigger: "What is the smallest possible payload we can send?",
    priorityScore: 0.88,
    stepKey: "skapa-api-endpoint",
    theWin: "Pipe connected",
    action:
      "Skapa en GET-endpoint i din API-modul för att hämta UpcomingSteps.",
    outcomeDefinition:
      "Frontenden kan nu prata med backenden, vilket eliminerar behovet av lokala mockar i web-appen.",
    quickStartLinkHint:
      "Kopiera din befintliga 'getTopStep' endpoint och justera den för att returnera en array istället.",
  },
  {
    id: "step_126",
    requirementId: "",
    requirementTitle: "u12 - Projektarbete",
    estimatedMinutes: 60,
    effectiveDeadline: new Date("2026-06-03"),
    dependencyOrder: 4,
    category: "deepwork",
    complexity: 6,
    complete: false,
    curiosityTrigger: "Can we use CSS Grid to make this look like a timeline?",
    priorityScore: 0.82,
    stepKey: "bygg-upcoming-steps-ui",
    theWin: "Visibility achieved",
    action: "Bygg grundskalet för UpcomingSteps-komponenten i UI-paketet.",
    outcomeDefinition:
      "Användaren kan nu se sin framtid, vilket minskar stressen över vad som kommer härnäst.",
    quickStartLinkHint:
      "Börja med en enkel map() över mockSteps och använd din nya NavItem-primitiv för varje rad.",
  },
];

export const mockConnectionGuideSteps = [
  {
    title: "Logga in",
    content: "Logga in på ditt Canvas-konto för att komma till din översikt.",
  },
  {
    title: "Öppna inställningar",
    content:
      "Klicka på 'Konto' i sidomenyn och välj sedan 'Inställningar' i listan.",
  },
  {
    title: "Skapa token",
    content:
      "Skrolla ner till 'Godkända integreringar' och klicka på '+ Ny åtkomsttoken'. Generera din token och kopiera den.",
  },
  {
    title: "Anslut konto",
    content:
      "Gå tillbaka hit och klistra in din token i integrationsinställningarna för att slutföra installationen.",
  },
];
