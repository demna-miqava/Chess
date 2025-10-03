import { TIME_CONTROL_ICONS } from "@/consts";

interface StatCardItemProps {
  gameType: string;
  rating: number;
}

const StatCardItem = ({ gameType, rating }: StatCardItemProps) => {
  const IconComponent =
    TIME_CONTROL_ICONS[gameType as keyof typeof TIME_CONTROL_ICONS];

  return (
    <>
      <div className="flex items-center gap-3">
        <IconComponent />
        <span className="text-gray-300 capitalize">{gameType}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-200 font-medium">{rating}</span>
      </div>
    </>
  );
};

export default StatCardItem;
