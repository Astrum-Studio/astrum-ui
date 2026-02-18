import * as React from "react";
import "./DatePicker.css";

const CalendarIcon = ({ isActive }: { isActive?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke={isActive ? "#2653F2" : "#ABABAB"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2V6"
      stroke={isActive ? "#2653F2" : "#ABABAB"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2V6"
      stroke={isActive ? "#2653F2" : "#ABABAB"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 10H21"
      stroke={isActive ? "#2653F2" : "#ABABAB"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#ABABAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6V12L16 14" stroke="#ABABAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const formatDate = (date: Date | null): string => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const parseDate = (value: string): Date | null => {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === parseInt(month) - 1 &&
    date.getDate() === parseInt(day)
  ) {
    return date;
  }
  return null;
};

const formatTime = (date: Date | null): string => {
  if (!date) return "";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const parseTime = (value: string): { hours: number; minutes: number } | null => {
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
    return { hours, minutes };
  }
  return null;
};

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
};

const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  const dateTime = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();
  return dateTime >= startTime && dateTime <= endTime;
};

const isDateRangeStart = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start) return false;
  return isSameDay(date, start);
};

const isDateRangeEnd = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!end) return false;
  return isSameDay(date, end);
};

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export type DateRange = [Date | null, Date | null];

