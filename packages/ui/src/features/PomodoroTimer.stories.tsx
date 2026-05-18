import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PomodoroTimer } from "./PomodoroTimer";

const meta: Meta<typeof PomodoroTimer> = {
  title: "Features/PomodoroTimer",
  component: PomodoroTimer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    handleTogglePause: fn(),
    handleStop: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof PomodoroTimer>;

export const Default: Story = {
  args: {
    mode: "focus",
    isPaused: false,
    cyclesRemaining: 3,
    timeRemainingSeconds: 1500, // 25 min
  },
};

export const Break: Story = {
  args: {
    mode: "break",
    isPaused: false,
    cyclesRemaining: 3,
    timeRemainingSeconds: 300, // 5 min
  },
};

export const Pause: Story = {
  args: {
    mode: "focus",
    isPaused: true,
    cyclesRemaining: 2,
    timeRemainingSeconds: 242, // 04:02 min (aka answer to life)
  },
};
