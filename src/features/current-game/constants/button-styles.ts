export const GAME_BUTTON_STYLES = {
  resign:
    "flex flex-1 items-center justify-center gap-2 rounded-md bg-loss text-loss-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-loss/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
  draw: "flex flex-1 items-center justify-center gap-2 rounded-md bg-draw text-draw-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-draw/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
  abort:
    "flex w-full items-center justify-center gap-2 rounded-md bg-warning text-warning-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-warning/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
  accept:
    "flex flex-1 items-center justify-center gap-2 rounded-md bg-win text-win-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-win/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
  decline:
    "flex flex-1 items-center justify-center gap-2 rounded-md bg-loss text-loss-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-loss/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
} as const;
