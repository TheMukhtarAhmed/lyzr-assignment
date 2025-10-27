"use client";

import { useEffect } from "react";
import { usePollStore } from "@/app/stores/poll";
import { connectWebSocket } from "@/app/services/websocket";

export const usePollSocket = () => {
  const updatePoll = usePollStore((state) => state.updatePoll);

  useEffect(() => {
    const ws = connectWebSocket(
      "wss://api.mukhtarahmed.com/ws/polls",
      (msg) => {
        switch (msg.event) {
          case "like_toggle":
            updatePoll({
              id: msg.question_id,
              likes_count: msg.likes_count,
              has_liked: msg.action == "liked" ? true : false,
            });
            break;
          default:
            break;
        }
      }
    );

    return () => {
      ws.close();
    };
  }, [updatePoll]);
};
