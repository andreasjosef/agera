import { useCockpitSettings } from "@/modules/cockpit/store";
import { TimeSelector } from "@ccpilot/ui";
import { useShallow } from "zustand/react/shallow";

export default function TimeSelectorManager() {
  const { timeMs, setTime } = useCockpitSettings(
    useShallow((state) => ({ timeMs: state.timeMs, setTime: state.setTime })),
  );

  return (
    <TimeSelector
      timeMs={timeMs}
      setTime={setTime}
      handleSelectSubmit={(e) => e.preventDefault()}
    />
  );
}
