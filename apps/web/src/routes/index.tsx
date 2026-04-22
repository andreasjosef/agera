import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
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
      // Keep user on the landing page
    }
  },
});

function RouteComponent() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">CCPILOT</h1>

        <Link className="font-medium" to="/login">
          Login
        </Link>
      </header>

      <main className="min-h-screen">
        <h2 className="text-xl font-medium"> Introducing CCPilot </h2>
        <p> Executive function as a service for students </p>
      </main>

      <footer>Footer</footer>
    </>
  );
}
