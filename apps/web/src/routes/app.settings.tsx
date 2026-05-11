import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

const options = linkOptions([
  {
    to: "/app/settings/user",
    label: "User Preferences",
  },
  {
    to: "/app/settings/integrations",
    label: "Integrations",
  },
]);

function RouteComponent() {
  return (
    <div className="container grid grid-cols-[auto_1fr] h-full gap-x-2">
      <div className="p-4 bg-app-surface flex flex-col gap-y-4 surface-container">
        <h2 className="text-2xl font-bold">Settings</h2>

        <ul>
          {options.map((option) => {
            return (
              <li>
                <Link
                  className="p-2 block rounded-sm"
                  {...option}
                  key={option.to}
                  activeProps={{
                    className: "bg-app-surface-raised",
                  }}
                >
                  {option.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="surface-container flex flex-col gap-y-4">
        <Outlet />
      </div>
    </div>
  );
}
