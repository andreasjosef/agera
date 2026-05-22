import { useTimer } from "@/modules/cockpit/store";
import { TimeSelector } from "@ccpilot/ui";
import { useShallow } from "zustand/react/shallow";

export default function TimeSelectorManager() {
  const { baseTime, selectionMessage, setBaseTime } = useTimer(
    useShallow((state) => ({
      baseTime: state.baseTime,
      setBaseTime: state.setBaseTime,
      selectionMessage: state.selectionMessage,
    })),
  );

  return (
    <TimeSelector
      timeSeconds={baseTime}
      setTime={setBaseTime}
      title="Hur mycket tid har du just nu?"
      selectionMessage={selectionMessage}
    />
  );
}
