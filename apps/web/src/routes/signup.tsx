import SignupForm from "@/components/SignupForm";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="p-4 flex items-center gap-4">
        <Link
          to="/"
          className="flex gap-1 items-center text-brand-primary hover:text-brand-hover transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Tillbaka till hemsidan</span>
        </Link>
      </header>
      <div className="flex items-center justify-center px-2">
        <SignupForm />
      </div>
    </div>
  );
}
