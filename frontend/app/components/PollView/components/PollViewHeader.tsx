"use client";

import { Center } from "@/app/components/Center";
import useModalStore from "@/app/stores/modal";
import { Button } from "@heroui/react";
import React from "react";
import { GoPlus } from "react-icons/go";

interface PollViewHeaderProps {
  refresh?: Promise<void>;
}

const PollViewHeader: React.FC<PollViewHeaderProps> = ({ refresh }) => {
  const { openModal } = useModalStore();

  return (
    <Center className="justify-between">
      <h1 className="md:text-4xl text-3xl font-semibold">Quick Poll</h1>
      <Button
        color="primary"
        endContent={<GoPlus />}
        onPress={() =>
          openModal(
            "POLL_FORM",
            {
              refresh: refresh,
            },
            {
              isDismissable: true,
              isKeyboardDismissDisabled: true,
            }
          )
        }
      >
        Create poll
      </Button>
    </Center>
  );
};

export default PollViewHeader;
