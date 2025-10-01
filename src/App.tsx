import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      <Button variant="destructive" size="lg" onClick={toggleTheme}>
        click me
      </Button>
      <h1 className="text-2xl font-bold text-bg-secondary-dark">class name</h1>
    </div>
  );
}

export default App;
