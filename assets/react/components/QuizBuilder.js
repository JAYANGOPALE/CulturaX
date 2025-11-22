import React, { useState } from "../lib/react.js";
import html from "../lib/html.js";
import { saveQuiz } from "../services/dataService.js";

const createQuestion = () => ({
  text: "",
  options: ["", "", "", ""],
  correct_option: 0,
});

export default function QuizBuilder() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([createQuestion()]);
  const [status, setStatus] = useState({ saving: false, message: "" });

  const updateQuestion = (index, updates) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index ? { ...question, ...updates } : question
      )
    );
  };

  const updateOption = (qIndex, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((question, idx) => {
        if (idx !== qIndex) return question;
        const options = question.options.map((opt, oIdx) =>
          oIdx === optionIndex ? value : opt
        );
        return { ...question, options };
      })
    );
  };

  const addQuestion = () => setQuestions((prev) => [...prev, createQuestion()]);

  const handleSave = async () => {
    if (!title.trim()) {
      setStatus({ saving: false, message: "Quiz title required" });
      return;
    }
    setStatus({ saving: true, message: "Saving quiz..." });
    const result = await saveQuiz({ quiz_title: title, questions });
    setStatus({
      saving: false,
      message: result.success ? "Quiz saved!" : "Error saving quiz",
    });
    if (result.success) {
      setTitle("");
      setQuestions([createQuestion()]);
    }
  };

  return html`
    <div className="quiz-builder-grid">
      <div className="card">
        <h3>Create quiz</h3>
        <input
          type="text"
          placeholder="Quiz title"
          value=${title}
          onChange=${(e) => setTitle(e.target.value)}
        />
        ${questions.map(
          (question, idx) => html`
            <div key=${idx} className="question-card">
              <label>Question ${idx + 1}</label>
              <textarea
                rows="2"
                value=${question.text}
                onChange=${(e) =>
                  updateQuestion(idx, { text: e.target.value })}
                placeholder="Enter your question"
              ></textarea>
              <div className="quiz-options">
                ${question.options.map(
                  (option, oIdx) => html`
                    <label key=${oIdx}>
                      Option ${oIdx + 1}
                      <input
                        type="text"
                        value=${option}
                        onChange=${(e) =>
                          updateOption(idx, oIdx, e.target.value)}
                        placeholder="Answer option"
                      />
                    </label>
                  `
                )}
              </div>
              <label>
                Correct answer
                <select
                  value=${question.correct_option}
                  onChange=${(e) =>
                    updateQuestion(idx, {
                      correct_option: Number(e.target.value),
                    })}
                >
                  ${question.options.map(
                    (_, oIdx) =>
                      html`<option key=${oIdx} value=${oIdx}>
                        Option ${oIdx + 1}
                      </option>`
                  )}
                </select>
              </label>
            </div>
          `
        )}
        <div className="quiz-actions">
          <button className="btn btn-secondary" onClick=${addQuestion}>
            + Add question
          </button>
          <button className="btn btn-primary" onClick=${handleSave}>
            ${status.saving ? "Saving..." : "Save quiz"}
          </button>
        </div>
        ${status.message &&
        html`<p className="section-description">${status.message}</p>`}
      </div>
    </div>
  `;
}

