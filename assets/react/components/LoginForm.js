import React, { useState } from "../lib/react.js";
import html from "../lib/html.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../firebaseClient.js";

export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      onSuccess?.(credential.user);
    } catch (error) {
      setStatus({ loading: false, error: error.message });
      return;
    }

    setStatus({ loading: false, error: "" });
  };

  return html`
    <form className="login-form" onSubmit=${handleSubmit}>
      <div>
        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          required
          value=${form.email}
          onChange=${(e) => updateField("email", e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <input
          id="user-password"
          type="password"
          required
          value=${form.password}
          onChange=${(e) => updateField("password", e.target.value)}
          placeholder="********"
        />
      </div>
      ${status.error &&
      html`<p className="login-meta" role="alert">${status.error}</p>`}
      <button
        type="submit"
        className="btn btn-primary"
        disabled=${status.loading}
      >
        ${status.loading ? "Signing in..." : "Login"}
      </button>
    </form>
  `;
}

