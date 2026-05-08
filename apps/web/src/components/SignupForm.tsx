import { Link } from "@tanstack/react-router";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpformSchema, type SignUpForm } from "@/Schemas/signUpFormSchema";


export interface SignupFormProps {
  onSubmit: (data: SignUpForm) => void;
  isLoading: boolean;
  error?: string;
}

export default function SignupForm({onSubmit, isLoading,}: SignupFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpformSchema),
  });

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-sm">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-sm gap-2">
        <input
        {...register("name")}
          placeholder="What Should We Call You?"
          className="border-app-border border-2 p-2"
          type="text"
        />
        <p>{errors.name?.message}</p>

        <input
        {...register("email")}
          placeholder="Please Enter Your Email"
          className="border-app-border border-2 p-2"
          type="email"
        />

        <p>{errors.email?.message}</p>

        <input
        {...register("password")}
          placeholder="Choose a Password"
          className="border-app-border border-2 p-2"
          type="password"
        />

        <p>{errors.password?.message}</p>



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
