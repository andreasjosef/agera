import { Button } from "@ccpilot/ui";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export default function BackButton() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  if (!canGoBack) {
    return null;
  }

  // Map esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      if (e.key === "Escape" && canGoBack) {
        router.history.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canGoBack, router.history]);

  return (
    <>
      <Button
        className="self-start"
        variant="ghost"
        onClick={() => router.history.back()}
      >
        Tillbaka
      </Button>
    </>
  );
}
