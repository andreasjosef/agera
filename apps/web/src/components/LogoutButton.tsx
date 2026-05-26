import { useSignOut } from "@/modules/auth/hooks";
import { Button } from "@ccpilot/ui";

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { logout, isLoggingOut } = useSignOut();

  return (
    <Button
      children="Logga ut"
      variant="secondary"
      onClick={() => logout()}
      disabled={isLoggingOut}
      isLoading={isLoggingOut}
      className={className}
    />
  );
};
