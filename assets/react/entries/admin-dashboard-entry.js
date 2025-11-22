import html from "../lib/html.js";
import { createRoot } from "../lib/react-dom.js";
import QuizBuilder from "../components/QuizBuilder.js";
import VisitGraph from "../components/VisitGraph.js";
import UserGraph from "../components/UserGraph.js";
import QuizStatsGraph from "../components/QuizStatsGraph.js";
import { logVisit } from "../services/dataService.js";

const quizContainer = document.getElementById("admin-quiz-root");
if (quizContainer) {
  logVisit("admin-dashboard");
  const quizRoot = createRoot(quizContainer);
  quizRoot.render(html`<${QuizBuilder} />`);
}

const analyticsContainer = document.getElementById("admin-analytics-root");
if (analyticsContainer) {
  const analyticsRoot = createRoot(analyticsContainer);
  analyticsRoot.render(
    html`<div className="analytics-grid">
      <${VisitGraph} />
      <${UserGraph} />
      <${QuizStatsGraph} />
    </div>`
  );
}

