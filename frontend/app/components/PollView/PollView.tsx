"use client";

import React from "react";
import PollViewHeader from "./components/PollViewHeader";
import PollGridView from "../PollGridView";
import { usePollSocket } from "./hooks/usePollSocket";

const PollView = () => {
  usePollSocket();
  return (
    <>
      <PollViewHeader />
      <div className="mt-16 w-full px-2">
        <PollGridView />
      </div>
    </>
  );
};

export default PollView;
