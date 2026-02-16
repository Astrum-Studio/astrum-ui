import * as React from "react";

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M7.5 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultAvatarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface ListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: React.ReactNode;
  showChevron?: boolean;
}

export const ListItem = React.forwardRef<HTMLButtonElement, ListItemProps>(
  (
    {
      title,
      subtitle,
      avatar,
      showChevron = true,
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`astrum-list-item ${className}`.trim()}
        {...rest}
      >
        <div className="astrum-list-item__avatar">
          {avatar ?? <DefaultAvatarIcon />}
        </div>
        <div className="astrum-list-item__content">
          <div className="astrum-list-item__title">{title}</div>
          {subtitle != null && (
            <div className="astrum-list-item__subtitle">{subtitle}</div>
          )}
        </div>
        {showChevron && (
          <div className="astrum-list-item__chevron" aria-hidden>
            <ChevronRightIcon />
          </div>
        )}
      </button>
    );
  }
);

ListItem.displayName = "ListItem";
