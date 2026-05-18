import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/requirements")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 mx-10 mt-12">
      <Outlet />
    </div>
  );
}
