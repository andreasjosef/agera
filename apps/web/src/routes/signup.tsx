import SignupForm from "@/components/SignupForm";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div>
      <header className="p-2 flex items-center gap-4">
        <Link
          to="/"
          className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Tillbaka till hemsidan</span>
        </Link>
      </header>
      <div className="grid min-h-screen place-items-center p-4">
        <SignupForm />
      </div>
    </div>
  );
}
