import { createFileRoute } from "@tanstack/react-router";

import NowDashboardLayout from "@/components/layouts/NowDashboardLayout";

import NowCard from "@/components/NowCard";
import Timer from "@/components/Timer";
import Heatmap from "@/components/Heatmap";

export const Route = createFileRoute("/app/now")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full mx-auto max-w-6xl">
      <NowDashboardLayout>
        <NowCard />
        <Heatmap />
        <Timer />
      </NowDashboardLayout>
    </div>
  );
}
