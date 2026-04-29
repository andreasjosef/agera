import { useSession } from "@/modules/auth/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user } = useSession();

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-2xl mx-auto">
      <header className="mt-18">
        <h2 className="text-xl mb-2 font-bold">Welcome {user?.name}</h2>
        <p>
          This app is designed to integrate with your LMS system to help you
          navigate your studies more easily. For the best experience please
          select your provider from the list of supported LMS systems below.
        </p>
      </header>
      <section className="mt-2">
        <ul className="text-center">
          <Link to="/app/integrations/canvas">
            <li className="p-2 bg-neutral-100 border-2 border-neutral-300 rounded-sm hover:bg-neutral-300 hover:cursor-pointer">
              Canvas Instructure
            </li>
          </Link>
        </ul>
      </section>
    </div>
  );
}
