import { createFileRoute } from "@tanstack/react-router";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import { NowCard } from "@ccpilot/ui";

//import NowCard from "@/components/NowCard";
import Timer from "@/components/Timer";
import Heatmap from "@/components/Heatmap";
import { useNextStep } from "@/modules/requirement/hooks";

export const Route = createFileRoute("/app/now")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep, error } = useNextStep();

  return (
    <div className="h-full mx-auto max-w-6xl">
      <NowDashboardLayout>
        <NowCard step={nextStep} error={error?.message} />
        <Heatmap />
        <Timer />
      </NowDashboardLayout>
    </div>
  );
}
