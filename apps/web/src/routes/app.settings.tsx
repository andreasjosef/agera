import { LogoutButton } from "@/components/LogoutButton";
import { NavLink } from "@/components/NavLink";
import { Card, mergeStyles } from "@ccpilot/ui";
import {
  createFileRoute,
  linkOptions,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { Settings, User } from "lucide-react";
import BackButtonManager from "@/components/BackButtonManager";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

const options = linkOptions([
  {
    to: "/app/settings/user",
    label: "Preferencer",
    icon: User,
  },
  {
    to: "/app/settings/integrations",
    label: "Integrationer",
    icon: Settings,
  },
]);

function RouteComponent() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const isRoot = pathname === "/app/settings";

  return (
    <Card width="h-full">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full gap-x-2">
        <div
          className={mergeStyles(
            "bg-app-surface flex-col surface-container",
            isRoot ? "flex" : "hidden md:flex",
          )}
        >
          <div className="grid gap-y-4">
            <h2 className="md:text-2xl text-xl font-bold">Inställningar</h2>

            <ul>
              {options.map((option) => {
                return (
                  <li>
                    <NavLink key={option.to} {...option} />
                  </li>
                );
              })}
            </ul>
          </div>
          <LogoutButton className="mt-auto" />
        </div>

        <div
          className={mergeStyles(
            "surface-container flex-col gap-y-4",
            !isRoot ? "flex" : "hidden md:flex",
          )}
        >
          <div className="md:hidden block">
            <BackButtonManager />
          </div>

          <Outlet />
        </div>
      </div>
    </Card>
  );
}
