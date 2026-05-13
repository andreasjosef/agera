import type { Meta, StoryObj } from "@storybook/react-vite";
import { NowCard } from "./NowCard";

import { mockStep } from "../mocks/steps";

const meta: Meta<typeof NowCard> = {
  title: "Features/NowCard",
  component: NowCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NowCard>;

export const Default: Story = {
  args: {
    step: mockStep,
    onDone: (id) => alert(`Step ${id} marked as done!`),
  },
};

export const Loading: Story = {
  render: () => <NowCard.Loading />,
};

export const Error: Story = {
  render: () => <NowCard.Error message="Kunde inte ladda steget!" />,
};
