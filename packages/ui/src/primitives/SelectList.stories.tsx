import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectList } from "./SelectList";
import { Card } from "./Card";
import { useState } from "react";

const meta: Meta<typeof SelectList> = {
  title: "Primitives/SelectList",
  component: SelectList,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SelectList>;

const timeOptions = [
  { label: "30 min", value: 30 * 60 },
  { label: "90 min", value: 90 * 60 },
  { label: "2 h", value: 120 * 60 },
  { label: "4 h", value: 240 * 60 },
] as const;

const energyOptions = [
  { label: "Låg", value: "low" },
  { label: "Hög", value: "high" },
] as const;

export const FourColumns: Story = {
  render: () => (
    <Card width="max-w-[500px]">
      <SelectListWrapper options={timeOptions} defaultValue={30 * 60} />
    </Card>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Card width="max-w-[400px]">
      <SelectListWrapper
        options={energyOptions}
        defaultValue="normal"
        columns={2}
      />
    </Card>
  ),
};

function SelectListWrapper<T extends string | number>({
  options,
  defaultValue,
  columns = 4,
}: {
  options: readonly { label: string; value: T }[];
  defaultValue: T;
  columns?: number;
}) {
  const [value, setValue] = useState<T>(defaultValue);

  return (
    <SelectList
      options={options}
      value={value}
      onChange={setValue}
      columns={columns}
    />
  );
}
