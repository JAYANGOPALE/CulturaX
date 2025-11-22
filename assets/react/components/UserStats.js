import html from "../lib/html.js";

export default function UserStats({
  stats = {
    streak: 3,
    accuracy: 88,
    visits: 12,
    avgTime: "02:14",
  },
}) {
  const summary = [
    { label: "Day streak", value: `${stats.streak} days` },
    { label: "Accuracy", value: `${stats.accuracy}%` },
    { label: "Visits this week", value: stats.visits },
    { label: "Avg. time / quiz", value: stats.avgTime },
  ];

  return html`
    <div className="card">
      <h3>Your stats</h3>
      <div className="stats-row">
        ${summary.map(
          (item) => html`
            <div key=${item.label} className="stat-card">
              <strong>${item.value}</strong>
              <span>${item.label}</span>
            </div>
          `
        )}
      </div>
    </div>
  `;
}

