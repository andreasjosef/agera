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
                  <Link to={item.to} className="block">
                    {({ isActive }) => (
                      <NavItem
                        label={item.label}
                        icon={item.icon}
                        isActive={isActive}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </>
          }
          footerContent={
            <>
              <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
              <LogoutButton />
              <Link to="/app/settings" className="block">
                {({ isActive }) => (
                  <NavItem
                    label="Settings"
                    icon={Settings}
                    isActive={isActive}
                  />
                )}
              </Link>
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
