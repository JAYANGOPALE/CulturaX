import React, { useState } from "../lib/react.js";
import html from "../lib/html.js";
import { createRoot } from "../lib/react-dom.js";
import LoginForm from "../components/LoginForm.js";
import AdminLoginForm from "../components/AdminLoginForm.js";
import { logVisit } from "../services/dataService.js";

function LoginExperience() {
  const [tab, setTab] = useState("user");

  return html`
    <div>
      <div className="login-tabs">
        <button
          className=${`login-tab ${tab === "user" ? "active" : ""}`}
          onClick=${() => setTab("user")}
        >
          User Login
        </button>
        <button
          className=${`login-tab ${tab === "admin" ? "active" : ""}`}
          onClick=${() => setTab("admin")}
        >
          Admin Login
        </button>
      </div>
      ${tab === "user"
        ? html`<${LoginForm}
            onSuccess=${() =>
              (window.location.href = "user-dashboard.html")}
          />`
        : html`<${AdminLoginForm}
            onSuccess=${() =>
              (window.location.href = "admin-dashboard.html")}
          />`}
      <p className="login-meta">Need access? Contact your CulturaX admin.</p>
    </div>
  `;
}

const container = document.getElementById("login-root");
if (container) {
  logVisit("login");
  const root = createRoot(container);
  root.render(html`<${LoginExperience} />`);
}

