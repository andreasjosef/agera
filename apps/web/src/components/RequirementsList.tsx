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
        <li className="flex items-center justify-between" key={requirement.id}>
          <div>
            <h2>{requirement.title}</h2>
            <p>{requirement.due}</p>
          </div>
          <span>{requirement.status}</span>
        </li>
      ))}
    </ul>
  );
}
