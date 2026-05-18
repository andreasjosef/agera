import { Children, ReactNode } from "react";
interface NowDashboardLayoutProps {
  children: ReactNode;
}

export default function NowDashboardLayout({
  children,
}: NowDashboardLayoutProps) {
  const [nextStep, heatmap, timer] = Children.toArray(children);
  return (
    <div className="grid h-full grid-cols-[1fr_380px] gap-8 items-start">
      <main className="h-full">{nextStep}</main>
      <aside className="flex flex-col gap-6">
        <div className="w-full">{heatmap}</div>
        <div className="w-full">{timer}</div>
      </aside>
    </div>
  );
}
