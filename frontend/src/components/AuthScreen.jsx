import { useState } from "react";
import { request } from "../lib/api.js";
import AuthLayout from "./AuthLayout.jsx";

const COPY = {
  login: {
    kicker: "WELCOME BACK",
    title: "Good to see you.",
    subtitle: "Sign in to pick up where you left off.",
  },
  register: {
    kicker: "GET STARTED",
    title: "Create your space.",
    subtitle: "A clearer day is just around the corner.",
  },
  forgot: {
    kicker: "ACCOUNT RECOVERY",
    title: "Forgot your password?",
    subtitle: "Enter your email and we’ll send you a password reset link.",
  },
};

const STORY = {
  heading: (
    <>
      Make room for
      <br />
      what <em>matters.</em>
    </>
  ),
  copy: "A calmer way to keep your day moving. One thoughtful step at a time.",
};

export default function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const isForgotMode = mode === "forgot";
  const copy = COPY[mode];

  function updateField(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function setAuthMode(nextMode) {
    setMode(nextMode);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);
    try {
      const endpoint =
        mode === "login" ? "login" : mode === "register" ? "register" : "forgot-password";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : mode === "register"
            ? form
            : { email: form.email };
      const result = await request(`/auth/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (mode === "forgot") setSuccess(result.message);
      else onAuthenticated(result.token, result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout story={STORY} kicker={copy.kicker} title={copy.title} subtitle={copy.subtitle}>
      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <label>
            <span>Your name</span>
            <input
              autoComplete="name"
              value={form.username}
              onChange={updateField("username")}
              placeholder="e.g. Alex Morgan"
              required
            />
          </label>
        )}
        <label>
          <span>Email address</span>
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="you@example.com"
            required
          />
        </label>
        {!isForgotMode && (
          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={form.password}
              onChange={updateField("password")}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </label>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="form-success" role="status">
            {success}
          </p>
        )}
        <button className="button button-primary auth-submit" disabled={busy}>
          {busy
            ? "One moment…"
            : mode === "login"
              ? "Sign in"
              : mode === "register"
                ? "Create account"
                : "Send reset link"}
          <span>→</span>
        </button>
      </form>
      {mode === "login" && (
        <p className="auth-switch">
          <button type="button" onClick={() => setAuthMode("forgot")}>
            Forgot your password?
          </button>
        </p>
      )}
      <p className="auth-switch">
        {mode === "register"
          ? "Already have an account?"
          : isForgotMode
            ? "Remembered your password?"
            : "New to Daymark?"}{" "}
        <button
          type="button"
          onClick={() => setAuthMode(mode === "register" || isForgotMode ? "login" : "register")}
        >
          {mode === "register" || isForgotMode ? "Sign in" : "Create an account"}
        </button>
      </p>
    </AuthLayout>
  );
}
