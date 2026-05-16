import { Requirement } from "@ccpilot/domain";
import { formatDistanceToNow } from "date-fns";

interface RequirementsListProps {
  requirements: Requirement[];
}

export function RequirementsList({ requirements }: RequirementsListProps) {
  return (
    <>
      <nav className="mb-8">
        <button className="primary-button bg-app-surface-raised text-content-main font-medium text-3xl">
          Mina Uppdrag
        </button>
      </nav>
      <ul className="grid grid-cols-3 gap-6">
        {requirements
          // Sort assignments by deadline
          .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
          .map((requirement, index) => (
            <li
              className="bg-app-surface p-6 min-h-58 border border-app-border
              transition-all duration-300 ease-in-out rounded-xl shadow-sm hover:-translate-y-1.5
               hover:shadow-md flex flex-col"
              key={requirement.id}
            >
              <div className="flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  {/* Thinking maybe we could add status such as 
                "Not Started" | "In Progress" | "Review" | "Completed" */}
                  <div className="bg-electric-violet-100 text-electric-violet-700 py-1 px-3 rounded-2xl text-sm font-medium">
                    In Progress
                  </div>
                  <div className="rounded-full bg-cod-gray-200 p-2.5 text-sm font-semibold text-content-muted">
                    # {index + 1}
                  </div>
                </div>

                <h2 className="mt-2 min-h-15 font-semibold text-xl leading-snug text-content-main">
                  {requirement.title}
                </h2>

                <div className="flex gap-1 items-center justify-between">
                  <div className="flex items-center gap-2">
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
            </li>
          ))}
      </ul>
    </>
  );
}
