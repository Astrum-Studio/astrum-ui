import * as React from "react";
import { Button } from "../Button";

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
    <path
      d="M24 8v24m0 0l-8-8m8 8l8-8M8 32h32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: "large" | "compact";
  label?: string;
  description?: string;
  buttonText?: string;
  onChange?: (files: FileList | null) => void;
  className?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      disabled = false,
      size = "large",
      label,
      description,
      buttonText = "Выберите файлы",
      onChange,
      className = "",
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [files, setFiles] = React.useState<FileList | null>(null);

    const setRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref]
    );

    const handleDragEnter = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
          setFiles(droppedFiles);
          onChange?.(droppedFiles);
        }
      },
      [disabled, onChange]
    );

    const handleFileChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
          setFiles(selectedFiles);
          onChange?.(selectedFiles);
        }
      },
      [onChange]
    );

    const handleButtonClick = React.useCallback(() => {
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    }, [disabled]);

    const defaultLabel = label ?? (accept?.includes("pdf") ? "Выберите PDF-файлы" : "Выберите файлы");
    const defaultDescription =
      description ??
      (size === "large"
        ? "Перетащите файлы сюда или выберите их, щелкнув мышью."
        : "Выберите файл или перетащите сюда");

    return (
      <div
        className={`astrum-file-upload ${size === "compact" ? "astrum-file-upload--compact" : "astrum-file-upload--large"} ${isDragging ? "astrum-file-upload--dragging" : ""} ${disabled ? "astrum-file-upload--disabled" : ""} ${className}`.trim()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={setRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          className="astrum-file-upload__input"
          aria-label={defaultLabel}
        />
        {size === "large" ? (
          <>
            <div className="astrum-file-upload__icon">
              <UploadIcon />
            </div>
            <div className="astrum-file-upload__label">{defaultLabel}</div>
            <div className="astrum-file-upload__description">{defaultDescription}</div>
            <Button variant="primary" size="m" onClick={handleButtonClick} disabled={disabled}>
              {buttonText}
            </Button>
          </>
        ) : (
          <div className="astrum-file-upload__compact-content">
            <span className="astrum-file-upload__compact-text">
              <button
                type="button"
                className="astrum-file-upload__compact-link"
                onClick={handleButtonClick}
                disabled={disabled}
              >
                Выберите файл
              </button>{" "}
              или перетащите сюда
            </span>
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export interface FileItemProps {
  name: string;
  size?: number | string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const FileItem = React.forwardRef<HTMLDivElement, FileItemProps>(
  ({ name, size, icon, onRemove, className = "" }, ref) => {
    const formatSize = React.useCallback((sizeValue: number | string | undefined) => {
      if (!sizeValue) return "";
      if (typeof sizeValue === "string") return sizeValue;
      if (sizeValue < 1024) return `${sizeValue} B`;
      if (sizeValue < 1024 * 1024) return `${(sizeValue / 1024).toFixed(0)} KB`;
      return `${(sizeValue / (1024 * 1024)).toFixed(1)} MB`;
    }, []);

    return (
      <div ref={ref} className={`astrum-file-item ${className}`.trim()}>
        <div className="astrum-file-item__icon">{icon ?? <FileIcon />}</div>
        <div className="astrum-file-item__content">
          <div className="astrum-file-item__name">{name}</div>
          {size != null && <div className="astrum-file-item__size">{formatSize(size)}</div>}
        </div>
        {onRemove != null && (
          <button
            type="button"
            className="astrum-file-item__remove"
            onClick={onRemove}
            aria-label="Удалить файл"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

FileItem.displayName = "FileItem";
