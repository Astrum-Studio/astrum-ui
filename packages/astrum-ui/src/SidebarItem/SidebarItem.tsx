import * as React from "react";
import "./SidebarItem.css";

type SharedSidebarItemProps = {
  leadingIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  showEndIcon?: boolean;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export type SidebarItemProps =
  | (SharedSidebarItemProps & {
      href?: undefined;
      as?: undefined;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | (SharedSidebarItemProps & {
      href: string;
      as?: React.ElementType;
      disabled?: boolean;
    } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedSidebarItemProps | "disabled">);

export function SidebarItemSettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M10.9404 21C10.5354 21 10.1868 20.865 9.89463 20.595C9.60243 20.325 9.42603 19.995 9.36543 19.605L9.16293 18.12C8.96793 18.045 8.78433 17.955 8.61213 17.85C8.43993 17.745 8.27103 17.6325 8.10543 17.5125L6.71043 18.0975C6.33543 18.2625 5.96043 18.2775 5.58543 18.1425C5.21043 18.0075 4.91793 17.7675 4.70793 17.4225L3.65043 15.5775C3.44043 15.2325 3.38043 14.865 3.47043 14.475C3.56043 14.085 3.76293 13.7625 4.07793 13.5075L5.27043 12.6075C5.25543 12.5025 5.24793 12.4011 5.24793 12.3033V11.6958C5.24793 11.5986 5.25543 11.4975 5.27043 11.3925L4.07793 10.4925C3.76293 10.2375 3.56043 9.915 3.47043 9.525C3.38043 9.135 3.44043 8.7675 3.65043 8.4225L4.70793 6.5775C4.91793 6.2325 5.21043 5.9925 5.58543 5.8575C5.96043 5.7225 6.33543 5.7375 6.71043 5.9025L8.10543 6.4875C8.27043 6.3675 8.44293 6.255 8.62293 6.15C8.80293 6.045 8.98293 5.955 9.16293 5.88L9.36543 4.395C9.42543 4.005 9.60183 3.675 9.89463 3.405C10.1874 3.135 10.536 3 10.9404 3H13.0554C13.4604 3 13.8093 3.135 14.1021 3.405C14.3949 3.675 14.571 4.005 14.6304 4.395L14.8329 5.88C15.0279 5.955 15.2118 6.045 15.3846 6.15C15.5574 6.255 15.726 6.3675 15.8904 6.4875L17.2854 5.9025C17.6604 5.7375 18.0354 5.7225 18.4104 5.8575C18.7854 5.9925 19.0779 6.2325 19.2879 6.5775L20.3454 8.4225C20.5554 8.7675 20.6154 9.135 20.5254 9.525C20.4354 9.915 20.2329 10.2375 19.9179 10.4925L18.7254 11.3925C18.7404 11.4975 18.7479 11.5989 18.7479 11.6967V12.3033C18.7479 12.4011 18.7329 12.5025 18.7029 12.6075L19.8954 13.5075C20.2104 13.7625 20.4129 14.085 20.5029 14.475C20.5929 14.865 20.5329 15.2325 20.3229 15.5775L19.2429 17.4225C19.0329 17.7675 18.7404 18.0075 18.3654 18.1425C17.9904 18.2775 17.6154 18.2625 17.2404 18.0975L15.8904 17.5125C15.7254 17.6325 15.5529 17.745 15.3729 17.85C15.1929 17.955 15.0129 18.045 14.8329 18.12L14.6304 19.605C14.5704 19.995 14.3943 20.325 14.1021 20.595C13.8099 20.865 13.461 21 13.0554 21H10.9404ZM12.0429 15.15C12.9129 15.15 13.6554 14.8425 14.2704 14.2275C14.8854 13.6125 15.1929 12.87 15.1929 12C15.1929 11.13 14.8854 10.3875 14.2704 9.7725C13.6554 9.1575 12.9129 8.85 12.0429 8.85C11.1579 8.85 10.4115 9.1575 9.80373 9.7725C9.19593 10.3875 8.89233 11.13 8.89293 12C8.89353 12.87 9.19743 13.6125 9.80463 14.2275C10.4118 14.8425 11.1579 15.15 12.0429 15.15Z" fill="currentColor"/>
    </svg>
  );
}

export function SidebarItemFlashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0767 2.5284C11.1925 2.56607 11.2934 2.63941 11.3649 2.73793C11.4365 2.83644 11.4751 2.95508 11.4751 3.07685V7.88444H15.5135C15.6199 7.88439 15.7243 7.91378 15.8151 7.96937C15.9058 8.02495 15.9794 8.10456 16.0278 8.19939C16.0761 8.29421 16.0973 8.40056 16.0889 8.50666C16.0805 8.61276 16.043 8.71449 15.9804 8.80058L9.82669 17.2619C9.75514 17.3605 9.65421 17.4339 9.53837 17.4717C9.42253 17.5094 9.29773 17.5094 9.18184 17.4719C9.06596 17.4343 8.96494 17.361 8.89327 17.2625C8.8216 17.164 8.78295 17.0453 8.78287 16.9235V12.1159H4.74449C4.63793 12.116 4.53341 12.0867 4.44252 12.0311C4.35163 11.9754 4.27792 11.8957 4.22957 11.8008C4.18121 11.7058 4.1601 11.5993 4.16858 11.4931C4.17705 11.3869 4.21478 11.2851 4.27758 11.199L10.4313 2.73763C10.503 2.63905 10.604 2.56571 10.72 2.52812C10.8359 2.49053 10.9608 2.49063 11.0767 2.5284Z" fill="#DEAA01"/>
    </svg>
  );
}

export const SidebarItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, SidebarItemProps>(
  function SidebarItem(props, ref) {
    const {
      leadingIcon,
      endIcon,
      showEndIcon = true,
      active = false,
      className = "",
      children,
      href,
      as,
      ...rest
    } = props;

    const hasLead = leadingIcon != null;
    const classes = [
      "astrum-sidebar-item",
      hasLead ? "astrum-sidebar-item--has-lead" : "",
      active ? "astrum-sidebar-item--active" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {hasLead && <span className="astrum-sidebar-item__lead">{leadingIcon}</span>}
        <span className="astrum-sidebar-item__main">
          <span className="astrum-sidebar-item__label">{children}</span>
          {showEndIcon && (
            <span className="astrum-sidebar-item__end">{endIcon ?? <SidebarItemFlashIcon />}</span>
          )}
        </span>
      </>
    );

    const isLink = typeof href === "string" && href.length > 0;

    if (isLink) {
      const Component = (as ?? "a") as React.ElementType;
      const {
        disabled: anchorDisabled,
        onClick,
        onKeyDown,
        ...anchorRest
      } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean };

      const disabled = Boolean(anchorDisabled);
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
        }
        onKeyDown?.(e);
      };

      return (
        <Component
          ref={ref}
          {...anchorRest}
          href={href}
          className={classes}
          aria-current={active ? "page" : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : anchorRest.tabIndex}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {content}
        </Component>
      );
    }

    const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        aria-current={active ? "page" : undefined}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

SidebarItem.displayName = "SidebarItem";
