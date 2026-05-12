import { Link, Outlet } from "@tanstack/react-router";
import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout, AppSidebar, NavItem } from "@ccpilot/ui";
import { LayoutDashboard, Settings } from "lucide-react";
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
    <AppLayout>
      {/* TODO: Create a global state for sidebar open */}
      <aside>
        <AppSidebar open>
          <nav>
            <ul>
              <Link to="/app/now" className="block">
                {({ isActive }) => (
                  <NavItem
                    label="Cockpit"
                    icon={LayoutDashboard}
                    isActive={isActive}
                  />
                )}
              </Link>
              <Link to="/app/requirements" className="block">
                {({ isActive }) => (
                  <NavItem label="All" icon={Settings} isActive={isActive} />
                )}
              </Link>
            </ul>
          </nav>

          <footer className="mt-auto">
            <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
            <LogoutButton />
            <Link to="/app/settings" className="block">
              {({ isActive }) => (
                <NavItem label="Settings" icon={Settings} isActive={isActive} />
              )}
            </Link>
          </footer>
        </AppSidebar>
      </aside>

      <div className="p-4">
        <Outlet />
      </div>
    </AppLayout>
  );
}
