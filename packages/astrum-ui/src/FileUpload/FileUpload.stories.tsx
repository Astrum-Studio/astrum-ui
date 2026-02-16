import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload, FileItem } from "./FileUpload";

const meta = {
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["large", "compact"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    multiple: {
      control: "boolean",
    },
    accept: {
      control: "text",
    },
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    buttonText: {
      control: "text",
    },
  },
  args: {
    size: "large",
    label: "Выберите файлы",
    description: "Перетащите файлы сюда или выберите их, щелкнув мышью.",
    buttonText: "Выберите файлы",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  maxWidth: 600,
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Выберите PDF-файлы",
    description: "Перетащите PDF-файлы сюда или выберите их, щелкнув мышью.",
    buttonText: "Выберите файлы",
  },
};

export const LargePDF: Story = {
  args: {
    size: "large",
    accept: ".pdf",
    label: "Выберите PDF-файлы",
    description: "Перетащите PDF-файлы сюда или выберите их, щелкнув мышью.",
    buttonText: "Выберите файлы",
  },
};

export const LargeDisabled: Story = {
  args: {
    size: "large",
    disabled: true,
    label: "Выберите PDF-файлы",
    description: "Перетащите PDF-файлы сюда или выберите их, щелкнув мышью.",
    buttonText: "Выберите файлы",
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
  },
};

export const CompactDisabled: Story = {
  args: {
    size: "compact",
    disabled: true,
  },
};

export const WithFileItem: Story = {
  render: function WithFileItemRender() {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div style={containerStyle}>
        <FileUpload
          size="large"
          accept=".png,.jpg,.jpeg"
          multiple
          onChange={(fileList) => {
            if (fileList) {
              setFiles(Array.from(fileList));
            }
          }}
        />
        {files.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {files.map((file, index) => (
              <FileItem
                key={index}
                name={file.name}
                size={file.size}
                onRemove={() => {
                  setFiles(files.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const FileItemExample: Story = {
  render: () => (
    <div style={containerStyle}>
      <FileItem name="Logo.png" size="20 KB" />
      <FileItem
        name="Document.pdf"
        size={1024 * 150}
        onRemove={() => console.log("removed")}
      />
      <FileItem name="Image.jpg" size="2.5 MB" />
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    return (
      <div style={containerStyle}>
        <FileUpload
          size="large"
          multiple
          onChange={(fileList) => {
            if (fileList) {
              setUploadedFiles((prev) => [...prev, ...Array.from(fileList)]);
            }
          }}
        />
        {uploadedFiles.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700 }}>
              Загруженные файлы ({uploadedFiles.length})
            </h3>
            {uploadedFiles.map((file, index) => (
              <FileItem
                key={index}
                name={file.name}
                size={file.size}
                onRemove={() => {
                  setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const BothSizes: Story = {
  render: () => (
    <div style={containerStyle}>
      <FileUpload size="large" label="Большой вариант" />
      <FileUpload size="compact" />
    </div>
  ),
};
