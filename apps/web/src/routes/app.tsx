import { Link, Outlet } from "@tanstack/react-router";
import { authQueries } from "@/modules/auth/api";
import { createFileRoute, redirect } from "@tanstack/react-router";

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

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen">
        <nav className="p-6 flex gap-6">
          <Link
            to="/"
            className="text-xl text-secondary [&.active]:text-slate-700 font-bold"
          >
            App
          </Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
