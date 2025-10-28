import { Center } from "./components/Center";
import PollView from "./components/PollView";

export default function Home() {
  return (
    <Center isVertical className="md:p-24 p-0">
      <PollView />
    </Center>
  );
}
