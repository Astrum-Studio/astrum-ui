import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M10 4C5.5 4 2 10 2 10s3.5 6 8 6 8-6 8-6-3.5-6-8-6zm0 10a4 4 0 110-8 4 4 0 010 8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M4 4l12 12M7.5 7.5a4 4 0 015.5 5.5M2 10s2-4 8-4c1.5 0 2.8.5 3.8 1.2M18 10s-2-4-8-4c-.8 0-1.5.1-2.2.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M9 4a5 5 0 100 10 5 5 0 000-10zM14 14l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  component: Input,
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
    size: "m",
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

export const Filled: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
    defaultValue: "Иван",
  },
};

export const WithError: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
    error: "Поле обязательно для заполнения",
  },
};

export const WithErrorFilled: Story = {
  args: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
    defaultValue: "Иван",
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

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState("");
    return (
      <Input
        label="Ваше имя"
        placeholder="Введите ваше имя"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Password: Story = {
  render: function PasswordRender() {
    const [visible, setVisible] = useState(false);
    return (
      <Input
        label="Пароль"
        placeholder="Введите пароль"
        type={visible ? "text" : "password"}
        suffix={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
            aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
    );
  },
};

export const Search: Story = {
  render: function SearchRender() {
    const [value, setValue] = useState("");
    return (
      <Input
        label="Поиск"
        placeholder="Введите запрос"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        suffix={
          value ? (
            <button
              type="button"
              onClick={() => setValue("")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
              aria-label="Очистить"
            >
              <ClearIcon />
            </button>
          ) : (
            <SearchIcon />
          )
        }
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Input label="Размер S" placeholder="Placeholder" size="s" />
      <Input label="Размер M" placeholder="Placeholder" size="m" />
      <Input label="Размер L" placeholder="Placeholder" size="l" />
    </div>
  ),
};
