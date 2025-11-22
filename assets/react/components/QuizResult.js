import html from "../lib/html.js";

export default function QuizResult({ result, onRestart }) {
  if (!result) return null;

  const { score, total, timeTaken } = result;
  const percentage = Math.round((score / total) * 100);

  return html`
    <div className="quiz-card">
      <h2>Quiz complete!</h2>
      <p className="quiz-question">
        You scored ${score} / ${total} (${percentage}%)
      </p>
      <p className="section-description">
        Time taken: ${timeTaken || "—"}
      </p>
      <div className="quiz-actions">
        <button className="btn btn-primary" onClick=${onRestart}>
          Try another quiz
        </button>
      </div>
    </div>
  `;
}

