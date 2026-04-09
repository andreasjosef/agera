import { Requirement } from "@ccpilot/domain";

interface RequirementsListProps {
  requirments: Requirement[];
}

export default function RequirementsList({
  requirments,
}: RequirementsListProps) {
  return (
    <ul>
      {requirments.map((requirment) => (
        <li> {requirment.id} </li>
      ))}
    </ul>
  );
}
