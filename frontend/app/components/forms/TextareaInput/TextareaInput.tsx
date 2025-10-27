import { Input, Textarea } from "@heroui/react";
import React from "react";
import { Control, Controller, UseFormTrigger } from "react-hook-form";

interface TextareaInputProps {
  name: string;
  control: Control<any>;
  isRequired: boolean;
  label: string;
  type?: "text" | "email" | "url" | "password" | "tel" | "search";
  placeholder?: string;
  rules?: object;
  errors: any;
  defaultValue?: string;
  description?: string;
  size?: "md" | "sm" | "lg" | undefined;
  pattern?: string;
  maxLength?: number;
  minRows?: number;
  maxRows?: number;
  trigger?: UseFormTrigger<any>;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  name,
  control,
  isRequired,
  label,
  type,
  placeholder,
  rules,
  errors,
  defaultValue = "",
  description = "",
  size,
  pattern,
  maxLength,
  minRows,
  maxRows,
  trigger,
}) => {
  const handleChange = async (
    field: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    field.onChange(e); // Update the field value
    if (trigger != null) {
      await trigger(name); // Validate this specific field
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          onChange={(e) => handleChange(field, e)}
          isRequired={isRequired}
          label={label}
          labelPlacement="inside"
          name={name}
          placeholder={placeholder}
          description={description}
          errorMessage={errors[name]?.message}
          isInvalid={fieldState.invalid}
          type={type}
          size={size}
          pattern={pattern}
          maxLength={maxLength}
          minRows={minRows}
          maxRows={maxRows}
        />
      )}
    />
  );
};

export default TextareaInput;