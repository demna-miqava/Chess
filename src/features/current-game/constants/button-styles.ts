export const GAME_BUTTON_STYLES = {
  resign:
    "flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30",
  draw: "flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/30",
  abort:
    "flex w-full items-center justify-center gap-2 rounded-md bg-orange-600/20 px-4 py-2 text-sm font-medium text-orange-400 transition-colors hover:bg-orange-600/30",
  accept:
    "flex flex-1 items-center justify-center gap-2 rounded-md bg-green-600/20 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-600/30",
  decline:
    "flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30",
} as const;
