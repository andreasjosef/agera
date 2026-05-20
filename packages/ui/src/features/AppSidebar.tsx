import React from "react";
import { ChevronsRightLeft } from "lucide-react";
import { mergeStyles } from "../utils";

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navLinks?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function AppSidebar({
  isOpen,
  setIsOpen,
  navLinks,
  footerContent,
}: AppSidebarProps) {
  return (
    <div className="flex gap-x-2 items-start h-full " aria-expanded={isOpen}>
      <aside
        className={mergeStyles(
          "h-full flex-col gap-y-4 border-r border-cod-gray-300 p-2 transition-discrete",
          isOpen ? "flex" : "hidden",
        )}
      >
        <h1>CCPilot</h1>
        <div className="flex flex-col h-full">
          <nav>
            <ul>{navLinks}</ul>
          </nav>

          <footer className="mt-auto grid gap-y-2">{footerContent} </footer>
        </div>
      </aside>
      <button className="cursor-pointer p-2" onClick={() => setIsOpen(!isOpen)}>
        <ChevronsRightLeft stroke="var(--color-cod-gray-700)" />
      </button>
    </div>
  );
}
