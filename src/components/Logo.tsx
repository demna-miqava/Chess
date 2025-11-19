import { useTheme } from "@/context/ThemeContext";

const Logo = () => {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo_dark.png" : "/logo_light.png";

  return (
    <div className="relative flex w-full max-w-md items-center justify-center overflow-hidden rounded-3xl p-4">
      <img
        src={logoSrc}
        alt="GambitFlow Logo"
        className="h-auto max-h-40 w-full object-contain"
      />
    </div>
  );
};

export default Logo;
