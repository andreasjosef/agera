import {
  calculatePriority,
  type Requirement,
  type Step,
} from "@ccpilot/domain";

export const MOCK_REQUIREMENT: Requirement = {
  id: "req-123",
  title: "Term Paper: AI Ethics & Society",
  due: new Date(Date.now() + 48 * 60 * 60 * 1000).toString(), // 48h from now
  status: "COMPLETE",
  updatedAt: new Date(),
  steps: [],
  source: "CANVAS",
  type: "assignment",
};

export const MOCK_STEPS: Step[] = [
  {
    id: "005fdc30-c352-46b6-a3b8-c9db82db37ae",
    stepKey: "align-challenge-and-curriculum-goals",
    action: "Bekräfta sammanfattningen av projekt- och kursmål.",
    outcomeDefinition:
      "Projekt- och kursmål är sammanfattade och ingen del är tvetydig.",
    curiosityTrigger:
      "Identifiera vilken teknik som bäst matchar er befintliga kompetens och utvecklingsbehov.",
    theWin: "En gemensam förståelse för vad som ska levereras och lära sig.",
    category: "planning",
    complexity: 1,
    estimatedMinutes: 30,
    dependencyOrder: 1,
    quickStartLinkHint:
      "Inlämningsanvisning och kursplan i Chas Challenge-dokumentationen.",
  },
  {
    id: "dc856572-413b-4c37-8eb3-f51dc01f5311",
    stepKey: "architect-stack-and-infrastructure",
    action: "Arkitektera den fullstack-teknik som ska användas.",
    outcomeDefinition:
      "Val av frontend-ramverk, backend-teknik, databas, säkerhet och API-standard är dokumenterat och beslutfatt.",
    curiosityTrigger:
      "Vilken kombination av Vite/Next.js, Node.js/Express, PostgresSQL och ORM ger snabbaste feedback-loop?",
    theWin:
      "En modulär och skalbar mall för backend och frontend som kan underhållas och utvecklas vidare.",
    category: "deepwork",
    complexity: 2,
    estimatedMinutes: 60,
    dependencyOrder: 2,
    quickStartLinkHint:
      "Teknikstack-dokumentation och exempellösningar från tidigare Chas Challenge-iterationer.",
  },
  {
    id: "09ffb742-75b5-454b-8274-8c3c1336e761",
    stepKey: "plan-sprints-and-deliverables",
    action: "Planera agila avstämningar och milstolpar.",
    outcomeDefinition:
      "En tidslinje med sprintmål, teknisk handledning och leveranser är strukturerad.",
    curiosityTrigger:
      "Hur kan vi dela upp arbetet för att minimera distraktion och maximera fokuspunkten?",
    theWin:
      "Gruppen har en tydlig plan för vecka 13–22 med klar ägare för varje delmål.",
    category: "planning",
    complexity: 1,
    estimatedMinutes: 45,
    dependencyOrder: 3,
    quickStartLinkHint:
      "Agendamall för veckovisa avstämningar i Projektmetodik och agila metoder.",
  },
  {
    id: "4405bb76-3110-475b-b4f9-c19cd98de8d8",
    stepKey: "setup-repository-and-collaboration",
    action: "Etablera gemensamt Git-repository och arbetsformer.",
    outcomeDefinition:
      "Gitlab-länk, branches, commit-convention och kodstandard är etablerade.",
    curiosityTrigger:
      "Vilket workflows-sätt (t.ex. branch-per-feature, trunk-based) bäst passar er grupps stil?",
    theWin: "En ren och delbar kodbas där alla kan bidra utan konflikter.",
    category: "admin",
    complexity: 1,
    estimatedMinutes: 30,
    dependencyOrder: 4,
    quickStartLinkHint:
      "Gitlab-mal för Chas Challenge-team och dokument för inlämning.",
  },
  {
    id: "f3187ef7-f258-49b9-af9c-7279c50e7ec3",
    stepKey: "implement-core-frontend-and-state",
    action: "Utveckla frontend med React och global state-hantering.",
    outcomeDefinition:
      "En fungerande UI med rutinerad navigering och central lagring av app-state.",
    curiosityTrigger:
      "Vilken state-hanteringsstrategi ger mest läsbarhet och prestanda för er app?",
    theWin:
      "Konsistent användargränssnitt som reagerar snabbt på användarinput utan reload.",
    category: "deepwork",
    complexity: 3,
    estimatedMinutes: 120,
    dependencyOrder: 5,
    quickStartLinkHint:
      "Exempel på React-router, Zustand/Context och valideringsbibliotek.",
  },
  {
    id: "2d90abbc-01d0-4958-bca1-fd7efc216b0b",
    stepKey: "build-rest-api-with-typescript",
    action: "Implementera RESTful API med Node.js, Express och TypeScript.",
    outcomeDefinition:
      "Ett stabilt API med anslutning till PostgresSQL, inklusive typer och säker hantering av begäranden.",
    curiosityTrigger:
      "Hur kan vi designa API:et för att vara lättmöjligt att testa och dokumentera?",
    theWin:
      "En backend-tjänst som svarar korrekt på CRUD-åtgärder med autentisering ogiltig indata.",
    category: "deepwork",
    complexity: 3,
    estimatedMinutes: 120,
    dependencyOrder: 6,
    quickStartLinkHint:
      "REST-API-mönster och ORM-exempel för Postgres med Typescript.",
  },
  {
    id: "96f1a6cd-ecd9-442e-a72d-af3b62f34268",
    stepKey: "secure-sessions-and-validation",
    action: "Implementera säkerhet för lösenord, token och indatavalidering.",
    outcomeDefinition:
      "Säker hantering av autentisering och skydd mot vanliga sårbarheter.",
    curiosityTrigger:
      "Vilka säkerhetsprack är viktigast att bekräfta först för att undvika teknisk teknisk skuld?",
    theWin:
      "Användaren kan logga in och interagera tryggt, med minimirisk för injektion eller obehörig åtkomst.",
    category: "deepwork",
    complexity: 2,
    estimatedMinutes: 60,
    dependencyOrder: 7,
    quickStartLinkHint:
      "Security-riktlinjer för Node.js/Express och valideringsbibliotek.",
  },
  {
    id: "a448b051-0d50-4f1f-8690-cb4cc3517a44",
    stepKey: "test-integrate-deploy",
    action: "Testa, integrera och förbereda för leverans.",
    outcomeDefinition:
      "Alla delar är sammankopplade, testade och redo för driftsättning.",
    curiosityTrigger:
      "Vilken teststrategi (unit, integration, e2e) ger mest säkerhet med minsta overhead?",
    theWin:
      "En stabil driftmiljö där både frontend och backend svarar som förväntat.",
    category: "polish",
    complexity: 2,
    estimatedMinutes: 60,
    dependencyOrder: 8,
    quickStartLinkHint:
      "Testverktyg och CI/CD-mall för React/Node/Postgres i Chas Challenge.",
  },
  {
    id: "d91546be-1b4a-495f-961f-1d0c80d77d02",
    stepKey: "finalize-readme-and-deliver",
    action: "Slutför teknisk dokumentation och lämnar in projektet.",
    outcomeDefinition:
      "En välskriven Readme med beskrivning, setup och API-dokumentation är klar.",
    curiosityTrigger:
      "Vad är den enklaste vägen att förklara hela lösningen på 5 minuter?",
    theWin: "Inlämningen är komplett, ren och klar för juryn och besökare.",
    category: "polish",
    complexity: 1,
    estimatedMinutes: 45,
    dependencyOrder: 9,
    quickStartLinkHint: "Mall för Readme och kontrolllista för inlämning.",
  },
  {
    id: "d2155a18-411b-46ea-a146-7878968f395e",
    stepKey: "demo-pitch-preparation",
    action: "Förbereda och vara redo för finalpitch.",
    outcomeDefinition:
      "En klar pitchesida och svar på förväntade frågor från jury och besökare.",
    curiosityTrigger:
      "Vilken historia om projektet blir mest inspirerande och lättillgänglig för en bred publik?",
    theWin:
      "Groupen förmedlar värdet med entusiasm och svarar säkert på frågor.",
    category: "decisions",
    complexity: 1,
    estimatedMinutes: 45,
    dependencyOrder: 10,
    quickStartLinkHint:
      "Tidigare presentationer och prototyper från Chas Challenge.",
  },
];

