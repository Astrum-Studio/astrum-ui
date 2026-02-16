import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPicker } from "./ColorPicker";

const meta = {
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "color" },
    },
    disabled: {
      control: "boolean",
    },
    colors: {
      control: "object",
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ColorPicker value={value} onChange={setValue} aria-label="Выбор цвета" />
    );
  },
};

export const WithSelection: Story = {
  render: function WithSelectionRender() {
    const [value, setValue] = useState<string | null>("#4CAF50");
    return (
      <ColorPicker value={value} onChange={setValue} aria-label="Выбор цвета" />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: "#2196F3",
    disabled: true,
  },
};

export const CustomColors: Story = {
  render: function CustomColorsRender() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ColorPicker
        value={value}
        onChange={setValue}
        colors={["#F44336", "#9C27B0", "#3F51B5", "#03A9F4", "#009688"]}
        aria-label="Выбор цвета"
      />
    );
  },
};
