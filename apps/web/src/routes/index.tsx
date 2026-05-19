import { authQueries } from "@/modules/auth/api";
import { Button } from "@ccpilot/ui";
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

function RouteComponent() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="flex justify-between p-4">
        <h1 className="text-xl font-bold">CCPILOT</h1>

        <Link className="font-medium" to="/login">
          Login
        </Link>
      </header>

      <main className="flex flex-col gap-16 mt-36 mx-56">
        <section className="max-w-xl ">
          <h2 className="text-4xl mb-2 font-medium">
            Exekutiv funktion som en tjänst.
          </h2>
          <p className="text-lg mb-4 text-content-muted">
            Navigera i vuxenutbildningen genom dina styrkor – nyfikenhet och
            hyperfokus – istället för det administrativa kaos som dränerar din
            energi.
          </p>
          <Link className="primary-button" to="/signup">
            <Button>Kom Igång!</Button>
          </Link>
        </section>
        <section className="max-w-3xl">
          <h2 className="text-3xl mb-2 font-medium">Varför CCPilot?</h2>
          <p className="text-lg font-semibold mb-4 text-content-main">
            Begåvade individer faller ur systemet på grund av administrativa
            hinder, inte brist på intelligens.
          </p>
          <p className="text-lg mb-4 text-content-muted">
            Att studera med ADHD eller andra NPF-diagnoser innebär ofta att den
            största utmaningen inte är själva kursinnehållet, utan allt runt
            omkring. CCPilot är byggt för att jämna ut spelplanen och öka
            tillgängligheten i akademiska miljöer. Vi tar hand om strukturen, så
            att du kan lägga din energi på att lära dig.
          </p>
        </section>
        <section className="max-w-3xl mb-12">
          <h2 className="text-3xl mb-4 font-medium">
            Hur det fungerar – Tre steg mot ett enklare studieliv
          </h2>
          <ol>
            <li>
              <h3 className="text-lg font-semibold mb-2 ">
                1. Insamling (Automatiskt flöde)
              </h3>
              <p className="text-content-muted">
                Sluta leta efter deadlines på tre olika ställen. CCPilot samlar
                automatiskt in krav, uppgifter och scheman från fragmenterade
                källor som Canvas, Slack och e-post.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold mb-2 ">
                2. Nedbrytning (Dopamintriggande mikrosteg)
              </h3>
              <p className="text-content-muted">
                Stora uppgifter skapar ofta en oöverstiglig starttröskel. Vi
                omvandlar överväldigande kursmål till logiska, lätthanterliga
                delmål som minskar stressen och triggar din naturliga
                nyfikenhet.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold mb-2 ">
                3. Nästa Steg (Ett fokus i taget)
              </h3>
              <p className="text-content-muted">
                Ingen valstatus eller beslutsångest. Du presenteras alltid med
                ett enda steg i taget, noggrant anpassat efter din nuvarande
                energinivå och kontext.
              </p>
            </li>
          </ol>
        </section>
      </main>

      <footer className="text-center py-1 text-sm text-neutral-700">
        &#169; 2026 CODEFORGOOD
      </footer>
    </div>
  );
}
