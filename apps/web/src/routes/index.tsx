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

      <main className="max-w-xl mt-36 mx-56">
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
      </main>

      <footer className="text-center py-1 text-sm text-neutral-700">
        &#169; 2026 CODEFORGOOD
      </footer>
    </div>
  );
}