export const TEST_ENGINE_CONTEXTS = {
  // Scenario: Student is tired (E=3), reality is harsh (ρ=1.5)
  exhausted: {
    realityFactor: 1.5,
    userEnergy: 3,
    horizonHours: 168, // 7 days
  },
  // Scenario: Fresh morning (E=9), highly efficient (ρ=1.0)
  focused: {
    realityFactor: 1.0,
    userEnergy: 9,
    horizonHours: 72, // 3 days (makes pressure feel higher)
  },
};

const prioritizedStepsFocused = calculatePriority(
  MOCK_REQUIREMENT,
  MOCK_STEPS,
  TEST_ENGINE_CONTEXTS.focused,
);

const prioritizedStepsTired = calculatePriority(
  MOCK_REQUIREMENT,
  MOCK_STEPS,
  TEST_ENGINE_CONTEXTS.exhausted,
);

prioritizedStepsFocused.forEach((step) =>
  console.log(
    `[EF ENGINE] score calc FOCUSED: step: ${step.stepKey}, depOrder: ${step.dependencyOrder}, score: ${step.priorityScore}`,
  ),
);

prioritizedStepsTired.forEach((step) =>
  console.log(
    `[EF ENGINE] score calc TIRED: step: ${step.stepKey}, ${step.effectiveDeadline}`,
  ),
);
