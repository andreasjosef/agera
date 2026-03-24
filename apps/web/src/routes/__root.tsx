import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <div className="min-h-screen">
      <nav className="p-6 flex gap-6">
        <Link
          to="/"
          className="text-xl text-secondary [&.active]:text-slate-700 font-bold"
        >
          Now
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
