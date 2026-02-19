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

const optionsWithSecondary: SelectOption[] = [
  { value: "1", label: "Зерно пшеницы", secondaryLabel: "01.11.10.000-00000002" },
  { value: "2", label: "Зерно ячменя", secondaryLabel: "01.11.10.000-00000003" },
  { value: "3", label: "Зерно ржи", secondaryLabel: "01.11.10.000-00000004" },
  { value: "4", label: "Зерно овса", secondaryLabel: "01.11.10.000-00000005" },
];

const meta = {
  component: Select,
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
    multiple: {
      control: "boolean",
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
    placeholder: "Выберите вариант",
    options,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Выберите вариант",
    options,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Выберите вариант",
    options,
    error: "Поле обязательно для заполнения",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Выберите вариант",
    options,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: "Выберите вариант",
    options,
    required: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    placeholder: "Выберите вариант",
    options: [
      { value: "1", label: "Вариант 1" },
      { value: "2", label: "Вариант 2", disabled: true },
      { value: "3", label: "Вариант 3" },
      { value: "4", label: "Вариант 4", disabled: true },
    ],
  },
};

export const TwoLineOptions: Story = {
  args: {
    placeholder: "Выберите номенклатуру",
    options: optionsWithSecondary,
  },
};

