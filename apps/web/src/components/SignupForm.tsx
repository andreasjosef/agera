import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, type SignUpForm } from "@ccpilot/domain";

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
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-sm">
      <h2>Signup</h2>
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
          className="border-app-border border-2 p-2"
          type="text"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input
          {...register("email")}
          placeholder="Please Enter Your Email"
          className="border-app-border border-2 p-2"
          type="email"
        />

        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          {...register("password")}
          placeholder="Choose a Password"
          className="border-app-border border-2 p-2"
          type="password"
        />

        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button disabled={isLoading} className="primary-button" type="submit">
          {isLoading ? "Signing you in..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account?
        <Link
          className="text-brand-primary underline font-semibold hover:text-brand-hover visited:text-brand-primary"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
