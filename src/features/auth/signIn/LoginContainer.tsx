import { Link } from "react-router";
import Logo from "@/components/Logo";
import SignInForm from "./components/SignInForm";
import OAuthSection from "../OAuthSection";

export const LoginContainer = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f14] text-white">
      <div className="mx-auto flex w-full bg-red-500 max-w-lg flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="flex w-full flex-col items-center gap-8 rounded-3xl border border-white/10 px-6 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:px-12">
          <Logo />

          <SignInForm />
          <OAuthSection type="login" />

          <p className="text-sm text-white/60">
            New to ChessHub?{" "}
            <Link
              to="/signup"
              className="font-semibold text-white hover:underline"
            >
              Sign up and start playing chess!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
