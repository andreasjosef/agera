import {
  type Requirement,
  generateSteps,
  RequirementSchema,
} from "@ccpilot/domain";
import { zodRawParser, fetchList } from "@ccpilot/ts-fetch";
import { createLLMClient } from "@ccpilot/llm-client";
import { createRequirementRepo, db } from "@ccpilot/persistence";
import { randomUUID, sign } from "node:crypto";
//import { createJwtClient } from "@ccpilot/auth-jwt";

const llmClient = createLLMClient();
const reqRepo = createRequirementRepo(db);
//const jwtClient = createJwtClient();

const requirment: Requirement = {
  id: randomUUID(),
  title: "Complete Canvas Module Assignment",
  due: "2026-04-15T23:59:59Z",
  type: "assignment",
  source: "canvas",
  steps: [
    {
      id: randomUUID(),
      stepKey: "test",
      action: "",
      outcomeDefinition: "",
      curiosityTrigger: "",
      theWin: "",
      category: "deepwork",
      complexity: 1,
      estimatedMinutes: 1,
      dependencyOrder: 1,
      quickStartLinkHint: "",
    },
  ],
};

const labPrompt = `💻 Laboration: Tester i frontend
🎯 Kursmål
Testa med Jest och React Testing Library.

📖 Introduktion
I denna laboration ska du skriva automatiserade tester för en befintlig React-applikation — Budgetplaneraren. Appen låter användaren lägga till inkomster och utgifter, se sin balans, och filtrera transaktioner.
Du ska skriva enhetstester och integrationstester med Vitest och React Testing Library (RTL). Koden är redan skriven — din uppgift är att testa den.

🚀 Kom igång
1. Klona repot och gå till starter-mappen
cd starter

2. Installera beroenden
npm install

3. Verifiera att allt fungerar
# Starta appen (för att utforska den)
npm run dev# Kör tester en gång
npm run test:run

Det finns redan ETT exempeltest i src/utils/__tests__/formatCurrency.test.ts. Kör npm run test:run och verifiera att det passerar innan du går vidare.
Utforska appen i webbläsaren innan du börjar skriva tester. Förstå vad den gör ur en användares perspektiv.

Vitest, React Testing Library och alla konfigurationsfiler är redan uppsatta åt dig. Vill du förstå vad som konfigurerades, se SETUP.md.
📂 Befintliga filer du ska testa
src/
├── utils/
│   ├── formatCurrency.ts         # Formaterar belopp till "X.XX kr"
│   ├── calculations.ts           # calculateTotal, calculateTotalByType, calculateByCategory
│   └── filterTransactions.ts     # filterTransactions — filtrerar på typ, kategori, sökterm
├── components/
│   ├── TransactionForm.tsx       # Formulär för att lägga till transaktion
│   ├── TransactionList.tsx       # Visar lista med transaktioner
│   ├── TransactionFilter.tsx     # Sök och filtreringskontroller
│   └── Balance.tsx               # Visar balans, inkomster, utgifter

📁 Var ska testfilerna ligga?
Placera dina testfiler enligt detta mönster:

Util-tester: src/utils/__tests__/filnamn.test.ts
Komponenttester: src/components/__tests__/Komponent.test.tsx
✅ Del 1 — Enhetstester
Skriv enhetstester för de tre util-filerna. Dessa är rena funktioner utan React-beroenden.

1.1 formatCurrency
Fil: src/utils/__tests__/formatCurrency.test.ts (utöka det befintliga testet)
Testa att funktionen:

Formaterar heltal korrekt (t.ex. 100 → "100.00 kr")
Formaterar decimaltal korrekt (t.ex. 49.9 → "49.90 kr")
Hanterar 0
Hanterar negativa tal
1.2 calculations
Fil: src/utils/__tests__/calculations.test.ts
Du behöver skapa testdata — en array med Transaction-objekt. Se src/types.ts för typdefinitionen.
Tips: Skapa en const med testdata högst upp i filen, t.ex:

const testTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Lön',
    amount: 25000,
    type: 'income',
    category: 'salary',
    date: '2025-04-01',
  },
  {
    id: '2',
    description: 'Hyra',
    amount: 8000,
    type: 'expense',
    category: 'housing',
    date: '2025-04-01',
  },
  // Lägg till fler...]

Testa:
calculateTotal

Returnerar korrekt balans (inkomster minus utgifter)
Returnerar 0 för en tom array
Hanterar enbart inkomster
Hanterar enbart utgifter
calculateTotalByType

Summerar korrekt för 'income'
Summerar korrekt för 'expense'
Returnerar 0 om inga transaktioner matchar typen
calculateByCategory

Returnerar ett objekt med rätt summor per kategori
Räknar bara utgifter (inte inkomster)
Returnerar 0 för kategorier utan transaktioner
1.3 filterTransactions ⭐ Bonusuppgift
Fil: src/utils/__tests__/filterTransactions.test.ts
Testa:

Returnerar alla transaktioner om inga filter är satta ({})
Filtrerar på type ('income' / 'expense')
Filtrerar på category
Filtrerar på searchTerm (ska vara case-insensitive)
Kombinerar flera filter samtidigt
Returnerar tom array om inget matchar
⚛️ Del 2 — Komponenttester med RTL
Nu testar du React-komponenter. Här använder du render, screen, och userEvent från Testing Library.
Viktiga imports:

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

2.1 Balance
Fil: src/components/__tests__/Balance.test.tsx
Testa att komponenten:

Visar korrekt balans baserat på transaktioner
Visar total inkomst
Visar total utgift
Visar "0.00 kr" för alla värden om transaktionslistan är tom
Tips: Rendera med render(<Balance transactions={testTransactions} />) och använd screen.getByText() för att hitta de renderade värdena.

2.2 TransactionList ⭐ Bonusuppgift
Fil: src/components/__tests__/TransactionList.test.tsx
Testa att komponenten:

Visar meddelandet "Inga transaktioner att visa" när listan är tom
Renderar alla transaktioner i listan
Visar beskrivning, belopp och kategori för varje transaktion
Anropar onDeleteTransaction med rätt id när man klickar "Ta bort"
Tips för delete-testet:

const mockDelete = vi.fn()
render(<TransactionList transactions={data} onDeleteTransaction={mockDelete} />)
await userEvent.click(screen.getByRole('button', { name: 'Ta bort Hyra' }))
expect(mockDelete).toHaveBeenCalledWith('2')

2.3 TransactionForm ⭐ Bonusuppgift
Fil: src/components/__tests__/TransactionForm.test.tsx
Testa att komponenten:

Renderar alla formulärfält (beskrivning, belopp, typ, kategori)
Visar felmeddelande "Beskrivning krävs" vid tom beskrivning
Visar felmeddelande "Ange ett giltigt belopp större än 0" vid ogiltigt belopp
Anropar onAddTransaction med korrekt data vid giltig input
Rensar formuläret efter lyckad submit
Tips för formulärinteraktion:

const mockAdd = vi.fn()
render(<TransactionForm onAddTransaction={mockAdd} />)
await userEvent.type(screen.getByLabelText('Beskrivning'), 'Lunch')
await userEvent.type(screen.getByLabelText('Belopp (kr)'), '85')
await userEvent.click(screen.getByRole('button', { name: 'Lägg till' }))
expect(mockAdd).toHaveBeenCalledTimes(1)
expect(mockAdd).toHaveBeenCalledWith(
  expect.objectContaining({
    description: 'Lunch',
    amount: 85,
    type: 'expense',
    category: 'other',
  }))

2.4 TransactionFilter ⭐ Bonusuppgift
Fil: src/components/__tests__/TransactionFilter.test.tsx
Testa att komponenten:

Sökfältet anropar onFilterChange med rätt searchTerm
Typ-dropdown anropar onFilterChange med rätt type
Kategori-dropdown anropar onFilterChange med rätt category
2.5 App-komponenten — integrationstest ⭐ Bonusuppgift
Fil: src/__tests__/App.test.tsx
Skriv tester som renderar hela App-komponenten och verifierar att:

De fördefinierade transaktionerna visas
Man kan lägga till en ny transaktion via formuläret och se den i listan
Man kan ta bort en transaktion och se att den försvinner
Filtrering fungerar (sök på text och se att listan uppdateras)
Obs: Dessa tester är mer komplexa eftersom flera komponenter samverkar. Du behöver inte mocka något — rendera bara <App />.
Tips: Om getByText hittar flera element (t.ex. "Lön" finns som både beskrivning och kategori-label) kan du använda within() för att begränsa sökningen:

import { within } from '@testing-library/react'
const list = screen.getByRole('list')
expect(within(list).getByText('Hyra')).toBeInTheDocument()

🌍 Del 3 — Utforskande uppgift ⭐ Bonusuppgift
Utforska Cypress eller Playwright
Installera Cypress eller Playwright och skriv ett E2E-test som:

Startar appen
Lägger till en transaktion via formuläret
Verifierar att transaktionen syns i listan
Verifierar att balansen har uppdaterats
Cypress:

npm install -D cypress
npx cypress open

Playwright:

npm install -D @playwright/test
npx playwright install

Dokumentera kortfattat i en kommentar i testfilen: vad är skillnaden mellan detta E2E-test och dina RTL-tester?
🎓 Examination
Examinationen består av två delar:

Del A — Visa upp din kod
Alla tester i Del 1 (1.1, 1.2) och Del 2 (2.1) är skrivna och passerar vid npm run test:run
Del B — Muntlig redovisning
Du ska kunna redogöra för följande frågor för din lärare:

Varför vill man skriva tester?
När är det bra att skriva tester, och när är det inte bra?
Vad är skillnaden mellan enhetstester, integrationstester och end-to-end tester?
Vad menas med testdriven utveckling (TDD)?\`;`;

const testGenerateSteps = async () => {
  console.log("[SANDBOX]: test generate steps");
  const result = await generateSteps(llmClient, labPrompt);

  if (!result.ok) {
    console.log(result.error);
    return;
  }
  result.value.steps.forEach((step) =>
    console.log(`Step ${step.dependencyOrder}: `, step),
  );
};

testGenerateSteps();

//
// const testSavingRequirment = () => {
//   reqRepo.save(requirment);
// };

// const testJwtClient = () => {
//   const userId = "67";
//
//   const signedResult = jwtClient.sign(userId);
//
//   if (!signedResult.ok) {
//     return console.log("sign error");
//   }
//   console.log("[SANDBOX] sign result:", signedResult);
//
//   const verifiedResult = jwtClient.verify(signedResult.value);
//
//   if (!verifiedResult.ok) {
//     return console.log("verify error");
//   }
//
//   console.log("[SANDBOX] verify result:", verifiedResult);
// };
//
// testJwtClient();
