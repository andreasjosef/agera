interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  error?: string;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  error,
}: LoginFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData) as unknown as LoginFormData;

    console.log(data);

    onSubmit(data);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-sm gap-2">
        <input name="email" className="bg-amber-200" type="email" required />
        <input
          name="password"
          className="bg-amber-200"
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
