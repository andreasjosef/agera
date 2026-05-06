import { Link } from "@tanstack/react-router";

interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  error?: string;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as LoginFormData;
    onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-sm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-sm gap-2">
        <input
          name="email"
          className="border-app-border border-2"
          type="email"
          required
        />
        <input
          name="password"
          className="border-app-border border-2"
          type="password"
          required
        />
        <button
          className="bg-brand-primary hover:bg-brand-hover text-app-bg font-medium rounded-md focus:outline-app-ring outline-offset-3 focus:bg-brand-hover"
          type="submit"
        >
          {isLoading ? "Signing you in..." : "Sign In"}
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
