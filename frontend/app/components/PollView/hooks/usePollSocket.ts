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
          case "vote_toggle":
            updatePoll({
              id: msg.question_id,
              total_votes: msg.total_votes,
              user_votes: msg.user_votes,
              choices: msg.all_choices.map((choice: any) => {
                return {
                  id: choice.id,
                  votes: choice.votes,
                  choice_text: choice.text,
                };
              }),
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
