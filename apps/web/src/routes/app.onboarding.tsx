import { ConnectionGuide } from "@ccpilot/ui";
import { useSession } from "@/modules/auth/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";

export const Route = createFileRoute("/app/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user } = useSession();

  return (
    <div className="grid">
      <header className="mt-18">
        <h2 className="text-xl mb-2 font-bold">Welcome {user?.name}</h2>
        <p className="text-content-muted">
          This app is designed to integrate with your LMS system to help you
          navigate your studies more easily. For the best experience please
          select your provider from the list of supported LMS systems below.
        </p>
      </header>
      <section className="mt-2">
        <ul className="grid gap-y-2">
          <li className="p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm hover:bg-neutral-300 hover:cursor-pointer">
            <Link
              className="flex gap-x-2 justify-center"
              to="/app/settings/integrations"
            >
              Canvas Instructure
            </Link>
          </li>
          <li className="p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm hover:bg-neutral-300 hover:cursor-pointer">
            <Link
              className="flex gap-x-2 justify-center"
              to="/app/guides/canvas"
            >
              <Info />
              Hur hittar jag min token från Canvas ?
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
