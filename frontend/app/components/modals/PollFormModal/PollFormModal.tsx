"use client";

import { Button, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { usePollForm } from "./hooks/usePollForm";
import PollForm from "./components/PollForm";
import { Poll } from "@/app/types/Poll";

interface PollFormModalProps {
  initialData: Poll;
  onClose: () => void;
  refreshPoll: () => Promise<void>;
}

const PollFormModal: React.FC<PollFormModalProps> = ({
  initialData,
  onClose,
  refreshPoll,
}) => {
  const { control, errors, isSubmitting, handleSubmit, handleFormSubmit } =
    usePollForm({ initialData, onClose, refreshPoll });

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {initialData ? "Edit" : "Create"} Poll
      </ModalHeader>
      <ModalBody>
        <PollForm control={control} errors={errors} initialData={initialData} />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" size="sm" onPress={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          size="sm"
          isLoading={isSubmitting}
          onClick={handleSubmit(handleFormSubmit)}
        >
          {isSubmitting
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
              ? "Update"
              : "Create"}
        </Button>
      </ModalFooter>
    </>
  );
};

export default PollFormModal;
