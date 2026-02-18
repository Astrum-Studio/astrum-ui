import * as React from "react";
import "./Avatar.css";

function cn(
  ...args: (string | undefined | false | Record<string, boolean | undefined>)[]
): string {
  return args
    .flatMap((x) =>
      typeof x === "object" && x !== null
        ? Object.entries(x)
            .filter(([, v]) => v)
            .map(([k]) => k)
        : x
    )
    .filter(Boolean)
    .join(" ");
}

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4C13.6266 4 11.3066 4.70379 9.33316 6.02236C7.35977 7.34094 5.8217 9.21508 4.91345 11.4078C4.0052 13.6005 3.76756 16.0133 4.23058 18.3411C4.6936 20.6689 5.83649 22.807 7.51472 24.4853C9.19295 26.1635 11.3311 27.3064 13.6589 27.7694C15.9867 28.2324 18.3995 27.9948 20.5922 27.0865C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6934 28 18.3734 28 16C27.9988 12.8178 26.7342 9.76618 24.484 7.51599C22.2338 5.2658 19.1822 4.00115 16 4ZM16 8.8C16.5807 8.8 17.1483 8.97219 17.6312 9.2948C18.114 9.61742 18.4903 10.076 18.7125 10.6124C18.9347 11.1489 18.9929 11.7393 18.8796 12.3088C18.7663 12.8783 18.4867 13.4015 18.0761 13.8121C17.6655 14.2227 17.1423 14.5023 16.5728 14.6156C16.0033 14.7289 15.4129 14.6707 14.8764 14.4485C14.34 14.2263 13.8814 13.85 13.5588 13.3672C13.2362 12.8843 13.064 12.3167 13.064 11.736C13.0645 10.9575 13.374 10.211 13.9245 9.66049C14.475 9.11 15.2215 8.80051 16 8.8ZM21.224 21.2C21.2242 21.7291 21.0147 22.2368 20.6413 22.6117C20.2679 22.9866 19.7611 23.1981 19.232 23.2H12.768C12.2389 23.1981 11.7321 22.9866 11.3587 22.6117C10.9853 22.2368 10.7758 21.7291 10.776 21.2V19.864C10.7768 18.8182 11.1925 17.8155 11.932 17.076C12.6715 16.3365 13.6742 15.9208 14.72 15.92H17.28C18.3258 15.9208 19.3285 16.3365 20.068 17.076C20.8075 17.8155 21.2232 18.8182 21.224 19.864V21.2Z" fill="#ABABAB" />
  </svg>
);

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.293 15.619L15.619 5.29299C16.009 4.90299 16.642 4.90299 17.032 5.29299L18.708 6.96899C19.098 7.35899 19.098 7.99199 18.708 8.38199L8.381 18.707C8.194 18.895 7.94 19 7.675 19H5V16.325C5 16.06 5.105 15.806 5.293 15.619Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13.75 7.16016L16.84 10.2502" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3.00012 3L9.00012 9" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.00012 3L3.00012 9" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  onUpload?: (file: File) => void;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      size = 56,
      onUpload,
      onEdit,
      onRemove,
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onUpload) {
          onUpload(file);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [onUpload]
    );

    const handleClick = React.useCallback(() => {
      if (src) {
        if (onEdit) {
          onEdit();
        } else if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }
    }, [src, onEdit]);

    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onRemove) {
          onRemove();
        }
      },
      [onRemove]
    );

    const hasImage = Boolean(src);

    return (
      <div
        ref={ref}
        className={cn(
          "astrum-avatar",
          {
            "astrum-avatar--has-image": hasImage,
            "astrum-avatar--hovered": isHovered,
          },
          className
        )}
        style={{ width: size, height: size }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {onUpload && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="astrum-avatar__input"
          />
        )}
        {hasImage ? (
          <>
            <div className="astrum-avatar__body">
              <img src={src!} alt={alt} className="astrum-avatar__image" />
              <div className="astrum-avatar__overlay" aria-hidden />
              {(onEdit || onUpload) && (
                <div className="astrum-avatar__edit-icon" aria-hidden>
                  <EditIcon />
                </div>
              )}
            </div>
            {onRemove && (
              <button
                type="button"
                className="astrum-avatar__remove-button"
                onClick={handleRemove}
                aria-label="Удалить аватар"
              >
                <CrossIcon />
              </button>
            )}
          </>
        ) : (
          <div className="astrum-avatar__body">
            <div className="astrum-avatar__placeholder" aria-hidden>
              <span className="astrum-avatar__user-icon">
                <UserIcon />
              </span>
            </div>
            <div className="astrum-avatar__overlay" aria-hidden />
            <div className="astrum-avatar__add-icon" aria-hidden>
              <EditIcon />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
