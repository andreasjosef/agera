import { Link, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, type SignUpForm } from "@ccpilot/domain";
import { Button, Card, LabeledInput } from "@ccpilot/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authMutations } from "@/modules/auth/api";

export default function SignupForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SignUpForm>({
    // FIXME: Seems like zod resolver does not fully support zod v4 yet
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: authMutations.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate({ to: "/app/cockpit" });
    },
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate(data);
  };

  return (
    <Card className="max-w-2xl">
      <div className="flex flex-col gap-y-6">
        <h2 className="font-display text-2xl font-bold text-content-main">
          Skapa ett konto
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <LabeledInput
            label="Namn"
            error={errors.name?.message}
            {...register("name")}
          />

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
            Skapa konto
          </Button>
        </form>

        <p className="text-center text-sm text-content-muted">
          Har du ett konto?
          <Link
            to="/login"
            className="text-purple-600 underline font-semibold hover:text-purple-700"
          >
            Logga in här!
          </Link>
        </p>
      </div>
    </Card>
  );
}
