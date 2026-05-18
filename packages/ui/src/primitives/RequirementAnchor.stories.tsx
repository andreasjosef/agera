import type { Meta, StoryObj } from "@storybook/react-vite";
import { RequirementAnchor } from "./RequirementAnchor";

const meta: Meta<typeof RequirementAnchor> = {
  title: "Primitives/RequirementAnchor",
  component: RequirementAnchor,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RequirementAnchor>;

export const Default: Story = {
  args: {
    children: "U012 ChasChallenge",
  },
};
