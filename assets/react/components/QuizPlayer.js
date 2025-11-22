import React, { useEffect, useMemo, useState } from "../lib/react.js";
import html from "../lib/html.js";
import QuizResult from "./QuizResult.js";
import { fetchQuizzes, saveResult } from "../services/dataService.js";

const fallbackQuiz = {
  quiz_title: "Taj Heritage Highlights",
  questions: [
    {
      text: "Which emperor commissioned the Taj Mahal?",
      options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"],
      correct_option: 1,
    },
    {
      text: "What river flows beside the Taj Mahal?",
      options: ["Ganga", "Yamuna", "Godavari", "Narmada"],
      correct_option: 1,
    },
  ],
};

export default function QuizPlayer() {
  const [quiz, setQuiz] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const quizzes = await fetchQuizzes();
      setQuiz(quizzes[0] || fallbackQuiz);
    })();
  }, []);

  const currentQuestion = useMemo(
    () => quiz?.questions?.[activeIndex],
    [quiz, activeIndex]
  );

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [activeIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (activeIndex + 1 < quiz.questions.length) {
      setActiveIndex((prev) => prev + 1);
    } else {
      finalizeQuiz();
    }
  };

  const finalizeQuiz = async () => {
    const total = quiz.questions.length;
    let score = 0;
    quiz.questions.forEach((question, idx) => {
      if (answers[idx] === question.correct_option) {
        score += 1;
      }
    });
    const summary = {
      score,
      total,
      timeTaken: `${total * 15}s`,
      answered_questions: Object.keys(answers).length,
      quiz_id: quiz.id || "demo",
    };
    setResult(summary);
    await saveResult(summary);
  };

  const restart = () => {
    setAnswers({});
    setActiveIndex(0);
    setResult(null);
  };

  if (!quiz) {
    return html`<div className="quiz-card">Loading quiz...</div>`;
  }

  if (result) {
    return html`<${QuizResult} result=${result} onRestart=${restart} />`;
  }

  return html`
    <div className="quiz-card">
      <div className="quiz-meta">
        <span>${quiz.quiz_title}</span>
        <span>
          Question ${activeIndex + 1} / ${quiz.questions.length}
        </span>
      </div>
      <p className="quiz-question">${currentQuestion?.text}</p>
      <div className="quiz-options">
        ${currentQuestion?.options?.map(
          (option, idx) => html`
            <button
              type="button"
              key=${idx}
              onClick=${() => handleSelect(idx)}
              className=${`quiz-option ${
                answers[activeIndex] === idx ? "selected" : ""
              }`}
            >
              ${option}
            </button>
          `
        )}
      </div>
      <div className="quiz-actions">
        <button className="btn btn-primary" onClick=${handleNext}>
          ${activeIndex + 1 === quiz.questions.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  `;
}

