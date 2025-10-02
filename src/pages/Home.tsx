import { GameTable } from "@/features/game-table";
import { Header } from "@/features/home/components/Header";
import { QuickPlayGrid } from "@/features/home/components/QuickPlayGrid";
import { useUser } from "@/hooks/useUser";

const Home = () => {
  const { userName } = useUser();

  return (
    <div className="space-y-8">
      <Header />
      <QuickPlayGrid />
      <GameTable
        variant="preview"
        actionHref={`/profile/${userName}/games`}
      />
    </div>
  );
};

export default Home;
