import type { Meta, StoryObj } from "@storybook/react-vite";
import { UpcomingSteps } from "./UpcomingSteps";
import { mockUpcomingSteps } from "../mocks/steps";

const meta: Meta<typeof UpcomingSteps> = {
  title: "Features/UpcomingSteps",
  component: UpcomingSteps,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UpcomingSteps>;

export const Default: Story = {
  args: {
    steps: mockUpcomingSteps,
    RequirementLink: ({ children }) => (
      <span className="cursor-pointer hover:underline">{children}</span>
    ),
  },
};
