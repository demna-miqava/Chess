import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";

const files = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rows = Array.from({ length: 8 }, (_, index) => 7 - index);

const INITIAL_BOARD = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const PIECE_SYMBOLS: Record<string, string> = {
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
};
// TODO: Refactor
export const PlayBoard = () => {
  const { name, image } = useUser();

  return (
    <section className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-[#1a1a1a] shadow-sm">
      <header className="flex items-center justify-between bg-[#2f2f2f] px-4 py-2 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#3d3d3d]">
            <User className="size-4" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold">Opponent</p>
            {/* <p className="text-xs text-white/70">waiting…</p> */}
          </div>
        </div>
        <span className="rounded-md bg-black/50 px-2 py-1 text-xs tracking-wider">
          3:00
        </span>
      </header>

      <div className="flex flex-1 items-center justify-center bg-[#2a2a2a] p-4">
        <div className="relative aspect-square w-full max-w-3xl">
          <div className="grid h-full w-full grid-cols-8 overflow-hidden rounded-md border border-black/40 shadow-inner">
            {rows.map((row) =>
              files.map((_, fileIndex) => {
                const isDark = (row + fileIndex) % 2 === 0;
                const coordinateColor = isDark
                  ? "text-white/80"
                  : "text-black/70";
                const piece = INITIAL_BOARD[7 - row][fileIndex];
                return (
                  <div
                    key={`${row}-${fileIndex}`}
                    className={`${
                      isDark ? "bg-[#4a3824]" : "bg-[#d7b899]"
                    } relative`}
                  >
                    {fileIndex === 0 && (
                      <span
                        className={`absolute left-1 top-1 text-xs font-semibold ${coordinateColor}`}
                      >
                        {row + 1}
                      </span>
                    )}
                    {row === 0 && (
                      <span
                        className={`absolute bottom-1 right-1 text-xs font-semibold ${coordinateColor}`}
                      >
                        {files[fileIndex]}
                      </span>
                    )}
                    {piece && (
                      <span
                        className={`pointer-events-none absolute inset-0 flex select-none items-center justify-center text-6xl ${
                          piece === piece.toUpperCase()
                            ? "text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.4)]"
                            : "text-black"
                        }`}
                      >
                        {PIECE_SYMBOLS[piece]}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between bg-[#2f2f2f] px-4 py-2 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
            <img
              src={image}
              alt="Player avatar"
              className="size-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-white/70">3415 rating</p>
          </div>
        </div>
        <span className="rounded-md bg-black/50 px-2 py-1 text-xs tracking-wider">
          3:00
        </span>
      </footer>
    </section>
  );
};
