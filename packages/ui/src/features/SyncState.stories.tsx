import type { Meta, StoryObj } from "@storybook/react-vite";
import { SyncState } from "./SyncState";

const meta: Meta<typeof SyncState> = {
  title: "Features/SyncState",
  component: SyncState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof SyncState>;

export const Default: Story = {
  args: {
    integrationStatus: "STABLE",
    syncStatus: "IDLE",
  },
};
export const Processing: Story = {
  args: {
    integrationStatus: "SYNCING",
    syncStatus: "PROCESSING",
  },
};
export const Error: Story = {
  args: {
    integrationStatus: "ERROR",
    syncStatus: "ERROR",
  },
};
