import { Link, Outlet } from "@tanstack/react-router";
import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout, AppSidebar, NavItem } from "@ccpilot/ui";
import { LayoutDashboard, Settings } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { NavLink } from "@/components/NavLink";

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

const sidebarNavItems = [
  { to: "/app/now", label: "Cockpit", icon: LayoutDashboard },
  { to: "/app/requirements", label: "All", icon: Settings },
] as const;

function RouteComponent() {
  return (
    <AppLayout>
      <div>
        {/* TODO: Create a global state for sidebar open */}
        <AppSidebar
          open
          navLinks={
            <>
              {sidebarNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink key={item.to} {...item} />
                </li>
              ))}
            </>
          }
          footerContent={
            <>
              <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
              <LogoutButton />
              <NavLink to="/app/settings" label="Settings" icon={Settings} />
            </>
          }
        />
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </AppLayout>
  );
}
