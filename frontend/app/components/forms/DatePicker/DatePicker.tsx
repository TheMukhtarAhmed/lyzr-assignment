import { DateInput, DatePicker } from "@heroui/react";
import {
  CalendarDate,
  CalendarDateTime,
  DateValue,
  getLocalTimeZone,
  now,
  parseDate,
  parseDateTime,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import React from "react";
import { Control, Controller, UseFormTrigger } from "react-hook-form";

interface DatePickerProps {
  name: string;
  control: Control<any>;
  isRequired?: boolean;
  label: string;
  placeholderValue?: DateValue;
  rules?: object;
  errors: any;
  description?: string;
  size?: "md" | "sm" | "lg" | undefined;
  trigger?: UseFormTrigger<any>;
  showTime?: boolean;
}

const DatePickerField: React.FC<DatePickerProps> = ({
  name,
  control,
  isRequired = false,
  label,
  placeholderValue,
  rules,
  errors,
  description = "",
  size,
  trigger,
  showTime = false,
}) => {
  const handleChange = async (
    field: any,
    e: CalendarDate | CalendarDateTime | ZonedDateTime | null
  ) => {
    field.onChange(e);
    if (trigger != null) {
      await trigger(name);
    }
  };

  const getDateValue = (value: any): DateValue | null => {
    if (!value || value === "") return null;

    if (typeof value === "object" && "year" in value) {
      return value;
    }

    if (typeof value === "string") {
      try {
        return parseDateTime(value);
      } catch (e) {
        try {
          return parseDate(value);
        } catch (e) {
          console.error("Failed to parse date string:", value, e);
          return null;
        }
      }
    }

    return null;
  };

  const effectivePlaceholder =
    placeholderValue ?? (showTime ? now(getLocalTimeZone()) : null);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const dateValue = getDateValue(field.value);

        return (
          <DatePicker
            {...field}
            value={dateValue}
            onChange={(e) => handleChange(field, e)}
            showMonthAndYearPickers
            hideTimeZone
            isRequired={isRequired}
            label={label}
            labelPlacement="inside"
            name={name}
            placeholderValue={effectivePlaceholder}
            description={description}
            errorMessage={errors[name]?.message}
            isInvalid={fieldState.invalid}
            size={size}
            minValue={today(getLocalTimeZone())}
            classNames={{ segment: "!text-gray-900" }}
          />
        );
      }}
    />
  );
};

export default DatePickerField;
