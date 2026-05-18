import { useTimer } from "@/modules/cockpit/store";
import { TimeSelector } from "@ccpilot/ui";
import { useShallow } from "zustand/react/shallow";

export default function TimeSelectorManager() {
  const { baseTime, setBaseTime, submitBaseTime } = useTimer(
    useShallow((state) => ({
      baseTime: state.baseTime,
      setBaseTime: state.setBaseTime,
      submitBaseTime: state.submitBaseTime,
    })),
  );

  return (
    <TimeSelector
      timeSeconds={baseTime}
      setTime={setBaseTime}
      handleSelectSubmit={(e) => {
        e.preventDefault();
        submitBaseTime();
        console.log("TODO: Update planning");
      }}
    />
  );
}
