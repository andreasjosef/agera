import { Card } from "../primitives/Card";
import { Requirement } from "@ccpilot/domain";
import { formatDistanceToNow } from "date-fns";

interface RequirementCardProps {
  requirement: Requirement;
  index?: number;
}

export const RequirementCard = ({
  requirement,
  index,
}: RequirementCardProps) => {
  return (
    <Card className="cursor-pointer min-h-55">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between">
          <div className="bg-electric-violet-100 text-electric-violet-700 py-1 px-3 rounded-2xl text-sm font-medium">
            In Progress
          </div>

          {index !== undefined && (
            <div className="rounded-full bg-cod-gray-200 p-2.5 text-sm font-semibold text-content-muted">
              # {index + 1}
            </div>
          )}
        </div>

        <h2 className="mt-2 min-h-15 font-semibold text-xl leading-snug text-content-main">
          {requirement.title}
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-content-muted">
              Deadline
            </div>

            <div className="text-sm font-semibold text-content-main">
              {formatDistanceToNow(new Date(requirement.due), {
                addSuffix: true,
              })}
            </div>
          </div>

          <p className="text-sm text-content-muted">
            {new Date(requirement.due).toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
};
