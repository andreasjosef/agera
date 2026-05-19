import { Outlet } from "@tanstack/react-router";
import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout, AppSidebar, MobileNavMenu } from "@ccpilot/ui";
import { GalleryHorizontalEnd, LayoutDashboard, Settings } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { NavLink } from "@/components/NavLink";
import SyncState from "@/components/SyncState";
import { Suspense } from "react";

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
  { to: "/app/cockpit", label: "Cockpit", icon: LayoutDashboard },
  { to: "/app/requirements", label: "All", icon: GalleryHorizontalEnd },
] as const;

const mobileNavItems = [
  { to: "/app/cockpit", label: "Cockpit", icon: LayoutDashboard },
  { to: "/app/requirements", label: "All", icon: GalleryHorizontalEnd },
  {
    to: "/app/settings/integrations",
    label: "All",
    icon: Settings,
  },
] as const;

function RouteComponent() {
  // TODO: Display remaining pomodoro time in title
  return (
    <AppLayout>
      <div className="hidden sm:block">
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
              <SyncState />
              <NavLink to="/app/settings" label="Settings" icon={Settings} />
              <LogoutButton />
            </>
          }
        />
      </div>

      <div className="p-4 overflow-y-scroll">
        <Suspense
          fallback={
            <div className="flex h-[60vh] w-full items-center justify-center font-display text-sm font-medium uppercase tracking-widest text-content-subtle animate-pulse">
              Loading ...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>

      <div className="sm:hidden block">
        <MobileNavMenu
          navLinks={
            <>
              {mobileNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink key={item.to} {...item} iconOnly />
                </li>
              ))}
            </>
          }
        />
      </div>
    </AppLayout>
  );
}
