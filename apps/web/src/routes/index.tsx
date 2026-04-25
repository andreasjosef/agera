import { authQueries } from "@/modules/auth/api";
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
          Executive function as a service
        </h2>
        <p className="text-lg mb-4">
          Navigera i vuxenutbildning genom dina styrkor istället för att
          dräneras av exekutiva brister.
        </p>
        <Link
          className="px-5 py-3 bg-neutral-300 text-neutral-900 font-medium rounded-md hover:bg-neutral-400"
          to="/signup"
        >
          Get Started
        </Link>
      </main>

      <footer className="text-center py-1 text-sm text-neutral-700">
        &#169; 2026 CODEFORGOOD
      </footer>
    </div>
  );
}
