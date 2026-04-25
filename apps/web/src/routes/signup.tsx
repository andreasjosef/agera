import SignupForm from "@/components/SignupForm";
import { authMutations } from "@/modules/auth/api";
import { NewUser } from "@ccpilot/domain";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
    <div className="grid min-h-screen place-items-center p-4">
      <SignupForm
        onSubmit={(data: NewUser) => mutate(data)}
        isLoading={isPending}
        error={error?.message}
      />
    </div>
  );
}
