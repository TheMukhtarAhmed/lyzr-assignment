"use client";

import { Button } from "@heroui/button";
import { CardFooter } from "@heroui/card";
import React, { useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { ConfirmationPopover } from "../../ConfirmationPopover";
import { Poll } from "@/app/types/Poll";
import { usePollStore } from "@/app/stores/poll";
import { apiRequest } from "@/app/utils/apiClient";
import { addToast } from "@heroui/toast";
import { Center } from "../../Center";
import useModalStore from "@/app/stores/modal";

const PollCardFooter = ({ poll }: { poll: Poll }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const { openModal } = useModalStore();

  const removePoll = usePollStore((state) => state.removePoll);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await apiRequest(`/questions/${poll.id}`, "DELETE");
      removePoll(poll.id);
      addToast({ title: "Poll deleted successfully", color: "success" });
    } catch (err: any) {
      addToast({ title: "Failed to delete poll", color: "danger" });
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleLike = async () => {
    try {
      setIsLiking(true);
      const result: Poll = await apiRequest(
        `/questions/${poll.id}/like`,
        "PUT"
      );
    } catch (err: any) {
      addToast({ title: "Failed to update like", color: "danger" });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <CardFooter className="flex gap-x-3 justify-end">
      <Center>
        <Button
          isIconOnly
          variant="light"
          onPress={toggleLike}
          isLoading={isLiking}
        >
          {poll.has_liked ? "❤️" : "🤍"}
        </Button>
        <span className="text-sm text-gray-600">{poll?.likes_count}</span>
      </Center>
      {poll.is_owner && (
        <>
          <Button
            color="primary"
            variant="flat"
            isIconOnly
            onPress={() =>
              openModal(
                "POLL_FORM",
                {
                  initialData: poll,
                },
                {
                  isDismissable: true,
                  isKeyboardDismissDisabled: true,
                }
              )
            }
          >
            <GoPencil />
          </Button>
          <ConfirmationPopover
            title="Delete Poll"
            description="Are you sure you want to delete this poll? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
            onConfirm={handleDelete}
          >
            <Button
              color="danger"
              variant="flat"
              isIconOnly
              isDisabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : <GoTrash />}
            </Button>
          </ConfirmationPopover>
        </>
      )}
    </CardFooter>
  );
};

export default PollCardFooter;
