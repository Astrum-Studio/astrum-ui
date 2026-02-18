import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputCode } from "./InputCode";

const meta = {
  component: InputCode,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
  },
} satisfies Meta<typeof InputCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Поле обязательно для заполнения",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "123456",
  },
};
