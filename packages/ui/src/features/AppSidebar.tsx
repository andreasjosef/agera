import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="flex gap-x-2 items-start h-full" aria-expanded={isOpen}>
      <aside
        className={mergeStyles(
          "h-full transition-all duration-300 ease-out overflow-hidden",
          isOpen ? "w-48 opacity-100" : "w-0 opacity-0",
        )}
      >
        <div className="flex h-full flex-col gap-y-4 border-r border-cod-gray-300 p-2 whitespace-nowrap">
          <h1 className="pl-2 font-display text-2xl font-bold">
            Agera
            <span className="inline-block ml-1 w-3 h-3 rounded-full bg-brand-primary align-middle" />
          </h1>
          <div className="flex flex-col h-full">
            <nav>
              <ul>{navLinks}</ul>
            </nav>

            <footer className="mt-auto grid gap-y-2">{footerContent} </footer>
          </div>
        </div>
      </aside>
      <button
        className="group relative cursor-pointer p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {isOpen ? (
          <ChevronLeft stroke="var(--color-cod-gray-700)" />
        ) : (
          <ChevronRight stroke="var(--color-cod-gray-700)" />
        )}
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-brand-primary text-white z-10">
          {isOpen ? "Hide sidebar" : "Show sidebar"}
        </span>
      </button>
    </div>
  );
}
