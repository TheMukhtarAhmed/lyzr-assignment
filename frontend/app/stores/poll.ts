import { create } from "zustand";
import { Poll } from "../types/Poll";

interface PollState {
  polls: Poll[];
  setPolls: (polls: Poll[]) => void;
  addPoll: (poll: Poll) => void;
  updatePoll: (updatedPoll: Partial<Poll> & { id: number }) => void;
  removePoll: (id: number) => void;
  clearPolls: () => void;
}

export const usePollStore = create<PollState>((set, get) => ({
  polls: [],

  setPolls: (polls) => set({ polls: polls }),

  addPoll: (poll) => set(({ polls }) => ({ polls: [...polls, poll] })),

  updatePoll: (updatedPoll) =>
    set(({ polls }) => ({
      polls: polls.map((p) =>
        p.id === updatedPoll.id ? { ...p, ...updatedPoll } : p
      ),
    })),

  removePoll: (id) =>
    set(({ polls }) => ({ polls: polls.filter((p) => p.id !== id) })),

  clearPolls: () => set({ polls: [] }),
}));
