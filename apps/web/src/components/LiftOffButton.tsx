import { cockpitMutations } from "@/modules/cockpit/api";
import { Button } from "@ccpilot/ui";
import { useMutation } from "@tanstack/react-query";

export default function LiftOffButton() {
  const { mutate } = useMutation({
    mutationFn: () => cockpitMutations.liftoff(),
    mutationKey: ["liftoff"],
    onSuccess: (data) => {
      console.log("[COCKPIT API] lift off success", data);
    },
  });

  return <Button onClick={() => mutate()}> Lift Off </Button>;
}
