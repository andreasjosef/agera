import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { authMutations } from "@/modules/auth/api";

import LoginForm from "@/components/LoginForm";

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
      navigate({ to: "/app" });
    },
    onError: (error) => {
      console.log("[LOGIN] query error: ", error.message);
    },
  });

  return (
    <div className="grid min-h-screen place-items-center p-4 ">
      <LoginForm
        onSubmit={(data: { email: string; password: string }) => mutate(data)}
        isLoading={isPending}
        error={error?.message}
      />
    </div>
  );
}
