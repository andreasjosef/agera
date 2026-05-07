import { useSignOut } from "@/modules/auth/hooks";

export const LogoutButton = () => {
  const { logout, isLoggingOut } = useSignOut();

  return (
    <button
      className="primary-button"
      onClick={() => logout()}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Leaving..." : "Log Out"}
    </button>
  );
};
