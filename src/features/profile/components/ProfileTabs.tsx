import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import OverviewSection from "./OverviewSection";
import StatsSection from "./StatsSection";
import GamesSection from "./GamesSection";

const tabs = [
  { value: "overview", label: "Overview", content: <OverviewSection /> },
  { value: "games", label: "Games", content: <GamesSection /> },
  { value: "stats", label: "Stats", content: <StatsSection /> },
  { value: "friends", label: "Friends", content: <h1>hi</h1> },
];

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue="overview" className="mt-8 w-full">
      <TabsList className="flex w-full justify-start gap-3 overflow-x-auto bg-transparent p-0 scrollbar-hide">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-none w-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium leading-tight text-foreground transition hover:bg-white/10 data-[state=active]:border-lime-500 data-[state=active]:bg-lime-500/20"
          >
            <span className="block truncate">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProfileTabs;
