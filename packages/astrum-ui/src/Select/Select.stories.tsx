import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectOption } from "./Select";

const options: SelectOption[] = [
  { value: "1", label: "Вариант 1" },
  { value: "2", label: "Вариант 2" },
  { value: "3", label: "Вариант 3" },
  { value: "4", label: "Вариант 4" },
];

const manyOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: String(i + 1),
  label: `Вариант ${i + 1}`,
}));

const meta = {
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["s", "m", "l"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    multiple: {
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
    options: {
      control: "object",
    },
  },
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
    size: "m",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
  },
};

export const WithValue: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
    defaultValue: "2",
  },
};

export const WithError: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
    error: "Поле обязательно для заполнения",
  },
};

export const WithErrorSelected: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
    defaultValue: "2",
    error: "Поле обязательно для заполнения",
  },
};

export const Disabled: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options,
    required: true,
  },
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState<string>("");
    return (
      <Select
        label="Ваше имя"
        placeholder="Выберите вариант"
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Выберите вариант",
    options: [
      { value: "1", label: "Вариант 1" },
      { value: "2", label: "Вариант 2", disabled: true },
      { value: "3", label: "Вариант 3" },
      { value: "4", label: "Вариант 4", disabled: true },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    label: "Выберите вариант",
    placeholder: "Выберите из списка",
    options: manyOptions,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Select label="Размер S" placeholder="Placeholder" options={options} size="s" />
      <Select label="Размер M" placeholder="Placeholder" options={options} size="m" />
      <Select label="Размер L" placeholder="Placeholder" options={options} size="l" />
    </div>
  ),
};
