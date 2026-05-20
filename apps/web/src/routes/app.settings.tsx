import { LogoutButton } from "@/components/LogoutButton";
import { NavLink } from "@/components/NavLink";
import { Card } from "@ccpilot/ui";
import { createFileRoute, linkOptions, Outlet } from "@tanstack/react-router";
import { Settings, User } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

const options = linkOptions([
  {
    to: "/app/settings/user",
    label: "User Preferences",
    icon: User,
  },
  {
    to: "/app/settings/integrations",
    label: "Integrations",
    icon: Settings,
  },
]);

function RouteComponent() {
  return (
    <Card width="container h-full">
      <div className="grid grid-cols-[auto_1fr] h-full gap-x-2">
        <div className="bg-app-surface flex flex-col surface-container">
          <div className="grid gap-y-4">
            <h2 className="md:text-2xl text-xl font-bold">Settings</h2>

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

        <div className="surface-container flex flex-col gap-y-4">
          <Outlet />
        </div>
      </div>
    </Card>
  );
}
