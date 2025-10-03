import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const GameplaySettingsForm = () => {
  // Gameplay section
  const [enablePremoves, setEnablePremoves] = useState(false);
  const [alwaysPromoteToQueen, setAlwaysPromoteToQueen] = useState(false);
  const [confirmResignation, setConfirmResignation] = useState(true);
  const [showLegalMoves, setShowLegalMoves] = useState(true);

  // Analysis section
  const [showEngineEvaluation, setShowEngineEvaluation] = useState(false);
  const [showTimestamps, setShowTimestamps] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gameplay settings:", {
      enablePremoves,
      alwaysPromoteToQueen,
      confirmResignation,
      showLegalMoves,
      showEngineEvaluation,
      showTimestamps,
    });
    // TODO: Implement save logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Gameplay Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gameplay</h3>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="enable-premoves">Enable premoves</Label>
            <p className="text-sm text-muted-foreground">
              Make moves while waiting for your opponent
            </p>
          </div>
          <Switch
            id="enable-premoves"
            checked={enablePremoves}
            onCheckedChange={setEnablePremoves}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="always-promote-queen">Always promote to queen</Label>
            <p className="text-sm text-muted-foreground">
              Automatically promote pawns to queen without asking
            </p>
          </div>
          <Switch
            id="always-promote-queen"
            checked={alwaysPromoteToQueen}
            onCheckedChange={setAlwaysPromoteToQueen}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="confirm-resignation">
              Confirm resignation/draw
            </Label>
            <p className="text-sm text-muted-foreground">
              Show confirmation dialog before resigning or offering a draw
            </p>
          </div>
          <Switch
            id="confirm-resignation"
            checked={confirmResignation}
            onCheckedChange={setConfirmResignation}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="show-legal-moves">Show legal moves</Label>
            <p className="text-sm text-muted-foreground">
              Highlight available moves when selecting a piece
            </p>
          </div>
          <Switch
            id="show-legal-moves"
            checked={showLegalMoves}
            onCheckedChange={setShowLegalMoves}
          />
        </div>
      </div>

      {/* Analysis Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Analysis</h3>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="show-engine-evaluation">
              Show engine evaluation
            </Label>
            <p className="text-sm text-muted-foreground">
              Display computer analysis during games
            </p>
          </div>
          <Switch
            id="show-engine-evaluation"
            checked={showEngineEvaluation}
            onCheckedChange={setShowEngineEvaluation}
          />
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="show-timestamps">Show timestamps</Label>
            <p className="text-sm text-muted-foreground">
              Display the time each move was made
            </p>
          </div>
          <Switch
            id="show-timestamps"
            checked={showTimestamps}
            onCheckedChange={setShowTimestamps}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save Changes
      </Button>
    </form>
  );
};
