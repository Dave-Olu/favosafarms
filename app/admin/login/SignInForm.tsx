"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";

export default function SignInForm({ destination }: { destination: string }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setErrorMessage("Sign-in failed. Check your credentials and try again.");
      setIsSubmitting(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      setErrorMessage("Could not verify your account. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const { data: membership, error: membershipError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (membershipError || !membership) {
      await supabase.auth.signOut();
      setErrorMessage(
        "This account does not have CMS access. Ask a project owner to authorize it.",
      );
      setIsSubmitting(false);
      return;
    }

    router.replace(destination);
    router.refresh();
  }

  return (
    <form className="cms-login-form" onSubmit={handleSubmit}>
      <label htmlFor="cms-email">Email address</label>
      <input
        autoComplete="username"
        id="cms-email"
        name="email"
        required
        type="email"
      />
      <label htmlFor="cms-password">Password</label>
      <input
        autoComplete="current-password"
        id="cms-password"
        name="password"
        required
        type="password"
      />
      {errorMessage ? (
        <p className="cms-alert cms-alert-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button className="cms-primary-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
