import { CircleX } from "lucide-react";

interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="flex gap-2">
      <CircleX className="stroke-state-danger" />
      <p>{message}</p>
    </div>
  );
}
