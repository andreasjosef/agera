import { useSignOut } from "@/modules/auth/hooks";
import { Button } from "@ccpilot/ui";

export const LogoutButton = () => {
  const { logout, isLoggingOut } = useSignOut();

  return (
    <Button
      children="Log Out"
      onClick={() => logout()}
      disabled={isLoggingOut}
      isLoading={isLoggingOut}
    />
  );
};
