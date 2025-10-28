"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultValues } from "../constants/default";
import { addToast } from "@heroui/react";
import useModalStore from "@/app/stores/modal";
import { apiRequest } from "@/app/utils/apiClient";
import { Poll } from "@/app/types/Poll";
import { usePollStore } from "@/app/stores/poll";

const serializeDate = (d: any) => {
  if (!d) return null;
  return new Date(
    d.year,
    d.month - 1,
    d.day,
    d.hour ?? 0,
    d.minute ?? 0,
    d.second ?? 0,
    d.millisecond ?? 0
  ).toISOString();
};

interface UsePollFormProps {
  initialData?: Poll;
  onClose: () => void;
  refreshPoll: () => Promise<void>;
}

export function usePollForm({
  initialData,
  onClose,
  refreshPoll,
}: UsePollFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModalStore();
  const addPoll = usePollStore((state) => state.addPoll);
  const updatePoll = usePollStore((state) => state.updatePoll);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      setIsSubmitting(true);

      const payload = {
        ...data,
        allow_multiple:
          data.allow_multiple === "true" || data.allow_multiple === true,
        start_time: serializeDate(data.start_time),
        end_time: serializeDate(data.end_time),
      };

      const url = initialData ? `/questions/${initialData.id}` : "/questions/";
      const result = await apiRequest(
        url,
        initialData ? "PUT" : "POST",
        payload
      );

      if (initialData) {
        updatePoll(result);
      } else {
        addPoll(result);
      }

      addToast({
        title: initialData
          ? "Poll updated successfully"
          : "Poll created successfully",
        color: "success",
      });

      closeModal();
    } catch (e: any) {
      console.error("🚀 ~ handleFormSubmit ~ e:", e);
      addToast({
        title: "Something went wrong, please try again later.",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
    return;
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return {
    isSubmitting,
    control,
    errors,
    handleFormSubmit,
    handleSubmit,
  };
}
