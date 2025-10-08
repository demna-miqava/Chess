import { useCreateGame } from "../CreateGameContext";

interface TimeControlOptionProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: Array<{ label: string; value: string }>;
}

export const TimeControlOption = ({
  label,
  icon: Icon,
  options,
}: TimeControlOptionProps) => {
  const { timeControl, updateTimeControl } = useCreateGame();
  const formatType = label.toLowerCase() as "bullet" | "blitz" | "rapid";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon />}
        {label}
      </div>
      <div className="w-full flex justify-between gap-2">
        {options.map((option) => {
          const { label, value } = option;
          return (
            <button
              type="button"
              key={value}
              className={`w-full border rounded-md p-2 text-center tracking-normal hover:bg-white/5 transition-colors ${
                timeControl.value === value && timeControl.format === formatType ? "border-lime-400" : ""
              }`}
              onClick={() => {
                updateTimeControl(formatType, value);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
