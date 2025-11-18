import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  /** Optional custom height. Defaults to full screen (h-screen w-screen) */
  height?: string;
}

export const FullScreenLoader = ({ height = "h-screen w-screen" }: FullScreenLoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <Loader2 className="h-8 w-8 animate-spin text-success" />
    </div>
  );
};
