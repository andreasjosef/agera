import { useSignOut } from "@/modules/auth/hooks";

export const LogoutButton = () => {
  const { logout, isLoggingOut } = useSignOut();

  return (
    <button
      className="px-3 py-1.5 font-semibold text-sm rounded-sm cursor-pointer bg-brand-primary hover:bg-brand-hover focus:bg-brand-hover text-app-bg"
      onClick={() => logout()}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Leaving..." : "Sign Out"}
    </button>
  );
};
