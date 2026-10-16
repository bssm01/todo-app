import { useState } from "react";
import { request } from "../lib/api.js";
import AuthLayout from "./AuthLayout.jsx";

const STORY = {
  heading: (
    <>
      A fresh start
      <br />
      for what <em>matters.</em>
    </>
  ),
  copy: "Choose a new password and get back to making room for your day.",
};

export default function ResetPasswordScreen() {
  const token = new URLSearchParams(window.location.search).get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(token ? "" : "This password reset link is missing its token.");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const result = await request("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      });
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      story={STORY}
      kicker="ACCOUNT RECOVERY"
      title={success ? "You’re all set." : "Choose a new password."}
      subtitle={
        success ? "Your password has been changed." : "Make it at least 6 characters long."
      }
    >
      {success ? (
        <p className="form-success reset-success" role="status">
          {success} <a href="/">Return to sign in</a>
        </p>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>New password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </label>
          <label>
            <span>Confirm new password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter it again"
              minLength={6}
              required
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button button-primary auth-submit" disabled={busy || !token}>
            {busy ? "Updating…" : "Update password"}
            <span>→</span>
          </button>
        </form>
      )}
      {!success && (
        <p className="auth-switch">
          <a href="/">Return to sign in</a>
        </p>
      )}
    </AuthLayout>
  );
}
