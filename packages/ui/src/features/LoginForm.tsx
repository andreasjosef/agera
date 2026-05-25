import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";
import { LabeledInput } from "@/primitives/LabeledInput";

interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  signupHref?: string; // Pass the destination as a prop
}

export function LoginForm({
  onSubmit,
  isLoading,
  signupHref = "#",
}: LoginFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as LoginFormData;
    onSubmit(data);
  };

  return (
    <Card>
      <div className="flex flex-col gap-y-6 w-full">
        <h2 className="font-display text-2xl font-bold text-content-main">
          Välkommen
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-display text-xs font-semibold uppercase tracking-wider text-content-subtle">
              E-post
            </label>
            <input
              name="email"
              placeholder="pilot@ccpilot.se"
              className="border-app-border border rounded-sm p-3 font-body font-light focus:ring-2 focus:ring-app-ring outline-none transition-all"
              type="email"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display text-xs font-semibold uppercase tracking-wider text-content-subtle">
              Lösenord
            </label>
            <input
              name="password"
              className="border-app-border border rounded-sm p-3 font-body font-light focus:ring-2 focus:ring-app-ring outline-none transition-all"
              type="password"
              required
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            Logga in
          </Button>
        </form>

        <p className="text-center text-sm text-content-muted">
          Behöver du ett konto?{" "}
          <a
            href={signupHref}
            className="text-purple-600 underline font-semibold hover:text-purple-700"
          >
            Skapa ett här!
          </a>
        </p>
      </div>
    </Card>
  );
}
