import { Link, Outlet } from "@tanstack/react-router";
import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LogoutButton } from "@/components/LogoutButton";
import ApplicationMenu from "@/components/ApplicationMenu";
import SyncState from "@/components/SyncState";

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
      <header className="p-6 flex justify-between items-center">
        <h1 className="font-bold">CCPILOT</h1>
        <ApplicationMenu />
        <nav className="flex gap-x-2 items-center">
          <SyncState />
          <Link
            className="px-3 py-1.5 font-semibold text-sm hover:underline transition-all"
            to="/app/settings"
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
