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
        <input name="email" className="bg-amber-200" type="email" required />
        <input
          name="password"
          className="bg-amber-200"
          type="password"
          required
        />
        <button type="submit">
          {isLoading ? "Signing you in..." : "Sign In"}
        </button>
      </form>
      <p>
        Need an account?
        <Link
          className="text-blue-600 underline font-semibold hover:text-blue-800"
          to="/signup"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
