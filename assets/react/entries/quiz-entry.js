import html from "../lib/html.js";
import { createRoot } from "../lib/react-dom.js";
import QuizPlayer from "../components/QuizPlayer.js";
import { logVisit } from "../services/dataService.js";

const container = document.getElementById("quiz-root");
if (container) {
  logVisit("quiz");
  const root = createRoot(container);
  root.render(html`<${QuizPlayer} />`);
}