export interface DatePickerProps {
  label?: string;
  placeholder?: string;
  placeholderFrom?: string;
  placeholderTo?: string;
  value?: Date | null | DateRange;
  defaultValue?: Date | null | DateRange;
  onChange?: ((date: Date | null) => void) | ((range: DateRange) => void);
  error?: string;
  required?: boolean;
  disabled?: boolean;
  showTime?: boolean;
  timeLabel?: string;
  range?: boolean;
  className?: string;
  id?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      placeholder = "дд.мм.гггг",
      placeholderFrom = "От",
      placeholderTo = "До",
      value,
      defaultValue,
      onChange,
      error,
      required,
      disabled,
      showTime = false,
      timeLabel = "Время (UTC):",
      range = false,
      className = "",
      id: idProp,
    },
    ref
  ) => {
    const id = React.useId();
    const inputId = idProp ?? id;
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalDate, setInternalDate] = React.useState<Date | null>(
      range ? null : (defaultValue as Date | null) ?? null
    );
    const [internalRange, setInternalRange] = React.useState<DateRange>(
      range ? (defaultValue as DateRange | undefined) ?? [null, null] : [null, null]
    );
    const [selectingStart, setSelectingStart] = React.useState(true);
    const [internalTime, setInternalTime] = React.useState<string>(
      !range && defaultValue ? formatTime(defaultValue as Date) : ""
    );
    const [viewDate, setViewDate] = React.useState<Date>(() => {
      if (range) {
        const rangeValue = (value as DateRange | undefined) ?? (defaultValue as DateRange | undefined);
        return rangeValue?.[0] ? new Date(rangeValue[0].getFullYear(), rangeValue[0].getMonth(), 1) : new Date();
      }
      return value ? (value as Date) : defaultValue ? (defaultValue as Date) : new Date();
    });
    const [inputValue, setInputValue] = React.useState<string>(() => {
      if (range) return "";
      return value ? formatDate(value as Date) : defaultValue ? formatDate(defaultValue as Date) : "";
    });
    const [inputValueFrom, setInputValueFrom] = React.useState<string>(() => {
      if (!range) return "";
      const rangeValue = (value as DateRange | undefined) ?? (defaultValue as DateRange | undefined);
      return rangeValue?.[0] ? formatDate(rangeValue[0]) : "";
    });
    const [inputValueTo, setInputValueTo] = React.useState<string>(() => {
      if (!range) return "";
      const rangeValue = (value as DateRange | undefined) ?? (defaultValue as DateRange | undefined);
      return rangeValue?.[1] ? formatDate(rangeValue[1]) : "";
    });
    const [timeValue, setTimeValue] = React.useState<string>(
      !range && value && showTime ? formatTime(value as Date) : !range && defaultValue && showTime ? formatTime(defaultValue as Date) : ""
    );
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const calendarRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const inputFromRef = React.useRef<HTMLInputElement | null>(null);
    const inputToRef = React.useRef<HTMLInputElement | null>(null);
    const timeInputRef = React.useRef<HTMLInputElement | null>(null);

    const isControlled = value !== undefined;
    const currentDate = range ? null : (isControlled ? (value as Date | null) : internalDate);
    const currentRange = range ? (isControlled ? (value as DateRange) : internalRange) : [null, null];

    const setCombinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      if (range) {
        const rangeValue = value as DateRange | undefined;
        if (isControlled && rangeValue) {
          setInputValueFrom(rangeValue[0] ? formatDate(rangeValue[0]) : "");
          setInputValueTo(rangeValue[1] ? formatDate(rangeValue[1]) : "");
          if (rangeValue[0]) {
            setViewDate(new Date(rangeValue[0].getFullYear(), rangeValue[0].getMonth(), 1));
          }
        } else if (isControlled && (!rangeValue || (!rangeValue[0] && !rangeValue[1]))) {
          setInputValueFrom("");
          setInputValueTo("");
        }
      } else {
        if (isControlled && value) {
          setInputValue(formatDate(value as Date));
          if (showTime) {
            setTimeValue(formatTime(value as Date));
          }
          setViewDate(new Date((value as Date).getFullYear(), (value as Date).getMonth(), 1));
        } else if (isControlled && !value) {
          setInputValue("");
          if (showTime) {
            setTimeValue("");
          }
        }
      }
    }, [value, isControlled, showTime, range]);

    React.useEffect(() => {
      if (range) {
        const rangeDefault = defaultValue as DateRange | undefined;
        if (!isControlled && rangeDefault !== undefined) {
          setInternalRange(rangeDefault);
          setInputValueFrom(rangeDefault[0] ? formatDate(rangeDefault[0]) : "");
          setInputValueTo(rangeDefault[1] ? formatDate(rangeDefault[1]) : "");
          if (rangeDefault[0]) {
            setViewDate(new Date(rangeDefault[0].getFullYear(), rangeDefault[0].getMonth(), 1));
          }
        }
      } else {
        if (!isControlled && defaultValue !== undefined) {
          setInternalDate(defaultValue as Date | null);
          setInputValue(defaultValue ? formatDate(defaultValue as Date) : "");
          if (showTime && defaultValue) {
            setTimeValue(formatTime(defaultValue as Date));
            setInternalTime(formatTime(defaultValue as Date));
          }
          if (defaultValue) {
            setViewDate(new Date((defaultValue as Date).getFullYear(), (defaultValue as Date).getMonth(), 1));
          }
        }
      }
    }, [defaultValue, isControlled, showTime, range]);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node) &&
          calendarRef.current &&
          !calendarRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (range) return;
      const newValue = e.target.value;
      setInputValue(newValue);
      const parsed = parseDate(newValue);
      if (parsed) {
        if (showTime && timeValue) {
          const time = parseTime(timeValue);
          if (time) {
            parsed.setHours(time.hours, time.minutes);
          }
        }
        if (isControlled) {
          (onChange as (date: Date | null) => void)?.(parsed);
        } else {
          setInternalDate(parsed);
          (onChange as (date: Date | null) => void)?.(parsed);
        }
      } else if (newValue === "") {
        if (isControlled) {
          (onChange as (date: Date | null) => void)?.(null);
        } else {
          setInternalDate(null);
          (onChange as (date: Date | null) => void)?.(null);
        }
      }
    };

    const handleInputFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!range) return;
      const newValue = e.target.value;
      setInputValueFrom(newValue);
      const parsed = parseDate(newValue);
      const newRange: DateRange = [parsed, currentRange[1]];
      if (isControlled) {
        (onChange as (range: DateRange) => void)?.(newRange);
      } else {
        setInternalRange(newRange);
        (onChange as (range: DateRange) => void)?.(newRange);
      }
      if (parsed) {
        setViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
      }
    };

    const handleInputToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!range) return;
      const newValue = e.target.value;
      setInputValueTo(newValue);
      const parsed = parseDate(newValue);
      const newRange: DateRange = [currentRange[0], parsed];
      if (isControlled) {
        (onChange as (range: DateRange) => void)?.(newRange);
      } else {
        setInternalRange(newRange);
        (onChange as (range: DateRange) => void)?.(newRange);
      }
      if (parsed) {
        setViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
      }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setTimeValue(newValue);
      const parsed = parseTime(newValue);
      if (parsed && currentDate) {
        const newDate = new Date(currentDate);
        newDate.setHours(parsed.hours, parsed.minutes);
        if (isControlled) {
          onChange?.(newDate);
        } else {
          setInternalDate(newDate);
          onChange?.(newDate);
        }
      }
      setInternalTime(newValue);
    };

    const handleDateClick = (day: number, isOtherMonth: boolean) => {
      if (disabled) return;
      const newDate = new Date(viewDate);
      if (isOtherMonth) {
        if (day > 15) {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
      }
      newDate.setDate(day);

      if (range) {
        let newRange: DateRange;
        if (selectingStart || !currentRange[0]) {
          newRange = [newDate, null];
          setSelectingStart(false);
        } else {
          if (newDate.getTime() < currentRange[0]!.getTime()) {
            newRange = [newDate, currentRange[0]];
            setSelectingStart(false);
          } else {
            newRange = [currentRange[0], newDate];
            setSelectingStart(true);
          }
        }
        setViewDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
        if (isControlled) {
          (onChange as (range: DateRange) => void)?.(newRange);
        } else {
          setInternalRange(newRange);
          (onChange as (range: DateRange) => void)?.(newRange);
        }
        setInputValueFrom(newRange[0] ? formatDate(newRange[0]) : "");
        setInputValueTo(newRange[1] ? formatDate(newRange[1]) : "");
        if (newRange[0] && newRange[1] && !showTime) {
          setIsOpen(false);
        }
      } else {
        if (showTime && timeValue) {
          const time = parseTime(timeValue);
          if (time) {
            newDate.setHours(time.hours, time.minutes);
          }
        }
        setViewDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
        if (isControlled) {
          (onChange as (date: Date | null) => void)?.(newDate);
        } else {
          setInternalDate(newDate);
          (onChange as (date: Date | null) => void)?.(newDate);
        }
        setInputValue(formatDate(newDate));
        if (!showTime) {
          setIsOpen(false);
        }
      }
    };

    const handlePrevMonth = () => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(viewDate);
      const firstDay = getFirstDayOfMonth(viewDate);
      const days: Array<{ day: number; isOtherMonth: boolean }> = [];

      const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 0);
      const daysInPrevMonth = prevMonth.getDate();

      for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: daysInPrevMonth - i, isOtherMonth: true });
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, isOtherMonth: false });
      }

      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ day: i, isOtherMonth: true });
      }

      return days;
    };

    const calendarDays = renderCalendar();
    const isActive = isOpen;

    return (
      <div ref={containerRef} className={`astrum-datepicker ${range ? "astrum-datepicker--range" : ""} ${error ? "astrum-datepicker--error" : ""} ${className}`.trim()}>
        {label != null && (
          <label htmlFor={inputId} className="astrum-datepicker__label">
            {label}
            {required && <span className="astrum-datepicker__required" aria-hidden>*</span>}
          </label>
        )}
        {range ? (
          <div className="astrum-datepicker__range-inputs">
            <div className="astrum-datepicker__wrap">
              <input
                ref={inputFromRef}
                id={`${inputId}-from`}
                type="text"
                value={inputValueFrom}
                onChange={handleInputFromChange}
                onFocus={() => !disabled && setIsOpen(true)}
                placeholder={placeholderFrom}
                disabled={disabled}
                className={`astrum-datepicker__field ${error ? "astrum-datepicker__field--invalid" : ""}`.trim()}
                aria-invalid={!!error}
                aria-required={required}
                aria-describedby={error ? `${inputId}-error` : undefined}
                aria-expanded={isOpen}
              />
            </div>
            <div className="astrum-datepicker__range-separator">—</div>
            <div className="astrum-datepicker__wrap">
              <input
                ref={inputToRef}
                id={`${inputId}-to`}
                type="text"
                value={inputValueTo}
                onChange={handleInputToChange}
                onFocus={() => !disabled && setIsOpen(true)}
                placeholder={placeholderTo}
                disabled={disabled}
                className={`astrum-datepicker__field ${error ? "astrum-datepicker__field--invalid" : ""}`.trim()}
                aria-invalid={!!error}
                aria-required={required}
                aria-describedby={error ? `${inputId}-error` : undefined}
                aria-expanded={isOpen}
              />
            </div>
            <button
              type="button"
              className={`astrum-datepicker__icon ${isActive ? "astrum-datepicker__icon--active" : ""}`}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              aria-label="Открыть календарь"
            >
              <CalendarIcon isActive={isActive} />
            </button>
          </div>
        ) : (
          <div className="astrum-datepicker__wrap">
            <input
              ref={setCombinedRef}
              id={inputId}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => !disabled && setIsOpen(true)}
              placeholder={placeholder}
              disabled={disabled}
              className={`astrum-datepicker__field ${error ? "astrum-datepicker__field--invalid" : ""}`.trim()}
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={error ? `${inputId}-error` : undefined}
              aria-expanded={isOpen}
            />
            <button
              type="button"
              className={`astrum-datepicker__icon ${isActive ? "astrum-datepicker__icon--active" : ""}`}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              aria-label="Открыть календарь"
            >
              <CalendarIcon isActive={isActive} />
            </button>
          </div>
        )}
        {error != null && (
          <span id={`${inputId}-error`} className="astrum-datepicker__error" role="alert">
            {error}
          </span>
        )}
        {isOpen && (
          <div ref={calendarRef} className="astrum-datepicker__calendar">
            <div className="astrum-datepicker__calendar-header">
              <button
                type="button"
                className="astrum-datepicker__calendar-nav"
                onClick={handlePrevMonth}
                aria-label="Предыдущий месяц"
              >
                <ChevronLeftIcon />
              </button>
              <div className="astrum-datepicker__calendar-month">
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>
              <button
                type="button"
                className="astrum-datepicker__calendar-nav"
                onClick={handleNextMonth}
                aria-label="Следующий месяц"
              >
                <ChevronRightIcon />
              </button>
            </div>
            <div className="astrum-datepicker__calendar-weekdays">
              {weekDays.map((day) => (
                <div key={day} className="astrum-datepicker__calendar-weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="astrum-datepicker__calendar-days">
              {calendarDays.map(({ day, isOtherMonth }, index) => {
                const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + (isOtherMonth ? (day > 15 ? -1 : 1) : 0), day);
                const isSelected = range
                  ? (currentRange[0] && isSameDay(dayDate, currentRange[0])) || (currentRange[1] && isSameDay(dayDate, currentRange[1]))
                  : currentDate && isSameDay(dayDate, currentDate);
                const isCurrentDay = !isOtherMonth && isToday(dayDate);
                const isInRange = range && isDateInRange(dayDate, currentRange[0], currentRange[1]);
                const isRangeStart = range && isDateRangeStart(dayDate, currentRange[0], currentRange[1]);
                const isRangeEnd = range && isDateRangeEnd(dayDate, currentRange[0], currentRange[1]);
                return (
                  <button
                    key={`${day}-${isOtherMonth}-${index}`}
                    type="button"
                    className={`astrum-datepicker__calendar-day ${isOtherMonth ? "astrum-datepicker__calendar-day--other-month" : ""} ${isSelected ? "astrum-datepicker__calendar-day--selected" : ""} ${isCurrentDay ? "astrum-datepicker__calendar-day--today" : ""} ${isInRange ? "astrum-datepicker__calendar-day--in-range" : ""} ${isRangeStart ? "astrum-datepicker__calendar-day--range-start" : ""} ${isRangeEnd ? "astrum-datepicker__calendar-day--range-end" : ""}`}
                    onClick={() => handleDateClick(day, isOtherMonth)}
                    disabled={disabled}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {showTime && (
              <div className="astrum-datepicker__calendar-time">
                <label className="astrum-datepicker__calendar-time-label">{timeLabel}</label>
                <div className="astrum-datepicker__calendar-time-input-wrap">
                  <input
                    ref={timeInputRef}
                    type="text"
                    value={timeValue}
                    onChange={handleTimeChange}
                    placeholder="00:00"
                    className="astrum-datepicker__calendar-time-input"
                  />
                  <span className="astrum-datepicker__calendar-time-icon" aria-hidden>
                    <ClockIcon />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
