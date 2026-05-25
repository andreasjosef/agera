import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/LoginForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div>
      <header className="p-2">
        <Link
          to="/"
          className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Tillbaka till hemsidan</span>
        </Link>
      </header>

      <div className="grid min-h-screen place-items-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}
