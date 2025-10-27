import { Poll } from "@/app/types/Poll";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { addToast, Checkbox } from "@heroui/react";
import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import { Center } from "../../Center";
import CustomLinearPercentIndicator from "../../CustomLinearPercentIndicator";
import { usePollStore } from "@/app/stores/poll";
import { apiRequest } from "@/app/utils/apiClient";
import { ConfirmationPopover } from "../../ConfirmationPopover";
import Heart from "react-animated-heart";
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
