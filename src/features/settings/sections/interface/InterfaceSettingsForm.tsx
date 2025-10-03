import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const InterfaceSettingsForm = () => {
  const [useDarkMode, setUseDarkMode] = useState(true);
  const [showPlayerRatings, setShowPlayerRatings] = useState(true);
  const [showPieceIcons, setShowPieceIcons] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Interface settings:", {
      useDarkMode,
      showPlayerRatings,
      showPieceIcons,
    });
    // TODO: Implement save logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="use-dark-mode">Use dark mode</Label>
            <p className="text-sm text-muted-foreground">
              Enable dark theme across the application
            </p>
          </div>
          <Switch
            id="use-dark-mode"
            checked={useDarkMode}
            onCheckedChange={setUseDarkMode}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="show-player-ratings">
              Show player ratings during game
            </Label>
            <p className="text-sm text-muted-foreground">
              Display player ratings next to names during gameplay
            </p>
          </div>
          <Switch
            id="show-player-ratings"
            checked={showPlayerRatings}
            onCheckedChange={setShowPlayerRatings}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="show-piece-icons">
              Show piece icons in game notation
            </Label>
            <p className="text-sm text-muted-foreground">
              Display chess piece symbols instead of letters (♔ instead of K)
            </p>
          </div>
          <Switch
            id="show-piece-icons"
            checked={showPieceIcons}
            onCheckedChange={setShowPieceIcons}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save Changes
      </Button>
    </form>
  );
};
