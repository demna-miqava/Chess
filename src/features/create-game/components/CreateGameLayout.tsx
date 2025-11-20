import { PlayBoard } from "./PlayBoard";
import { CreateGameSidebar } from "./CreateGameSidebar";
import { GameSetupProvider } from "@/features/create-game/GameSetupContext";

export const CreateGameLayout = () => {
  return (
    <GameSetupProvider>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(auto,800px)_auto] gap-6 p-4 lg:p-6 lg:justify-center">
        <div className="hidden lg:block">
          <PlayBoard />
        </div>
        <CreateGameSidebar />
      </div>
    </GameSetupProvider>
  );
};
