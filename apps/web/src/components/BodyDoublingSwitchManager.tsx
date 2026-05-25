import { statusQueries } from "@/modules/cockpit/api";
import { useBodyDoubling } from "@/modules/cockpit/store";
import { BodyDoublingSwitch } from "@ccpilot/ui";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function BodyDoublingSwitchManager() {
  const { isEnabled, setIsEnabled } = useBodyDoubling(
    useShallow((state) => ({
      isEnabled: state.isEnabled,
      setIsEnabled: state.setIsEnabled,
    })),
  );

  const { data } = useQuery(statusQueries.getActiveStatusCount());

  return (
    <BodyDoublingSwitch
      enabled={isEnabled}
      activeCount={data?.count || 0}
      setIsEnable={setIsEnabled}
    />
  );
}
