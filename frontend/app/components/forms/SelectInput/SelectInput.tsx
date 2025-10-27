"use client";

import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { Control, Controller } from "react-hook-form";

export interface SelectOption {
  key: string | boolean;
  label: string;
}

interface SelectInputProps {
  name: string;
  control: Control<any>;
  isRequired: boolean;
  isDisabled?: boolean;
  disallowEmptySelection?: boolean;
  label: string;
  placeholder?: string;
  rules?: object;
  errors: any;
  defaultValue?: string | any;
  description?: string;
  size?: "md" | "sm" | "lg" | undefined;
  items: SelectOption[];
  disabledKeys?: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  isRequired,
  isDisabled = false,
  disallowEmptySelection = true,
  label,
  placeholder,
  rules,
  errors,
  defaultValue = "",
  description = "",
  size,
  items,
  disabledKeys,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          disallowEmptySelection={disallowEmptySelection}
          isRequired={isRequired}
          isDisabled={isDisabled}
          selectedKeys={[field.value?.toString()]}
          label={label}
          items={items}
          labelPlacement="inside"
          name={name}
          placeholder={placeholder}
          description={description}
          errorMessage={errors[name]?.message}
          isInvalid={fieldState.invalid}
          size={size}
          disabledKeys={disabledKeys}
        >
          {(item) => (
            <SelectItem key={item.key?.toString()}>{item.label}</SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export default SelectInput;
