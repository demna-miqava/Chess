import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const SignInForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/home");
    // TODO: handle login
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2 text-left">
        <label className="text-sm font-semibold text-white" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>
      <div className="space-y-2 text-left">
        <label className="text-sm font-semibold text-white" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>

      <div className="flex items-center justify-between text-sm text-white/70">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="size-4 rounded border-white/30 bg-transparent text-lime-500 focus:ring-lime-400"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-white hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full rounded-full bg-lime-500 px-8 py-6 text-base font-semibold text-lime-950 transition hover:bg-lime-400"
      >
        Log in
      </Button>
    </form>
  );
};

export default SignInForm;
