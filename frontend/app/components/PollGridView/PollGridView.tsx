"use client";

import { usePollStore } from "@/app/stores/poll";
import React from "react";
import { usePollData } from "../PollView/hooks/usePollData";
import { Skeleton } from "@heroui/skeleton";
import PollCard from "./components/PollCard";

const PollGridView = () => {
  const { isLoading, error } = usePollData();
  const polls = usePollStore((state) => state.polls);

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="flex flex-col">
            <Skeleton className="h-80 w-full rounded-lg">
              <div className="h-80 w-full bg-default-300 rounded-lg" />
            </Skeleton>
          </div>
        ))}
      </div>
    );
  }

  if (!polls.length) {
    return (
      <div className="mt-24 text-left text-gray-500">No polls available.</div>
    );
  }

  const sortedPolls = [...polls].sort(
    (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
  );

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {sortedPolls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollGridView;
