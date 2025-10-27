import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

interface ConfirmationPopoverProps {
  children: React.ReactNode;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "danger" | "primary" | "neutral";
  align?: "start" | "center" | "end";
}

export function ConfirmationPopover({
  children,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  align = "center",
}: ConfirmationPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const variantClasses = {
    danger: "bg-red-500 hover:bg-red-600 text-white",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    neutral: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  const alignClasses = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        {React.isValidElement(children) ? (
          children
        ) : (
          <Button>{children}</Button>
        )}
      </PopoverTrigger>
      <PopoverContent className={`${alignClasses[align]}`}>
        <div className="px-4 py-3 w-64">
          <h3 className="font-bold text-sm">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="light"
              size="sm"
              onClick={handleCancel}
              className="text-gray-700"
            >
              {cancelText}
            </Button>
            <Button
              variant="solid"
              size="sm"
              onClick={handleConfirm}
              className={variantClasses[variant]}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}