import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">CCPILOT</h1>
        <Link className="font-medium" to="/login">
          Login
        </Link>
      </header>
    </>
  );
}
