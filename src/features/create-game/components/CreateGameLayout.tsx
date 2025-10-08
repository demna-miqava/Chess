import { PlayBoard } from "./PlayBoard";
import { CreateGameSidebar } from "./CreateGameSidebar";
import { CreateGameProvider } from "@/features/create-game/CreateGameContext";

export const CreateGameLayout = () => {
  return (
    <CreateGameProvider>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_500px]">
        <div className="hidden lg:flex lg:w-full">
          <PlayBoard />
        </div>
        <CreateGameSidebar />
      </div>
    </CreateGameProvider>
  );
};
