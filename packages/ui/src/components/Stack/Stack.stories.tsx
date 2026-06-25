import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Stack",
  component: Stack
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    direction: "row",
    gap: 3,
    children: (
      <>
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </>
    )
  }
};

export const Column: Story = {
  args: {
    direction: "column",
    gap: 2,
    children: (
      <>
        <Button fullWidth>One</Button>
        <Button fullWidth variant="secondary">
          Two
        </Button>
      </>
    )
  }
};
