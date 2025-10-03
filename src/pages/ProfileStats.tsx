import ComprehensiveStats from "@/features/stats/components/comprehensive-stats/ComprehensiveStats";
import SimpleStatsGrid from "@/features/stats/components/simple-stats/SimpleStatsGrid";
import StatsDaysSelect from "@/features/stats/components/StatsDaysSelect";
import StatsVariantSelect from "@/features/stats/components/StatsVariantSelect";
import { useQueryParams } from "@/features/stats/hooks/useQueryParams";

const ProfileStats = () => {
  const [variant] = useQueryParams("variant", "all");
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <StatsVariantSelect />
        <StatsDaysSelect />
      </div>
      {variant === "all" ? <SimpleStatsGrid /> : <ComprehensiveStats />}
    </div>
  );
};

export default ProfileStats;
