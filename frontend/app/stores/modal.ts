"use client";

import { create } from "zustand";

export type ModalType = "POLL_FORM" | null; // null means “no modal open”

interface ModalOptions {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

interface ModalStoreState {
  isOpen: boolean;
  modalType: ModalType;
  modalProps: any;
  modalOptions: ModalOptions;

  openModal: (type: ModalType, props?: any, options?: ModalOptions) => void;
  closeModal: (callback?: () => void) => void;
}

const useModalStore = create<ModalStoreState>((set) => ({
  isOpen: false,
  modalType: null,
  modalProps: null,
  modalOptions: {},

  openModal: (type, props = null, options = {}) =>
    set({
      isOpen: true,
      modalType: type,
      modalProps: props,
      modalOptions: options,
    }),

  closeModal: (callback?: () => void) =>
    set(() => {
      if (callback) callback();
      return {
        isOpen: false,
        modalType: null,
        modalProps: null,
        modalOptions: {},
        onCloseCallback: undefined,
      };
    }),
}));

export default useModalStore;
