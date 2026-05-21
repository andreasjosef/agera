import { Button } from "../primitives/Button";
import { useEffect } from "react";

interface BackButtonProps {
  canGoBack: boolean;
  handleBack: () => void;
}

export function BackButton({ canGoBack, handleBack }: BackButtonProps) {
  // Map esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      if (e.key === "Escape" && canGoBack) {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canGoBack, handleBack]);

  if (!canGoBack) {
    return null;
  }

  return (
    <>
      <Button className="self-start" variant="ghost" onClick={handleBack}>
        Tillbaka
      </Button>
    </>
  );
}
