import { db, serverTimestamp } from "./firebase-init.js";
import { requireUser } from "./auth.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Shared references
const quizzesRef = collection(db, "quizzes");
const resultsRef = collection(db, "quizResults");

async function loadAvailableQuizzes() {
  const listEl = document.getElementById("availableQuizzes");
  if (!listEl) return;
  const snapshot = await getDocs(quizzesRef);
  listEl.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.textContent = `${data.title} · ${data.difficulty ?? "medium"}`;
    li.className = "cx-quiz-list-item";
    li.addEventListener("click", () => {
      localStorage.setItem("cx-current-quiz-id", docSnap.id);
      window.location.href = "quiz-page.html";
    });
    listEl.appendChild(li);
  });
}

async function loadPastResults(userId) {
  const listEl = document.getElementById("pastResults");
  if (!listEl) return;
  const q = query(
    resultsRef,
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
    limit(10)
  );
  const snapshot = await getDocs(q);
  listEl.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const r = docSnap.data();
    const item = document.createElement("li");
    item.textContent = `${r.quizTitle ?? "Quiz"} · Score: ${r.score} · ${
      r.timestamp?.toDate?.().toLocaleString?.() ?? ""
    }`;
    listEl.appendChild(item);
  });
}

async function initUserDashboard() {
  const user = await requireUser();
  if (!user) return;
  const nameEl = document.getElementById("dashboardUserName");
  if (nameEl) nameEl.textContent = `Welcome back, ${user.email}`;

  await loadAvailableQuizzes();
  await loadPastResults(user.uid);

  // Basic performance chart from last few results (data only from score)
  const chartCanvas = document.getElementById("userPerformanceChart");
  if (chartCanvas && window.Chart) {
    const q = query(
      resultsRef,
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc"),
      limit(10)
    );
    const snapshot = await getDocs(q);
    const labels = [];
    const values = [];
    snapshot.forEach((d) => {
      const r = d.data();
      labels.push(
        r.timestamp?.toDate?.().toLocaleDateString?.() ?? `Attempt ${labels.length + 1}`
      );
      values.push(r.score ?? 0);
    });
    new window.Chart(chartCanvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Score",
            data: values,
            borderColor: "#caa851",
            backgroundColor: "rgba(202, 168, 81, 0.18)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 10 } },
      },
    });
  }
}

// Quiz runner logic
async function initQuizPage() {
  const user = await requireUser();
  if (!user) return;
  const quizId = localStorage.getItem("cx-current-quiz-id");
  if (!quizId) {
    window.location.href = "user-dashboard.html";
    return;
  }

  const quizSnap = await getDoc(doc(db, "quizzes", quizId));
  if (!quizSnap.exists()) {
    window.location.href = "user-dashboard.html";
    return;
  }

  const quiz = quizSnap.data();
  const titleEl = document.getElementById("quizTitle");
  const bodyEl = document.getElementById("quizBody");
  const progressEl = document.getElementById("quizProgress");
  const timerEl = document.getElementById("quizTimer");
  const nextBtn = document.getElementById("quizNext");

  if (titleEl) titleEl.textContent = quiz.title ?? "Quiz";
  let index = -1;
  const answers = [];
  let timerInterval = null;
  let timeLeft = quiz.timeLimitSeconds ?? quiz.questions.length * 20;

  function renderTimer() {
    if (!timerEl) return;
    const mins = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
  }

  function startTimer() {
    if (!timerEl) return;
    renderTimer();
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      renderTimer();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finalizeQuiz();
      }
    }, 1000);
  }

  function renderQuestion() {
    index += 1;
    if (index >= quiz.questions.length) {
      finalizeQuiz();
      return;
    }

    const q = quiz.questions[index];
    if (progressEl) {
      progressEl.textContent = `Question ${index + 1} of ${quiz.questions.length}`;
    }
    bodyEl.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = q.question;
    bodyEl.appendChild(title);

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;
      btn.className = "cx-quiz-option";
      btn.addEventListener("click", () => {
        answers[index] = i;
        Array.from(bodyEl.querySelectorAll(".cx-quiz-option")).forEach((el) =>
          el.classList.remove("cx-quiz-option-selected")
        );
        btn.classList.add("cx-quiz-option-selected");
      });
      bodyEl.appendChild(btn);
    });

    nextBtn.textContent =
      index + 1 === quiz.questions.length ? "Submit" : "Next";
  }

  async function finalizeQuiz() {
    if (timerInterval) clearInterval(timerInterval);
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score += 1;
    });
    const payload = {
      userId: user.uid,
      quizId,
      quizTitle: quiz.title ?? "Quiz",
      score,
      answers,
      timestamp: serverTimestamp(),
    };
    await addDoc(resultsRef, payload);
    bodyEl.innerHTML = `<h2>Your score: ${score} / ${quiz.questions.length}</h2>`;
    progressEl.textContent = "";
    if (nextBtn) {
      nextBtn.textContent = "Back to dashboard";
      nextBtn.onclick = () => {
        window.location.href = "user-dashboard.html";
      };
    }
  }

  nextBtn.addEventListener("click", () => {
    if (index === -1) {
      startTimer();
      renderQuestion();
    } else {
      renderQuestion();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "user-dashboard") {
    initUserDashboard();
  }
  if (page === "quiz-page") {
    initQuizPage();
  }
});


