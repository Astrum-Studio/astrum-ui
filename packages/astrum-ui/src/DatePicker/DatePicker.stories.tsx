import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker, DateRange } from "./DatePicker";

const meta = {
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    error: {
      control: "text",
    },
    showTime: {
      control: "boolean",
    },
    range: {
      control: "boolean",
    },
    placeholderFrom: {
      control: "text",
    },
    placeholderTo: {
      control: "text",
    },
  },
  args: {
    placeholder: "Дата",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Дата",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Дата",
    defaultValue: new Date(2024, 3, 24),
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Дата",
    error: "Поле обязательно для заполнения",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Дата",
    disabled: true,
  },
};

export const WithTime: Story = {
  args: {
    placeholder: "Дата",
    showTime: true,
    timeLabel: "Время (UTC):",
  },
};

export const WithTimeValue: Story = {
  args: {
    placeholder: "Дата",
    showTime: true,
    timeLabel: "Время (UTC):",
    defaultValue: new Date(2024, 3, 24, 18, 40),
  },
};

export const Range: Story = {
  args: {
    placeholderFrom: "От",
    placeholderTo: "До",
    range: true,
  },
};

export const RangeWithValue: Story = {
  args: {
    placeholderFrom: "От",
    placeholderTo: "До",
    range: true,
    defaultValue: [new Date(2024, 3, 1), new Date(2024, 3, 25)],
  },
};