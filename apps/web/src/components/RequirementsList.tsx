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
        <li key={requirement.id}>
          <h2>{requirement.title}</h2>
          <p>{requirement.due}</p>
        </li>
      ))}
    </ul>
  );
}
