import TextInput from "@/app/components/forms/TextInput";
import React from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { validationRules } from "../constants/validation";
import TextareaInput from "@/app/components/forms/TextareaInput";
import SelectInput from "@/app/components/forms/SelectInput";
import DatePickerField from "@/app/components/forms/DatePicker";
import { Button, Divider } from "@heroui/react";
import { Center } from "@/app/components/Center";
import { Poll } from "@/app/types/Poll";

interface PollFormProps {
  initialData?: Poll;
  control: Control<any>;
  errors: FieldErrors;
}

const PollForm: React.FC<PollFormProps> = ({
  initialData,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({ choice_text: "" });
    }
  }, [fields, append]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <TextareaInput
          isRequired
          name="question_text"
          control={control}
          errors={errors}
          maxRows={2}
          label="Poll Question"
          placeholder="Enter your poll question"
          rules={validationRules.pollQuestion}
          type="text"
        />
      </div>
      <div>
        <TextareaInput
          isRequired={false}
          name="description"
          control={control}
          errors={errors}
          label="Description"
          placeholder="Enter a short description (optional)"
          type="text"
        />
      </div>
      <div>
        <SelectInput
          isRequired
          control={control}
          name="allow_multiple"
          errors={errors}
          label="Allow Multiple Selections"
          placeholder="Select an option"
          rules={validationRules.allowMultiple}
          defaultValue={initialData?.allow_multiple ?? false}
          items={[
            { key: true, label: "Yes" },
            { key: false, label: "No" },
          ]}
        />
      </div>
      <div>
        <DatePickerField
          name="start_date"
          control={control}
          errors={errors}
          showTime
          label="Start Date and Time (Optional)"
        />
      </div>
      <div>
        <DatePickerField
          name="end_date"
          control={control}
          errors={errors}
          showTime
          label="End Date and Time (Optional)"
        />
      </div>

      <Divider className="my-4" />

      <Center isVertical className="gap-2">
        <h4 className="font-medium">Poll Options</h4>

        {fields.map((field, index) => (
          <Center key={field.id} className="gap-2 mb-4">
            <TextInput
              isRequired
              name={`choices.${index}.choice_text`}
              control={control}
              errors={errors}
              label={`Option ${index + 1}`}
              placeholder="Enter option text"
              rules={{
                required: "Option text is required.",
              }}
              type="text"
            />
            {fields.length > 1 && (
              <Button
                size="sm"
                color="danger"
                variant="light"
                onPress={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </Center>
        ))}

        <Button
          variant="flat"
          color="primary"
          onPress={() => append({ choice_text: "" })}
          className="mt-2"
        >
          + Add Option
        </Button>
      </Center>
    </div>
  );
};

export default PollForm;
