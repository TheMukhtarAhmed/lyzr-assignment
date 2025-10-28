import { CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/react";
import React, { useState } from "react";
import { Center } from "../../Center";
import CustomLinearPercentIndicator from "../../CustomLinearPercentIndicator";
import { Poll } from "@/app/types/Poll";
import { apiRequest } from "@/app/utils/apiClient";
import Countdown from "react-countdown";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const PollCardBody = ({ poll }: { poll: Poll }) => {
  const totalVotes = poll.choices.reduce((sum, c) => sum + c.votes, 0);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (choiceId: number) => {
    setIsVoting(true);
    try {
      await apiRequest(`/choices/${choiceId}/vote`, "PUT");
    } catch (err) {
      console.error("Failed to vote", err);
    } finally {
      setIsVoting(false);
    }
  };

  const sortedChoices = [...poll.choices].sort((a, b) => b.votes - a.votes);

  const renderCountdown = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const now = new Date();
    if (poll.status === "upcoming" && poll.start_time) {
      const utcDate = parseISO(poll.start_time + "Z");
      const localDate = toZonedTime(utcDate, userTimeZone);

      if (localDate > now) {
        return (
          <div className="mt-6 text-sm text-gray-600">
            Starts in: <Countdown date={localDate.getTime()} />
          </div>
        );
      }
    }

    if (poll.status === "active" && poll.end_time) {
      const utcDate = parseISO(poll.end_time + "Z");
      const localDate = toZonedTime(utcDate, userTimeZone);

      if (localDate > now) {
        return (
          <div className="mt-6 text-sm text-gray-600">
            Ends in: <Countdown date={localDate.getTime()} />
          </div>
        );
      }
    }

    return null;
  };

  return (
    <CardBody className="flex flex-col gap-3">
      {sortedChoices?.map((choice) => {
        const percentage = totalVotes
          ? Math.round((choice.votes / totalVotes) * 100)
          : 0;

        return (
          <div key={choice.id} className="flex flex-col gap-1 w-full">
            <Center className="justify-between">
              <Checkbox
                radius="full"
                isSelected={poll.user_votes.includes(choice.id)}
                onChange={() => handleVote(choice.id)}
                isDisabled={isVoting || poll.status != "active"}
              >
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

      {renderCountdown()}
    </CardBody>
  );
};

export default PollCardBody;
