import { Requirement } from "@ccpilot/domain";
import { Link } from "@tanstack/react-router";

interface RequirementsListProps {
  requirements: Requirement[];
}

export default function RequirementsList({
  requirements,
}: RequirementsListProps) {
  return (
    <>
      <nav>
        <button className="primary-button bg-app-surface-raised text-content-main">
          Alla
        </button>
      </nav>
      <ul className="grid grid-cols-3 gap-4">
        {requirements.map((requirement) => (
          <li
            className="flex items-center justify-between bg-app-surface p-2 mb-2"
            key={requirement.id}
          >
            <Link className="hover:cursor-pointer" to={requirement.id}>
              <div>
                <h2 className="font-semibold">{requirement.title}</h2>
                <p>Due: {new Date(requirement.due).toLocaleDateString()}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
