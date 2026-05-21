import { BackButton } from "@ccpilot/ui";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

export default function BackButtonManager() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const handleBack = useCallback(() => {
    if (canGoBack) router.history.back();
  }, [router, canGoBack]);

  return <BackButton canGoBack={canGoBack} handleBack={handleBack} />;
}
