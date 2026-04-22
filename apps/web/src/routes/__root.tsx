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
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
