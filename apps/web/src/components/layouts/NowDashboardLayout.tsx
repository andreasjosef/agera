import { Children, ReactNode } from "react";
interface NowDashboardLayoutProps {
  children: ReactNode;
}

export default function NowDashboardLayout({
  children,
}: NowDashboardLayoutProps) {
  const [upcoming, timeSelector, bodyDoubling, liftOff] =
    Children.toArray(children);
  return (
    <div className="cockpit-grid h-full gap-2 items-start content-start">
      <div className="h-full [grid-area:upcoming]">{upcoming}</div>

      <div className="[grid-area:time]">{timeSelector}</div>
      <div className="[grid-area:body-doubling]">{bodyDoubling}</div>
      <div className="[grid-area:lift-off] grid"> {liftOff} </div>
    </div>
  );
}
