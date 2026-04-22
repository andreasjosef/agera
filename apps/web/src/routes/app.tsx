import { Link, Outlet } from "@tanstack/react-router";
import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LogoutButton } from "@/components/LogoutButton";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
    const { queryClient } = context;

    try {
      const user = await queryClient.ensureQueryData(authQueries.session());
      return { user };
    } catch (error) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <div>
        <header>
          <nav className="p-6 flex justify-between">
            <Link
              to="/"
              className="text-xl text-secondary [&.active]:text-slate-700 font-bold"
            >
              App
            </Link>
            <LogoutButton />
          </nav>
        </header>

        <main className="min-h-screen">
          <Outlet />
        </main>

        <footer>Footer</footer>
      </div>
    </>
  );
}
