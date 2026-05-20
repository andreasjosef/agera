import { Children, ReactNode } from "react";
interface NowDashboardLayoutProps {
  children: ReactNode;
}

export default function NowDashboardLayout({
  children,
}: NowDashboardLayoutProps) {
  const [upcoming, timeSelector, bodyDoubling] = Children.toArray(children);
  return (
    <div className="cockpit-grid h-full gap-4 items-start content-start">
      <div className="h-full [grid-area:upcoming]">{upcoming}</div>

      <div className="flex flex-col gap-6 [grid-area:settings]">
        {timeSelector}
        {bodyDoubling}
      </div>
    </div>
  );
}
