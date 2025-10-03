import { type ReactNode } from "react";

interface StatRowProps {
  label: string;
  value: ReactNode;
}

export const StatRow = ({ label, value }: StatRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-foreground">{label}</span>
      {typeof value === "string" || typeof value === "number" ? (
        <span className="text-foreground font-medium">{value}</span>
      ) : (
        value
      )}
    </div>
  );
};
