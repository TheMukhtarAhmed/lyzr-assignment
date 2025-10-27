"use client";

import { Modal, ModalContent } from "@heroui/react";
import React from "react";
import PollFormModal from "./PollFormModal";
import useModalStore from "@/app/stores/modal";

export default function GlobalModal() {
  const { isOpen, modalType, modalProps, modalOptions, closeModal } =
    useModalStore();

  if (!isOpen || !modalType) return null;

  let modalContent = null;
  switch (modalType) {
    case "POLL_FORM":
      modalContent = <PollFormModal {...modalProps} onClose={closeModal} />;
      break;
    default:
      modalContent = null;
      break;
  }

  return (
    <Modal
      isOpen={isOpen}
      size={modalOptions.size || "md"}
      scrollBehavior="inside"
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
      isDismissable={modalOptions.isDismissable}
      isKeyboardDismissDisabled={modalOptions.isKeyboardDismissDisabled}
    >
      <ModalContent>
        {(onCloseFromLibrary) => {
          const handleClose = () => {
            closeModal(onCloseFromLibrary);
          };
          return React.cloneElement(modalContent as React.ReactElement, {
            onClose: handleClose,
          });
        }}
      </ModalContent>
    </Modal>
  );
}
