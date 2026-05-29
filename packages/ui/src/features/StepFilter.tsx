const filterOptions = [
  { label: "Allt", value: "all" },
  { label: "Genomförd", value: "done" },
  { label: "Kommande", value: "todo" },
] as const;

export type StepFilterMode = "all" | "done" | "todo";

interface StepFilterProps {
  stepFilter: StepFilterMode;
  setStepFilter: (mode: StepFilterMode) => void;
}

export function StepFilter({ stepFilter, setStepFilter }: StepFilterProps) {
  return (
    <div className="grid gap-y-2 w-auto">
      <h3 className="text-lg font-semibold"> Filtrera efter status: </h3>
      <select
        value={stepFilter}
        onChange={(e) => setStepFilter(e.target.value as StepFilterMode)}
      >
        {filterOptions.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
