import { Header } from "@/features/home/components/Header";
import { QuickPlayGrid } from "@/features/home/components/QuickPlayGrid";

const Home = () => {
  return (
    <div className="space-y-8">
      <Header />
      <QuickPlayGrid />
    </div>
  );
};

export default Home;
