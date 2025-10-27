import { Poll } from "@/app/types/Poll";
import { CardHeader } from "@heroui/card";
import React from "react";

const PollCardHeader = ({ poll }: { poll: Poll }) => {
  return (
    <CardHeader className="flex flex-col items-start gap-3">
      <h2 className="font-semibold text-2xl">{poll?.question_text}</h2>
      {poll.description && (
        <p className="text-gray-400 text-sm">{poll.description}</p>
      )}
    </CardHeader>
  );
};

export default PollCardHeader;
