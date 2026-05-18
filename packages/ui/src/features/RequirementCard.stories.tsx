import type { Meta, StoryObj } from "@storybook/react-vite";
import { RequirementCard } from "./RequirementCard";

const meta: Meta<typeof RequirementCard> = {
  title: "Features/RequirementsList/RequirementCard",
  component: RequirementCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RequirementCard>;

export const Default: Story = {
  args: {
    requirement: {
      id: "1",
      title: "Submit project report",
      due: "2026-05-25",

      type: "assignment",
      source: "CANVAS",

      steps: [],

      status: "RAW",

      updatedAt: new Date(),
    },
  },
};
