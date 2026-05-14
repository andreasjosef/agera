import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, type SignUpForm } from "@ccpilot/domain";
import { Button, Card } from "@ccpilot/ui";

export interface SignupFormProps {
  onSubmit: (data: SignUpForm) => void;
  isLoading: boolean;
  error?: string;
}

export default function SignupForm({
  onSubmit,
  isLoading,
  error,
}: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    // FIXME: Seems like zod resolver does not fully support zod v4 yet
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  return (
    <Card width="max-w-xl">
      <div className="flex flex-col gap-y-4 w-full">
        <h2 className="text-2xl font-semibold">Skapa ett Konto</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-sm gap-2"
        >
          {error && (
            <p className="bg-red-100 text-red-600 border border-red-400 p-2 rounded">
              {error}
            </p>
          )}
          <input
            {...register("name")}
            placeholder="What Should We Call You?"
            className="rounded-sm border-app-border border-2 p-2"
            type="text"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          <input
            {...register("email")}
            placeholder="Please Enter Your Email"
            className="rounded-sm border-app-border border-2 p-2"
            type="email"
          />

          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            {...register("password")}
            placeholder="Choose a Password"
            className="rounded-sm border-app-border border-2 p-2"
            type="password"
          />

          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <Button
            children="Sign Up"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </form>

        <p>
          Already have an account?{" "}
          <Link
            className="text-brand-primary underline font-semibold hover:text-brand-hover visited:text-brand-primary"
            to="/login"
          >
            Login!
          </Link>
        </p>
      </div>
    </Card>
  );
}
