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
    label: {
      control: "text",
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
  },
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
  },
};

export const WithValue: Story = {
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
    defaultValue: new Date(2024, 3, 24),
  },
};

export const WithError: Story = {
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
    error: "Поле обязательно для заполнения",
  },
};

export const WithErrorSelected: Story = {
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
    defaultValue: new Date(2024, 3, 24),
    error: "Поле обязательно для заполнения",
  },
};

export const Disabled: Story = {
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Дата",
    placeholder: "дд.мм.гггг",
    required: true,
  },
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Дата"
        placeholder="дд.мм.гггг"
        value={value}
        onChange={(date) => setValue(date)}
      />
    );
  },
};

export const WithTime: Story = {
  args: {
    label: "Дата и время",
    placeholder: "дд.мм.гггг",
    showTime: true,
    timeLabel: "Время (UTC):",
  },
};

export const WithTimeValue: Story = {
  args: {
    label: "Дата и время",
    placeholder: "дд.мм.гггг",
    showTime: true,
    timeLabel: "Время (UTC):",
    defaultValue: new Date(2024, 3, 24, 18, 40),
  },
};

export const Range: Story = {
  args: {
    label: "Период",
    placeholderFrom: "От",
    placeholderTo: "До",
    range: true,
  },
};

export const RangeWithValue: Story = {
  args: {
    label: "Период",
    placeholderFrom: "От",
    placeholderTo: "До",
    range: true,
    defaultValue: [new Date(2024, 3, 1), new Date(2024, 3, 25)],
  },
};

export const RangeControlled: Story = {
  render: function RangeControlledRender() {
    const [range, setRange] = useState<DateRange>([null, null]);
    return (
      <DatePicker
        label="Период"
        placeholderFrom="От"
        placeholderTo="До"
        range={true}
        value={range}
        onChange={(newRange) => setRange(newRange)}
      />
    );
  },
};
