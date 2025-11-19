const Logo = () => {
  return (
    <div className="relative flex w-full max-w-md items-center justify-center overflow-hidden rounded-3xl p-4">
      <img
        src="/logo.png"
        alt="GambitFlow Logo"
        className="h-auto max-h-40 w-full object-contain"
      />
    </div>
  );
};

export default Logo;
