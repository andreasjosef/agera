import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    width: "w-[400px]",
    children: (
      <div className="space-y-2">
        <h3 className="font-display font-bold">Card Title</h3>
        <p className="font-body text-slate-500">
          This is our card wrapper with a hard shadow.
        </p>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    width: "w-[800px]",
    children: <p>A much wider container for complex data.</p>,
  },
};
