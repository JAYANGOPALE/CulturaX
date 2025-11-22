import React, { useEffect, useState } from "../lib/react.js";
import html from "../lib/html.js";
import { createRoot } from "../lib/react-dom.js";
import { UserProvider, useUser } from "../context/UserContext.js";
import UserStats from "../components/UserStats.js";
import RecentActivity from "../components/RecentActivity.js";
import { fetchRecentResults, logVisit } from "../services/dataService.js";

function DashboardPanels() {
  const { user } = useUser();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    logVisit("user-dashboard", user?.uid);
    (async () => {
      const data = await fetchRecentResults();
      const mapped = data.map((item) => ({
        id: item.id,
        title: item.quiz_title || "Quiz attempt",
        timestamp: item.created_at?.toDate?.().toLocaleString?.() || "Recent",
        score: `${item.score || 0} pts`,
      }));
      setActivities(mapped);
    })();
  }, [user?.uid]);

  return html`
    <div className="dashboard-react-root">
      <${UserStats}
        stats=${{
          streak: 4,
          accuracy: 92,
          visits: activities.length || 1,
          avgTime: "02:10",
        }}
      />
      <${RecentActivity} items=${activities} />
    </div>
  `;
}

const container = document.getElementById("user-dashboard-root");
if (container) {
  const root = createRoot(container);
  root.render(
    html`<${UserProvider}>
      <${DashboardPanels} />
    </${UserProvider}>`
  );
}

