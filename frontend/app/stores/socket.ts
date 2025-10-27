import { create } from "zustand";

type SocketStatus = "connected" | "disconnected" | "connecting";

export const useSocketStore = create<{
  status: SocketStatus;
  setStatus: (status: SocketStatus) => void;
}>((set) => ({
  status: "connecting",
  setStatus: (status) => set({ status }),
}));