import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: trigger reset flow
      }}
      className="w-full space-y-6"
    >
      <div className="space-y-2 text-left">
        <label className="text-sm font-medium text-white" htmlFor="reset-email">
          Email
        </label>
        <Input
          id="reset-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-lime-500 px-8 py-6 text-base font-semibold text-lime-950 transition hover:bg-lime-400"
      >
        Submit
      </Button>
    </form>
  );
};
