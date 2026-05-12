import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";

interface AppSidebarProps {
  open: boolean;
  children?: React.ReactNode;
}

export function AppSidebar({ open, children }: AppSidebarProps) {
  if (!open) {
    return (
      <Button className="" variant="ghost">
        Exit Focus
      </Button>
    );
  }

  return (
    <Card className="h-full w-min flex flex-col gap-y-4">
      <h1>CCPilot</h1>
      {children}
    </Card>
  );
}
