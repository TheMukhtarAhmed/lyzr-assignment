import React from "react";
import { Control, Controller, UseFormTrigger } from "react-hook-form";
import { Input } from "@heroui/react";

interface TextInputProps {
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
  trigger?: UseFormTrigger<any>;
}

const TextInput: React.FC<TextInputProps> = ({
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
        <Input
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
        />
      )}
    />
  );
};

export default TextInput;