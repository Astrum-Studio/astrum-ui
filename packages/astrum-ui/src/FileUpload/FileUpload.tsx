import * as React from "react";
import { Button } from "../Button";

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M12.2666 53.1766C12.2666 54.7295 13.5372 56.0001 15.0901 56.0001H48.9725C50.5254 56.0001 51.796 54.7295 51.796 53.1766C51.796 51.6236 50.5254 50.353 48.9725 50.353H15.0901C13.5372 50.353 12.2666 51.6236 12.2666 53.1766Z" fill="#D5D5D5"/>
    <path d="M44.9917 26.6142H40.5023V40.7319C40.5023 42.2848 39.2317 43.5554 37.6787 43.5554H26.3846C24.8317 43.5554 23.5611 42.2848 23.5611 40.7319V26.6142H19.0717C16.5587 26.6142 15.2881 23.5648 17.067 21.786L30.027 8.82601C31.1281 7.72483 32.907 7.72483 34.0081 8.82601L46.9681 21.786C48.747 23.5648 47.5046 26.6142 44.9917 26.6142Z" fill="#D5D5D5"/>
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 3.8C9 3.32261 9.18964 2.86477 9.52721 2.52721C9.86477 2.18964 10.3226 2 10.8 2H15.4548C15.932 2.00042 16.3896 2.19034 16.7268 2.528L20.4732 6.272C20.6405 6.43937 20.7731 6.63808 20.8635 6.85675C20.9539 7.07543 21.0003 7.30978 21 7.5464V14.6C21 15.0774 20.8104 15.5352 20.4728 15.8728C20.1352 16.2104 19.6774 16.4 19.2 16.4H18V12.3452C17.9998 11.3905 17.6204 10.475 16.9452 9.8L13.2 6.0548C12.525 5.37962 11.6095 5.0002 10.6548 5H9V3.8Z" fill="#2653f2"/>
    <path d="M4.95 7C4.43283 7 3.93684 7.19755 3.57114 7.54918C3.20545 7.90081 3 8.37772 3 8.875V20.125C3 20.6223 3.20545 21.0992 3.57114 21.4508C3.93684 21.8025 4.43283 22 4.95 22H14.05C14.5672 22 15.0632 21.8025 15.4289 21.4508C15.7946 21.0992 16 20.6223 16 20.125V12.7763C15.9995 12.2791 15.7938 11.8025 15.428 11.4513L11.372 7.54875C11.1907 7.37452 10.9754 7.23637 10.7385 7.14221C10.5016 7.04805 10.2477 6.99973 9.9914 7H4.95Z" fill="#2653f2"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6.00049 6L18.0005 18" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.0005 6L6.00049 18" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

    const isPdf = accept?.toLowerCase().includes("pdf");
    const defaultLabel = label ?? (isPdf ? "Выберите PDF-файлы" : "Выберите файлы");
    const defaultDescription =
      description ??
      (size === "large"
        ? isPdf
          ? "Перетащите PDF-файлы сюда или выберите их, щелкнув мышью."
          : "Перетащите файлы сюда или выберите их, щелкнув мышью."
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

const IMAGE_TYPES = /^image\//i;

export interface FileItemProps {
  name: string;
  size?: number | string;
  file?: File;
  previewUrl?: string | null;
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const FileItem = React.forwardRef<HTMLDivElement, FileItemProps>(
  ({ name, size, file, previewUrl: previewUrlProp, icon, onRemove, className = "" }, ref) => {
    const [objectUrl, setObjectUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (previewUrlProp != null || !file || !IMAGE_TYPES.test(file.type)) return;
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    }, [file, previewUrlProp]);

    const previewUrl = previewUrlProp ?? objectUrl;
    const showPreview = previewUrl != null && previewUrl !== "";

    const formatSize = React.useCallback((sizeValue: number | string | undefined) => {
      if (!sizeValue) return "";
      if (typeof sizeValue === "string") return sizeValue;
      if (sizeValue < 1024) return `${sizeValue} B`;
      if (sizeValue < 1024 * 1024) return `${(sizeValue / 1024).toFixed(0)} KB`;
      return `${(sizeValue / (1024 * 1024)).toFixed(1)} MB`;
    }, []);

    return (
      <div ref={ref} className={`astrum-file-item ${className}`.trim()}>
        <div className="astrum-file-item__preview-wrap">
          {showPreview ? (
            <img
              src={previewUrl}
              alt=""
              className="astrum-file-item__preview"
              decoding="async"
            />
          ) : (
            <span className="astrum-file-item__icon">{icon ?? <FileIcon />}</span>
          )}
        </div>
        <div className="astrum-file-item__content">
          <div className="astrum-file-item__name">{name}</div>
          {size != null && <div className="astrum-file-item__size">{formatSize(size)}</div>}
        </div>
        <button
          type="button"
          className="astrum-file-item__remove"
          onClick={onRemove}
          aria-label="Удалить файл"
          disabled={onRemove == null}
        >
          <CloseIcon />
        </button>
      </div>
    );
  }
);

FileItem.displayName = "FileItem";
