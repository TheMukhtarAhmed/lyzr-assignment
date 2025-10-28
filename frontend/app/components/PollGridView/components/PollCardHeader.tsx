import { Poll } from "@/app/types/Poll";
import { CardHeader } from "@heroui/card";
import React from "react";
import { Center } from "../../Center";
import { Chip } from "@heroui/react";

const PollCardHeader = ({ poll }: { poll: Poll }) => {
  const statusColorMap: Record<string, string> = {
    active: "success",
    upcoming: "warning",
    ended: "danger",
    expired: "danger",
  };

  const color: any = statusColorMap[poll.status] || "default";

  return (
    <CardHeader className="flex flex-col items-start gap-3">
      <Center className="justify-between">
        <div>
          <h2 className="font-semibold text-2xl">{poll?.question_text}</h2>
          {poll.description && (
            <p className="text-gray-400 text-sm">{poll.description}</p>
          )}
        </div>
        <Chip size="sm" radius="sm" color={color} className="text-white">
          {poll.status}
        </Chip>
      </Center>
    </CardHeader>
  );
};

export default PollCardHeader;
