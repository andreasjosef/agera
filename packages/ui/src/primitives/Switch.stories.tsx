import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "./Switch";
import { Card } from "./Card";

const meta: Meta<typeof Switch> = {
  title: "Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Card>
        <Story />
      </Card>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <Switch
        isEnabled={isEnabled}
        setIsEnabled={(val) => {
          setIsEnabled(val);
          args.setIsEnabled(val);
        }}
        onLabel="Aktiverad"
        offLabel="Inaktiverad"
      />
    );
  },
};
