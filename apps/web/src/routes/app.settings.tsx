import { LogoutButton } from "@/components/LogoutButton";
import { NavLink } from "@/components/NavLink";
import { Card, mergeStyles } from "@ccpilot/ui";
import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { ArrowLeft, Settings, User } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

const options = linkOptions([
  {
    to: "/app/settings/user",
    label: "Preferenser",
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
    <Card width="h-full mx-auto py-0!">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full gap-x-4">
        <div
          className={mergeStyles(
            "bg-app-surface flex-col surface-container border-r border-cod-gray-200 pr-6 py-8",
            isRoot ? "flex" : "hidden md:flex py-8",
          )}
        >
          <div className="grid gap-y-4">
            <Link
              to="/app/settings"
              className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              <span>Tillbaka</span>
            </Link>

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
            "surface-container flex-col gap-y-4 mx-auto w-full max-w-3xl py-8",
            !isRoot ? "flex" : "hidden md:flex",
          )}
        >
          <Outlet />
        </div>
      </div>
    </Card>
  );
}
