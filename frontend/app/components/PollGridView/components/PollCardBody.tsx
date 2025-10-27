import { CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/react";
import React from "react";
import { Center } from "../../Center";
import CustomLinearPercentIndicator from "../../CustomLinearPercentIndicator";
import { Poll } from "@/app/types/Poll";

const PollCardBody = ({ poll }: { poll: Poll }) => {
  const totalVotes = poll.choices.reduce((sum, c) => sum + c.votes, 0);

  return (
    <CardBody className="flex flex-col gap-3">
      {poll.choices.map((choice) => {
        const percentage = totalVotes
          ? Math.round((choice.votes / totalVotes) * 100)
          : 0;

        return (
          <div key={choice.id} className="flex flex-col gap-1 w-full">
            <Center className="justify-between">
              <Checkbox radius="full" isSelected={false}>
                {choice.choice_text}
              </Checkbox>
              <span className="text-sm text-gray-600">{percentage}%</span>
            </Center>

            <CustomLinearPercentIndicator
              percent={percentage}
              indicatorColor="bg-red-500"
            />
          </div>
        );
      })}
    </CardBody>
  );
};

export default PollCardBody;
