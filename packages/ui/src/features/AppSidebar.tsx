import React from "react";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";

interface AppSidebarProps {
  open: boolean;
  navLinks?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function AppSidebar({ open, navLinks, footerContent }: AppSidebarProps) {
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
      <div className="flex flex-col h-full">
        <nav>
          <ul>{navLinks}</ul>
        </nav>

        <footer className="mt-auto grid gap-y-2">{footerContent} </footer>
      </div>
    </Card>
  );
}
