import { NewUser } from "@ccpilot/domain";

export interface SignupFormProps {
  onSubmit: (data: NewUser) => void;
  isLoading: boolean;
  error?: string;
}

export default function SignupForm({
  onSubmit,
  isLoading,
  error,
}: SignupFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as NewUser;

    onSubmit(data);
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-sm gap-2">
        <input name="name" className="bg-amber-200" type="text" required />
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
    </>
  );
}
