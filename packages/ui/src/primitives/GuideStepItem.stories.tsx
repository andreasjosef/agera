import type { Meta, StoryObj } from "@storybook/react-vite";
import { GuideStepItem } from "./GuideStepItem";

const meta: Meta<typeof GuideStepItem> = {
  title: "Primitives/GuideStepItem",
  component: GuideStepItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof GuideStepItem>;

export const Default: Story = {
  args: {
    index: 1,
    title: "Logga in",
    content: "Logga in på ditt Canvas-konto för att komma till din översikt.",
  },
};
