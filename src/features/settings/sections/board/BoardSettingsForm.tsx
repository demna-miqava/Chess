import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const BoardSettingsForm = () => {
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [highlightMoves, setHighlightMoves] = useState(true);
  const [playSounds, setPlaySounds] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Board settings:", {
      showCoordinates,
      highlightMoves,
      playSounds,
    });
    // TODO: Implement save logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="show-coordinates">Show board coordinates</Label>
            <p className="text-sm text-muted-foreground">
              Display A-H and 1-8 coordinates around the board
            </p>
          </div>
          <Switch
            id="show-coordinates"
            checked={showCoordinates}
            onCheckedChange={setShowCoordinates}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="highlight-moves">Highlight moves</Label>
            <p className="text-sm text-muted-foreground">
              Highlight the last move played on the board
            </p>
          </div>
          <Switch
            id="highlight-moves"
            checked={highlightMoves}
            onCheckedChange={setHighlightMoves}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="play-sounds">Play sounds</Label>
            <p className="text-sm text-muted-foreground">
              Play sound effects for moves and game events
            </p>
          </div>
          <Switch
            id="play-sounds"
            checked={playSounds}
            onCheckedChange={setPlaySounds}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save Changes
      </Button>
    </form>
  );
};
