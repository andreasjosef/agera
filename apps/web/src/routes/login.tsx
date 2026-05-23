import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { authMutations } from "@/modules/auth/api";

import LoginForm from "@/components/LoginForm";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authMutations.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate({ to: "/app/cockpit" });
    },
  });

  return (
    <div>
      <header className="p-2">
        <Link to="/" className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200">
          <ArrowLeft size={18} />
          <span>Tillbaka till hemsidan</span>
        </Link>
      </header>

      <div className="grid min-h-screen place-items-center p-4">
        <LoginForm
          onSubmit={(data: { email: string; password: string }) => mutate(data)}
          isLoading={isPending}
          error={error?.message}
        />
      </div>
    </div>
  );
}
