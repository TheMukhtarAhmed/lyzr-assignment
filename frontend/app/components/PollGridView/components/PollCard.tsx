import { Poll } from "@/app/types/Poll";
import { Card } from "@heroui/card";
import React from "react";

import PollCardFooter from "./PollCardFooter";
import PollCardBody from "./PollCardBody";
import PollCardHeader from "./PollCardHeader";

const PollCard = ({ poll }: { poll: Poll }) => {
  return (
    <Card key={poll.id} className="hover:shadow-lg transition-shadow p-2">
      <PollCardHeader poll={poll} />
      <PollCardBody poll={poll} />
      <PollCardFooter poll={poll} />
    </Card>
  );
};

export default PollCard;
