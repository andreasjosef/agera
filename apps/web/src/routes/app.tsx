import { Suspense } from "react";
import { Outlet } from "@tanstack/react-router";
import { useHotkey } from "@tanstack/react-hotkeys";
import { CircleDot, LayoutDashboard, List, Settings } from "lucide-react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout, AppSidebar, MobileNavMenu } from "@ccpilot/ui";
import { authQueries } from "@/modules/auth/api";
import { useApp } from "@/modules/store";
import { NavLink } from "@/components/NavLink";
import SyncState from "@/components/SyncState";
import { useShallow } from "zustand/react/shallow";

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
  { to: "/app/cockpit", label: "Översikt", icon: LayoutDashboard },
  { to: "/app/now", label: "Fokus", icon: CircleDot },
  {
    to: "/app/requirements",
    label: "Alla Uppgifter",
    icon: List,
  },
  {
    to: "/app/settings",
    label: "Intsällningar",
    icon: Settings,
  },
] as const;

const mobileNavItems = [
  { to: "/app/cockpit", label: "Cockpit", icon: LayoutDashboard },
  { to: "/app/now", label: "Now", icon: CircleDot },
  { to: "/app/requirements", label: "All", icon: List },
  {
    to: "/app/settings",
    label: "Settings",
    icon: Settings,
  },
] as const;

function RouteComponent() {
  const { isSidebarOpen, setIsSidebarOpen } = useApp(
    useShallow((state) => ({
      isSidebarOpen: state.isSidebarOpen,
      setIsSidebarOpen: state.setIsSidebarOpen,
    })),
  );

  useHotkey("Mod+L", () => {
    setIsSidebarOpen(!isSidebarOpen);
  });

  // TODO: Display remaining pomodoro time in title
  return (
    <AppLayout>
      <div className="hidden md:block">
        {/* TODO: Create a global state for sidebar open */}
        <AppSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
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
            </>
          }
        />
      </div>

      <div className="overflow-y-scroll my-4">
        <div className="flex flex-col gap-y-2 container h-full">
          <Suspense
            fallback={
              <div className="h-1 w-full overflow-hidden rounded-full bg-transparent">
                <div className="h-full w-full origin-left animate-pulse rounded-full bg-brand-subtle" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>

      <div className="md:hidden block">
        <MobileNavMenu
          navLinks={
            <>
              {mobileNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink key={item.to} {...item} />
                </li>
              ))}
            </>
          }
        />
      </div>
    </AppLayout>
  );
}
