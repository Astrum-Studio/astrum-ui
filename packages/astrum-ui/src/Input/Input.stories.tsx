import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["text", "tel", "email", "number", "password", "search"],
      control: { type: "select" },
    },
    size: {
      options: ["s", "m"],
      control: { type: "radio" },
    },
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
  },
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
  },
};

export const WithError: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
    error: "Поле обязательно для заполнения",
  },
};

export const Disabled: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
    required: true,
  },
};

export const Password: Story = {
  render: function PasswordRender() {
    return (
      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
      />
    );
  },
};

export const Search: Story = {
  render: function SearchRender() {
    const [value, setValue] = useState("");
    return (
      <Input
        type="search"
        label="Поиск"
        placeholder="Введите запрос"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 301 }}>
      <Input label="Компактный" placeholder="Размер S" size="s" />
      <Input label="Стандартный" placeholder="Размер M" size="m" />
    </div>
  ),
};
