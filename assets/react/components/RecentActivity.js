import html from "../lib/html.js";

export default function RecentActivity({ items = [] }) {
  const fallback = [
    {
      id: "1",
      title: "Completed Taj Heritage Quiz",
      timestamp: "2h ago",
      score: "9 / 10",
    },
    {
      id: "2",
      title: "Viewed AR walkthrough",
      timestamp: "1d ago",
      score: "Experience",
    },
  ];

  const data = items.length ? items : fallback;

  return html`
    <div className="card">
      <h3>Recent activity</h3>
      <div className="activity-list">
        ${data.map(
          (item) => html`
            <div key=${item.id} className="activity-item">
              <div>
                <strong>${item.title}</strong>
                <p className="section-description">${item.timestamp}</p>
              </div>
              <span className="stat-chip">${item.score}</span>
            </div>
          `
        )}
      </div>
    </div>
  `;
}

