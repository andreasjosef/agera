import { useSignOut } from "@/modules/auth/hooks";

export const LogoutButton = () => {
  const { logout, isLoggingOut } = useSignOut();

  return (
    <button
      className="px-3 py-1.5 font-semibold text-sm bg-neutral-200 rounded-sm cursor-pointer hover:bg-neutral-300"
      onClick={() => logout()}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Leaving..." : "Sign Out"}
    </button>
  );
};
