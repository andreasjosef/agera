import { useBodyDoubling } from "@/modules/cockpit/store";
import { BodyDoublingSwitch } from "@ccpilot/ui";
import { useShallow } from "zustand/react/shallow";

export default function BodyDoublingSwitchManager() {
  const { isEnabled, setIsEnabled } = useBodyDoubling(
    useShallow((state) => ({
      isEnabled: state.isEnabled,
      setIsEnabled: state.setIsEnabled,
    })),
  );

  return <BodyDoublingSwitch enabled={isEnabled} setIsEnable={setIsEnabled} />;
}
