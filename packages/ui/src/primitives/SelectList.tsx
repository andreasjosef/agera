import { mergeStyles } from "../utils";

interface SelectListOption<T extends string | number> {
  label: string;
  value: T;
}

interface SelectListProps<T extends string | number> {
  options: readonly SelectListOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  columns?: number;
}

export function SelectList<T extends string | number>({
  options,
  value,
  onChange,
  className = "",
  columns = 4,
}: SelectListProps<T>) {
  return (
    <ul
      className={`grid gap-x-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map(({ label, value: optionValue }) => {
        const isActive = value === optionValue;

        return (
          <li className="grid" key={String(optionValue)}>
            <button
              type="button"
              className={mergeStyles(
                "rounded-sm border-2 p-2 w-full cursor-pointer",
                isActive
                  ? "bg-brand-primary text-app-bg border-brand-primary"
                  : "border-cod-gray-300 text-content-main",
              )}
              onClick={() => onChange(optionValue)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
