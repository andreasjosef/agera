import { Requirement } from "@ccpilot/domain";

interface RequirementsListProps {
  requirements: Requirement[];
}

export default function RequirementsList({
  requirements,
}: RequirementsListProps) {
  return (
    <ul>
      {requirements.map((requirement) => (
        <li
          className="flex items-center justify-between bg-neutral-200 p-2 mb-2"
          key={requirement.id}
        >
          <div>
            <h2>Uppgift: {requirement.title}</h2>
            <p>Due: {new Date(requirement.due).toLocaleDateString()}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
