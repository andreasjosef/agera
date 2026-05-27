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
    <Card width="h-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full gap-x-4">
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
          <Link
            to="/app/settings"
            className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            <span>Tillbaka</span>
          </Link>

          <Outlet />
        </div>
      </div>
    </Card>
  );
}
