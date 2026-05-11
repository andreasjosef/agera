import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/requirements")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 max-w-xl mx-auto mt-12">
      <Outlet />
    </div>
  );
}
