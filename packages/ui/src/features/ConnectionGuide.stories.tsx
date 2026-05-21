import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectionGuide } from "./ConnectionGuide";
import { mockConnectionGuideSteps } from "../mocks/steps";

const meta: Meta<typeof ConnectionGuide> = {
  title: "Features/ConnectionGuide",
  component: ConnectionGuide,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ConnectionGuide>;

export const Default: Story = {
  args: {
    title: "Hur får man sin Canvas token ?",
    steps: mockConnectionGuideSteps,
  },
};
