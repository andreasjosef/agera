import SignupForm from "@/components/SignupForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignupForm,
});
