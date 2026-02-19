import * as React from "react";
import "./DatePicker.css";

const CalendarIcon = ({ isActive }: { isActive?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 8.40004C3 6.70264 3 5.85485 3.5274 5.32745C4.0548 4.80005 4.9026 4.80005 6.6 4.80005H17.4C19.0974 4.80005 19.9452 4.80005 20.4726 5.32745C21 5.85485 21 6.70264 21 8.40004C21 8.82394 21 9.03634 20.8686 9.16864C20.7363 9.30004 20.523 9.30004 20.1 9.30004H3.9C3.4761 9.30004 3.2637 9.30004 3.1314 9.16864C3 9.03634 3 8.82304 3 8.40004Z" fill={isActive ? "#2653F2" : "#ABABAB"}/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5274 19.5727C3 19.0453 3 18.1975 3 16.5001V12.0001C3 11.5762 3 11.3638 3.1314 11.2315C3.2637 11.1001 3.477 11.1001 3.9 11.1001H20.1C20.5239 11.1001 20.7363 11.1001 20.8686 11.2315C21 11.3638 21 11.5762 21 12.0001V16.5001C21 18.1975 21 19.0453 20.4726 19.5727C19.9452 20.1001 19.0974 20.1001 17.4 20.1001H6.6C4.9026 20.1001 4.0548 20.1001 3.5274 19.5727ZM8.4 14.7001C8.1613 14.7001 7.93239 14.7949 7.7636 14.9637C7.59482 15.1325 7.5 15.3614 7.5 15.6001C7.5 15.8388 7.59482 16.0677 7.7636 16.2365C7.93239 16.4053 8.1613 16.5001 8.4 16.5001H15.6C15.8387 16.5001 16.0676 16.4053 16.2364 16.2365C16.4052 16.0677 16.5 15.8388 16.5 15.6001C16.5 15.3614 16.4052 15.1325 16.2364 14.9637C16.0676 14.7949 15.8387 14.7001 15.6 14.7001H8.4Z" fill={isActive ? "#2653F2" : "#ABABAB"}/>
    <path d="M7.5 3V5.69999M16.5 3V5.69999" stroke={isActive ? "#2653F2" : "#ABABAB"} stroke-width="2" stroke-linecap="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 6L9 12L15 18" stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2.5C14.1423 2.5 17.5 5.85777 17.5 10C17.5 14.1423 14.1423 17.5001 10 17.5001C5.85775 17.5001 2.5 14.1423 2.5 10C2.5 5.85777 5.85775 2.5 10 2.5ZM10 5.50002C9.80109 5.50002 9.61032 5.57903 9.46967 5.71969C9.32902 5.86034 9.25 6.05111 9.25 6.25002V10C9.25004 10.1989 9.32909 10.3897 9.46975 10.5303L11.7198 12.7803C11.8612 12.9169 12.0507 12.9925 12.2473 12.9908C12.4439 12.9891 12.6321 12.9102 12.7711 12.7712C12.9102 12.6321 12.989 12.444 12.9908 12.2474C12.9925 12.0507 12.9169 11.8613 12.7802 11.7198L10.75 9.68954V6.25002C10.75 6.05111 10.671 5.86034 10.5303 5.71969C10.3897 5.57903 10.1989 5.50002 10 5.50002Z" fill="#ABABAB"/>
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
      placeholder = "Дата",
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
    const getRangeDisplayValue = (rangeValue: DateRange): string => {
      if (!rangeValue[0] && !rangeValue[1]) return "";
      if (rangeValue[0] && rangeValue[1]) {
        return `${formatDate(rangeValue[0])} — ${formatDate(rangeValue[1])}`;
      }
      if (rangeValue[0]) {
        return formatDate(rangeValue[0]);
      }
      return "";
    };

    const [inputValue, setInputValue] = React.useState<string>(() => {
      if (range) {
        const rangeValue = (value as DateRange | undefined) ?? (defaultValue as DateRange | undefined);
        return rangeValue ? getRangeDisplayValue(rangeValue) : "";
      }
      return value ? formatDate(value as Date) : defaultValue ? formatDate(defaultValue as Date) : "";
    });
    const [timeValue, setTimeValue] = React.useState<string>(
      !range && value && showTime ? formatTime(value as Date) : !range && defaultValue && showTime ? formatTime(defaultValue as Date) : ""
    );
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const calendarRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
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
          setInputValue(getRangeDisplayValue(rangeValue));
          if (rangeValue[0]) {
            setViewDate(new Date(rangeValue[0].getFullYear(), rangeValue[0].getMonth(), 1));
          }
        } else if (isControlled && (!rangeValue || (!rangeValue[0] && !rangeValue[1]))) {
          setInputValue("");
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
          setInputValue(getRangeDisplayValue(rangeDefault));
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
          if (range) {
            if (currentRange[0] && currentRange[1]) {
              setIsOpen(false);
            }
          } else {
            setIsOpen(false);
          }
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen, range, currentRange]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      
      if (range) {
        const rangeMatch = newValue.match(/^(\d{2}\.\d{2}\.\d{4})\s*—\s*(\d{2}\.\d{2}\.\d{4})$/);
        if (rangeMatch) {
          const parsedFrom = parseDate(rangeMatch[1]);
          const parsedTo = parseDate(rangeMatch[2]);
          const newRange: DateRange = [parsedFrom, parsedTo];
          if (isControlled) {
            (onChange as (range: DateRange) => void)?.(newRange);
          } else {
            setInternalRange(newRange);
            (onChange as (range: DateRange) => void)?.(newRange);
          }
          if (parsedFrom) {
            setViewDate(new Date(parsedFrom.getFullYear(), parsedFrom.getMonth(), 1));
          }
        } else {
          const singleDateMatch = newValue.match(/^(\d{2}\.\d{2}\.\d{4})$/);
          if (singleDateMatch) {
            const parsed = parseDate(singleDateMatch[1]);
            const newRange: DateRange = [parsed, null];
            if (isControlled) {
              (onChange as (range: DateRange) => void)?.(newRange);
            } else {
              setInternalRange(newRange);
              (onChange as (range: DateRange) => void)?.(newRange);
            }
            if (parsed) {
              setViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
            }
          } else if (newValue === "") {
            const newRange: DateRange = [null, null];
            if (isControlled) {
              (onChange as (range: DateRange) => void)?.(newRange);
            } else {
              setInternalRange(newRange);
              (onChange as (range: DateRange) => void)?.(newRange);
            }
          }
        }
        return;
      }
      
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

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (range) return;
      const newValue = e.target.value;
      setTimeValue(newValue);
      const parsed = parseTime(newValue);
      if (parsed && currentDate) {
        const newDate = new Date(currentDate);
        newDate.setHours(parsed.hours, parsed.minutes);
        if (isControlled) {
          (onChange as (date: Date | null) => void)?.(newDate);
        } else {
          setInternalDate(newDate);
          (onChange as (date: Date | null) => void)?.(newDate);
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
        if (!currentRange[0]) {
          newRange = [newDate, null];
          setSelectingStart(false);
        } else if (!currentRange[1]) {
          if (newDate.getTime() < currentRange[0]!.getTime()) {
            newRange = [newDate, currentRange[0]];
          } else {
            newRange = [currentRange[0], newDate];
          }
          setSelectingStart(true);
        } else {
          newRange = [newDate, null];
          setSelectingStart(false);
        }
        setViewDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
        if (isControlled) {
          (onChange as (range: DateRange) => void)?.(newRange);
        } else {
          setInternalRange(newRange);
          (onChange as (range: DateRange) => void)?.(newRange);
        }
        setInputValue(getRangeDisplayValue(newRange));
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

      const remainingDays = 35 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ day: i, isOtherMonth: true });
      }

      return days;
    };

    const calendarDays = renderCalendar();
    const isActive = isOpen;

    return (
      <div ref={containerRef} className={`astrum-datepicker ${range ? "astrum-datepicker--range" : ""} ${error ? "astrum-datepicker--error" : ""} ${className}`.trim()}>
        <div className="astrum-datepicker__wrap">
          <input
            ref={setCombinedRef}
            id={inputId}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            placeholder={range ? `${placeholderFrom} — ${placeholderTo}` : placeholder}
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
                const isCurrentDay = !isOtherMonth && isToday(dayDate);
                let isSelected: boolean;
                let isInRange = false;
                let isRangeStart = false;
                let isRangeEnd = false;
                
                if (range) {
                  const hasSelectedRange = currentRange[0] != null || currentRange[1] != null;
                  isSelected = hasSelectedRange
                    ? (currentRange[0] != null && isSameDay(dayDate, currentRange[0])) || (currentRange[1] != null && isSameDay(dayDate, currentRange[1])) || false
                    : isCurrentDay;
                  
                  if (currentRange[0] && currentRange[1]) {
                    isInRange = isDateInRange(dayDate, currentRange[0], currentRange[1]) && !isSelected;
                    isRangeStart = isDateRangeStart(dayDate, currentRange[0], currentRange[1]);
                    isRangeEnd = isDateRangeEnd(dayDate, currentRange[0], currentRange[1]);
                  }
                } else {
                  isSelected = currentDate ? isSameDay(dayDate, currentDate) : isCurrentDay;
                }
                
                return (
                  <button
                    key={`${day}-${isOtherMonth}-${index}`}
                    type="button"
                    className={`astrum-datepicker__calendar-day ${isOtherMonth ? "astrum-datepicker__calendar-day--other-month" : ""} ${isSelected ? "astrum-datepicker__calendar-day--selected" : ""} ${isInRange ? "astrum-datepicker__calendar-day--in-range" : ""} ${isRangeStart ? "astrum-datepicker__calendar-day--range-start" : ""} ${isRangeEnd ? "astrum-datepicker__calendar-day--range-end" : ""}`}
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
