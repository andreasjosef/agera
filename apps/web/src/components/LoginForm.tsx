import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInFormSchema, type LoginInForm } from "@ccpilot/domain";

import { Card, Error } from "@ccpilot/ui";

export interface LoginFormProps {
  onSubmit: (data: LoginInForm) => void;
  isLoading: boolean;
  error?: string;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  error,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInForm>({
    resolver: zodResolver(loginInFormSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-sm">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-sm gap-2"
      >
        {error && <Card children={<Error message={error} />} />}

        <input
          {...register("email")}
          className="border-app-border border-2 p-2"
          type="email"
          placeholder="Enter your email"
        />

        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          {...register("password")}
          className="border-app-border border-2 p-2"
          type="password"
          placeholder="Enter your password"
        />

        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button className="primary-button" type="submit">
          {isLoading ? "Logging you in..." : "Login"}
        </button>
      </form>
      <p>
        Need an account?
        <Link
          className="text-brand-primary underline font-semibold hover:text-brand-hover visited:text-brand-primary"
          to="/signup"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
