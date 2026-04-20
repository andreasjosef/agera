import { useSignOut } from "@/modules/auth/hooks";

export const LogoutButton = () => {
  const { logout, isLoggingOut } = useSignOut();

  return (
    <button onClick={() => logout()} disabled={isLoggingOut}>
      {isLoggingOut ? "Leaving..." : "Sign Out"}
    </button>
  );
};
