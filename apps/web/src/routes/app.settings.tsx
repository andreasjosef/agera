import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container grid grid-cols-[auto_1fr] h-full">
      <div className="px-2 bg-app-surface">
        <h1>Settings</h1>

        <ul>
          <li>
            <Link to="/app/settings/user">User</Link>
          </li>
          <li>
            <Link to="/app/settings/integrations">Integrations</Link>
          </li>
        </ul>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
