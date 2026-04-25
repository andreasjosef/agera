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
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">
      <header className="p-6 flex justify-between">
        <h1 className="font-bold">CCPILOT</h1>
        <nav className="flex gap-x-2">
          <Link
            className="px-3 py-1.5 font-semibold text-sm hover:text-neutral-800 hover:underline transition-all"
            to="/app/dashboard"
          >
            Settings
          </Link>
          <LogoutButton />
        </nav>
      </header>
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
