import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chips } from "./Chips";

const meta = {
  component: Chips,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["s", "m"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Chip",
    size: "s",
    onRemove: () => {},
  },
} satisfies Meta<typeof Chips>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

export const Default: Story = {
  args: {
    children: "Chip",
  },
};

export const WithRemove: Story = {
  render: function WithRemoveRender() {
    const [chips, setChips] = useState(["Chip 1", "Chip 2", "Chip 3"]);
    return (
      <div style={rowStyle}>
        {chips.map((chip, index) => (
          <Chips
            key={index}
            onRemove={() => setChips(chips.filter((_, i) => i !== index))}
          >
            {chip}
          </Chips>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={rowStyle}>
      <Chips size="s" onRemove={() => {}}>
        Small
      </Chips>
      <Chips size="m" onRemove={() => {}}>
        Medium
      </Chips>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
    onRemove: () => {},
  },
};
