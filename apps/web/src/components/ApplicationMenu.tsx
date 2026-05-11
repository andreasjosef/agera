import { Link } from "@tanstack/react-router";

export default function ApplicationMenu() {
  return (
    <nav className="flex gap-x-2 items-center">
      <Link
        activeProps={{ className: `primary-button` }}
        className="[&.active]:primary-button px-3 py-1.5 font-semibold text-sm hover:underline transition-all"
        to="/app/now"
      >
        Nästa Steg
      </Link>
      <Link
        activeProps={{ className: `primary-button` }}
        className="px-3 py-1.5 font-semibold text-sm hover:underline transition-all"
        to="/app/today"
      >
        Dagens Plan
      </Link>
      <Link
        activeProps={{ className: `primary-button` }}
        className="[&.active]:primary-button px-3 py-1.5 font-semibold text-sm hover:underline transition-all"
        to="/app/requirements"
      >
        Mina Uppgifter
      </Link>
    </nav>
  );
}
