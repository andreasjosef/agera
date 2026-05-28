import type { Meta, StoryObj } from "@storybook/react-vite";
import { IntegrationStatus } from "./IntegrationStatus";
import { fn } from "storybook/test";

const meta: Meta<typeof IntegrationStatus> = {
  title: "Features/IntegrationStatus",
  component: IntegrationStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-2xl">
        <Story />
      </div>
    ),
  ],
  args: {
    platform: "Canvas",
    reSync: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof IntegrationStatus>;

export const Default: Story = {
  args: {
    integration: { status: "STABLE", lastSync: new Date() },
    syncPollingData: { status: "IDLE", stats: { active: 2, total: 2 } },
  },
};
export const Syncing: Story = {
  args: {
    integration: { status: "SYNCING", lastSync: new Date() },
    syncPollingData: { status: "PROCESSING", stats: { active: 2, total: 2 } },
  },
};
export const Error: Story = {
  args: {
    integration: { status: "ERROR", lastSync: new Date(), error: "" },
    syncPollingData: { status: "ERROR", stats: { active: 0, total: 0 } },
  },
};
export const NotFound: Story = {
  args: {
    integration: { status: "NOT_FOUND" },
    syncPollingData: { status: "ERROR", stats: { active: 0, total: 0 } },
  },
};
