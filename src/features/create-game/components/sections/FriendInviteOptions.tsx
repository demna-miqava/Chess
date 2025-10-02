import { useState } from "react";
import { Crown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { TimeControlsSection } from "../TimeControlsSection";

type ColorChoice = "white" | "random" | "black";

const COLOR_CHOICES: ColorChoice[] = ["white", "random", "black"];

export const FriendInviteOptions = () => {
  const [colorChoice, setColorChoice] = useState<ColorChoice>("random");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="size-20">
          <AvatarImage
            src="https://images.chesscomfiles.com/uploads/v1/user/195303573.7eeab86b.50x50o.4f5a7d721b05.jpg"
            className="rounded-md object-cover"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1">
          <span className="text-md font-medium">joffarex</span>
          <span className="text-md font-medium">(300)</span>
        </div>
      </div>

      <TimeControlsSection />

      <section className="space-y-2 flex justify-between items-center">
        <p className="text-sm font-semibold">I play as</p>
        <div className="flex items-center gap-3">
          {COLOR_CHOICES.map((choice) => {
            const isActive = colorChoice === choice;

            return (
              <button
                key={choice}
                type="button"
                aria-pressed={isActive}
                onClick={() => setColorChoice(choice)}
                className={`flex h-12 w-12 items-center justify-center rounded-md border transition-all ${
                  isActive
                    ? "border-lime-400 bg-lime-400/10 text-lime-200 shadow-[0_0_0_1px_rgba(163,230,53,0.4)]"
                    : "border-sidebar-border bg-sidebar text-sidebar-foreground hover:border-lime-300"
                }`}
              >
                {choice === "random" ? (
                  <div className="relative flex h-full w-full items-center justify-center text-lg font-semibold">
                    <div className="absolute inset-0 grid grid-cols-2 overflow-hidden rounded-md">
                      <span className="h-full w-full bg-white" />
                      <span className="h-full w-full bg-[#1a1a1a]" />
                    </div>
                    <span className="relative text-black">?</span>
                  </div>
                ) : (
                  <Crown
                    className={`size-6 ${
                      choice === "white" ? "text-white" : "text-black"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Rated</p>
        <Switch className="text-lime-400 bg-lime-400/10" />
      </div>

      <Button variant="secondary" size="lg">
        Send Challenge
      </Button>
    </div>
  );
};
