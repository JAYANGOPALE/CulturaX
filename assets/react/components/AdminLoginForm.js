import React, { useState } from "../lib/react.js";
import html from "../lib/html.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../firebaseClient.js";

export default function AdminLoginForm({ onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    adminCode: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    if (!form.adminCode.trim()) {
      setStatus({ loading: false, error: "Admin access code required." });
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const adminCode =
        window.CULTURAX_ADMIN_CODE || "CULTURAX-ADMIN";
      const isAdmin =
        credential.user?.email?.toLowerCase().includes("admin") ||
        form.adminCode === adminCode;

      if (!isAdmin) {
        throw new Error("Account does not have admin privileges.");
      }

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
        <label htmlFor="admin-email">Admin Email</label>
        <input
          id="admin-email"
          type="email"
          required
          value=${form.email}
          onChange=${(e) => updateField("email", e.target.value)}
          placeholder="admin@culturax.in"
        />
      </div>
      <div>
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          required
          value=${form.password}
          onChange=${(e) => updateField("password", e.target.value)}
          placeholder="********"
        />
      </div>
      <div>
        <label htmlFor="admin-code">Admin Access Code</label>
        <input
          id="admin-code"
          type="text"
          required
          value=${form.adminCode}
          onChange=${(e) => updateField("adminCode", e.target.value)}
          placeholder="Enter admin code"
        />
      </div>
      ${status.error &&
      html`<p className="login-meta" role="alert">${status.error}</p>`}
      <button
        type="submit"
        className="btn btn-primary"
        disabled=${status.loading}
      >
        ${status.loading ? "Verifying..." : "Login as Admin"}
      </button>
    </form>
  `;
}

