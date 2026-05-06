import { NewUser } from "@ccpilot/domain";
import { Link } from "@tanstack/react-router";

export interface SignupFormProps {
  onSubmit: (data: NewUser) => void;
  isLoading: boolean;
  error?: string;
}

export default function SignupForm({ onSubmit, isLoading }: SignupFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as NewUser;

    onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-sm">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-sm gap-2">
        <input
          name="name"
          placeholder="What Should We Call You?"
          className="border-app-border border-2"
          type="text"
          required
        />
        <input
          name="email"
          placeholder="Please Enter Your Email"
          className="border-app-border border-2"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Choose a Password"
          className="border-app-border border-2"
          type="password"
          required
        />
        <button
          className="bg-brand-primary hover:bg-brand-hover text-app-bg font-medium rounded-md focus:outline-app-ring outline-offset-3 focus:bg-brand-hover"
          type="submit"
        >
          {isLoading ? "Signing you in..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link
          className="text-brand-primary underline font-semibold hover:text-brand-hover visited:text-brand-primary"
          to="/login"
        >
          Login instead
        </Link>
      </p>
    </div>
  );
}
