import { Button, Card, LabeledInput, Error } from "@ccpilot/ui";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginInFormSchema, type LoginInForm } from "@ccpilot/domain";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authMutations } from "@/modules/auth/api";
import { useState } from "react";

export default function LoginForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(loginInFormSchema),
  });
  const [rootError, setRootError] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: authMutations.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate({ to: "/app/cockpit" });
    },
    onError: (err) => {
      setRootError(err.message);
    },
  });

  const onSubmit: SubmitHandler<LoginInForm> = (data) => {
    mutate(data);
  };

  return (
    <Card className="max-w-md">
      <div className="flex flex-col gap-y-6">
        <h2 className="font-display text-2xl font-bold text-content-main">
          Välkommen Tillbaka!
        </h2>

        {rootError && <Error message={rootError} />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <LabeledInput
            label="E-post"
            error={errors.email?.message}
            placeholder="pilot@ccpilot.se"
            {...register("email")}
          />

          <LabeledInput
            label="Lösenord"
            error={errors.password?.message}
            type="password"
            {...register("password")}
          />

          <Button type="submit" isLoading={isLoading} className="mt-2">
            Logga in
          </Button>
        </form>

        <p className="text-center text-sm text-content-muted">
          Behöver du ett konto?{" "}
          <Link
            to="/signup"
            className="text-brand-primary underline font-semibold hover:text-purple-700"
          >
            Skapa ett här!
          </Link>
        </p>
      </div>
    </Card>
  );
}
