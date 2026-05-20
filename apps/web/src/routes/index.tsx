import { authQueries } from "@/modules/auth/api";
import { Button, Card } from "@ccpilot/ui";
import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;

    try {
      const user = await queryClient.ensureQueryData(authQueries.session());

      if (user) {
        throw redirect({
          to: "/app",
        });
      }
    } catch (e) {
      if (isRedirect(e)) throw e;
    }
  },
});

const steps = [
  {
    title: "Insamling",
    description:
      "Sluta leta efter deadlines på tre olika ställen. CCPilot samlar automatiskt in krav, uppgifter och scheman från fragmenterade källor som Canvas, Slack och e-post.",
  },
  {
    title: "Nedbrytning",
    description:
      "Stora uppgifter skapar ofta en oöverstiglig starttröskel. Vi omvandlar överväldigande kursmål till logiska, lätthanterliga delmål som minskar stressen och triggar din naturliga nyfikenhet.",
  },
  {
    title: "Nästa Steg",
    description:
      "Ingen valstatus eller beslutsångest. Du presenteras alltid med ett enda steg i taget, noggrant anpassat efter din nuvarande energinivå och kontext.",
  },
];

function RouteComponent() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="flex justify-between p-4 max-w-7xl mx-auto w-full">
        <h1 className="font-display text-xl font-bold tracking-tight">
          CCPILOT
        </h1>

        <Link className="font-medium" to="/login">
          Login
        </Link>
      </header>

      <main>
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-5xl leading-tight mb-4 text-content-main">
              Exekutiv funktion som en tjänst.
            </h2>
            <p className="text-lg mb-8 text-content-muted max-w-xl">
              Navigera i vuxenutbildningen genom dina styrkor – nyfikenhet och
              hyperfokus – istället för det administrativa kaos som dränerar din
              energi.
            </p>
            <Link className="inline-block" to="/signup">
              <Button>Kom Igång!</Button>
            </Link>
          </div>
        </section>

        <section className="bg-app-surface py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-4 font-medium">
              Varför CCPilot?
            </h2>
            <blockquote className="border-l-4 border-brand-primary pl-4 italic text-lg font-semibold mb-4 text-content-main">
              Begåvade individer faller ur systemet på grund av administrativa
              hinder, inte brist på intelligens.
            </blockquote>
            <p className="text-lg mb-4 text-content-muted">
              Att studera med ADHD eller andra NPF-diagnoser innebär ofta att
              den största utmaningen inte är själva kursinnehållet, utan allt
              runt omkring. CCPilot är byggt för att jämna ut spelplanen och öka
              tillgängligheten i akademiska miljöer. Vi tar hand om strukturen,
              så att du kan lägga din energi på att lära dig.
            </p>
          </div>
        </section>

        <section className="bg-app-bg py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl mb-12 text-center font-medium">
              Hur det fungerar – Tre steg mot ett enklare studieliv
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <Card key={i} className="flex flex-col">
                  <div className="w-10 h-10 rounded-sm bg-brand-primary text-white font-display flex items-center justify-center mb-4 text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-content-muted">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-4 text-sm text-content-subtle">
        &#169; 2026 CODEFORGOOD
      </footer>
    </div>
  );
}
