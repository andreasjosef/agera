import { NavLink } from "@/components/NavLink";
import { Card } from "@ccpilot/ui";
import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
} from "@tanstack/react-router";
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
    <Card width="max-w-4xl mx-auto h-full">
      <div className="container grid grid-cols-[auto_1fr] h-full gap-x-2">
        <div className="p-4 bg-app-surface flex flex-col gap-y-4 surface-container">
          <h2 className="text-2xl font-bold">Settings</h2>

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

        <div className="surface-container flex flex-col gap-y-4">
          <Outlet />
        </div>
      </div>
    </Card>
  );
}
