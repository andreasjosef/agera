import type { Meta, StoryObj } from "@storybook/react-vite";
import { RequirementsList } from "./RequirementsList";

const meta: Meta<typeof RequirementsList> = {
  title: "Features/RequirementsList",
  component: RequirementsList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RequirementsList>;

export const Default: Story = {
  args: {
    requirements: [
      {
        id: "1",
        title: "Build authentication flow",
        due: new Date(Date.now() + 51400300).toISOString(),
        type: "assignment",
        source: "CANVAS",
        steps: [],
        status: "RAW",
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Fix dashboard layout",
        due: new Date(Date.now() + 1000000).toISOString(),
        type: "lecture",
        source: "MANUAL",
        steps: [],
        status: "RAW",
        updatedAt: new Date(),
      },
      {
        id: "3",
        title: "Create sign up form",
        due: new Date(Date.now() + 864000000).toISOString(),
        type: "lecture",
        source: "MANUAL",
        steps: [],
        status: "RAW",
        updatedAt: new Date(),
      },
    ],
  },
};
