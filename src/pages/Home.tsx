import { GameTable } from "@/features/game-table";
import { Header } from "@/features/home/components/Header";
import { QuickPlayGrid } from "@/features/home/components/QuickPlayGrid";

const Home = () => {
  return (
    <div className="space-y-8">
      <Header />
      <QuickPlayGrid />
      <GameTable variant="preview" actionHref="/profile/stats" />
    </div>
  );
};

export default Home;
