import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Card",
  component: Card
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Account",
    children: "Your plan renews on the 1st of every month.",
    style: { width: 320 }
  }
};

export const WithFooter: Story = {
  args: {
    title: "Delete workspace",
    children: "This action is permanent and cannot be undone.",
    footer: (
      <Button variant="danger" size="sm">
        Delete
      </Button>
    ),
    style: { width: 320 }
  }
};
