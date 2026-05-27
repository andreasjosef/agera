import { Children, ReactNode } from "react";
interface NowDashboardLayoutProps {
  children: ReactNode;
}

export default function NowDashboardLayout({
  children,
}: NowDashboardLayoutProps) {
  const [energy, upcoming, timeSelector, bodyDoubling] =
    Children.toArray(children);
  return (
    <div className="cockpit-grid h-full gap-2 items-start content-start">
      <div className="h-full [grid-area:energy]">{energy}</div>
      <div className="h-full [grid-area:upcoming]">{upcoming}</div>

      <div className="[grid-area:time]">{timeSelector}</div>
      <div className="h-full [grid-area:body-doubling]">{bodyDoubling}</div>
    </div>
  );
}
