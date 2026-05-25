import SignupForm from "@/components/SignupForm";
import { authMutations } from "@/modules/auth/api";
import { NewUser } from "@ccpilot/domain";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authMutations.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate({ to: "/app/onboarding" });
    },
  });

  return (
    <div>
      <header className="p-2 flex items-center gap-4">
        <Link
          to="/"
          className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Tillbaka till hemsidan</span>
        </Link>
      </header>
      <div className="grid min-h-screen place-items-center p-4">
        <SignupForm
          onSubmit={(data: NewUser) => mutate(data)}
          isLoading={isPending}
          error={error?.message}
        />
      </div>
    </div>
  );
}
