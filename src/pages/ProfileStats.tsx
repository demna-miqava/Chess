import SimpleStatsGrid from "@/features/stats/components/simple-stats/SimpleStatsGrid";
import StatsDaysSelect from "@/features/stats/components/StatsDaysSelect";
import StatsVariantSelect from "@/features/stats/components/StatsVariantSelect";

const ProfileStats = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <StatsVariantSelect />
        <StatsDaysSelect />
      </div>
      <SimpleStatsGrid />
    </div>
  );
};

export default ProfileStats;
