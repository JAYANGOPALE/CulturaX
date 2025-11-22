import { db, serverTimestamp } from "./firebase-init.js";
import { requireAdmin } from "./auth.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const usersRef = collection(db, "users");
const quizzesRef = collection(db, "quizzes");
const quizResultsRef = collection(db, "quizResults");
const analyticsRef = collection(db, "analytics");
const visitorsRef = collection(db, "visitors");
const adminsRef = collection(db, "admins");
const adminInvitesRef = collection(db, "adminInvites");

async function initAdminDashboard() {
  const admin = await requireAdmin();
  if (!admin) return;

  const usersSnap = await getDocs(usersRef);
  const quizzesSnap = await getDocs(quizzesRef);
  const attemptsSnap = await getDocs(quizResultsRef);

  const today = new Date().toISOString().slice(0, 10);
  const visitorsTodaySnap = await getDoc(doc(visitorsRef, today));

  const mUsers = document.getElementById("metricUsers");
  const mQuizzes = document.getElementById("metricQuizzes");
  const mAttempts = document.getElementById("metricAttempts");
  const mVisitors = document.getElementById("metricVisitors");

  if (mUsers) mUsers.textContent = usersSnap.size;
  if (mQuizzes) mQuizzes.textContent = quizzesSnap.size;
  if (mAttempts) mAttempts.textContent = attemptsSnap.size;
  if (mVisitors)
    mVisitors.textContent = visitorsTodaySnap.exists()
      ? visitorsTodaySnap.data().count
      : 0;

  if (window.Chart) {
    await renderVisitorChart();
    await renderQuizAttemptsChart();
    await renderUserGrowthChart();
  }

  await initAdminManagement(admin);
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

async function initAdminManagement(currentAdmin) {
  const form = document.getElementById("addAdminForm");
  const nameInput = document.getElementById("adminNameInput");
  const emailInput = document.getElementById("adminEmailInput");
  const reasonInput = document.getElementById("adminReasonInput");
  const messageEl = document.getElementById("adminManagerMessage");
  const adminListEl = document.getElementById("adminList");
  const inviteListEl = document.getElementById("adminInviteList");

  if (!form || !adminListEl || !inviteListEl) return;

  function setMessage(text, isError = false) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.style.color = isError ? "#e54646" : "var(--cx-accent-strong, #caa851)";
  }

  function renderEmptyState(listEl, text) {
    listEl.innerHTML = "";
    const li = document.createElement("li");
    li.className = "cx-admin-list-empty";
    li.textContent = text;
    listEl.appendChild(li);
  }

  async function renderAdminDirectory() {
    const snap = await getDocs(adminsRef);
    if (snap.empty) {
      renderEmptyState(adminListEl, "No admins found");
      return;
    }
    adminListEl.innerHTML = "";
    snap.forEach((docSnap) => {
      const adminData = docSnap.data();
      const li = document.createElement("li");
      li.className = "cx-admin-list-item";

      const info = document.createElement("div");
      info.className = "cx-admin-list-info";
      const nameEl = document.createElement("strong");
      nameEl.textContent = adminData.name || "Admin";
      const emailEl = document.createElement("small");
      emailEl.textContent = adminData.email || "–";
      info.appendChild(nameEl);
      info.appendChild(emailEl);

      const badge = document.createElement("span");
      badge.className = "cx-admin-badge";
      badge.textContent =
        adminData.uid === currentAdmin.uid ? "You" : adminData.role || "Admin";

      li.appendChild(info);
      li.appendChild(badge);
      adminListEl.appendChild(li);
    });
  }

  async function renderInvites() {
    const snap = await getDocs(adminInvitesRef);
    if (snap.empty) {
      renderEmptyState(inviteListEl, "No pending invites");
      return;
    }

    inviteListEl.innerHTML = "";
    snap.forEach((docSnap) => {
      const invite = docSnap.data();
      const li = document.createElement("li");
      li.className = "cx-admin-list-item";

      const info = document.createElement("div");
      info.className = "cx-admin-list-info";
      const nameEl = document.createElement("strong");
      nameEl.textContent = invite.name || "Pending admin";
      const emailEl = document.createElement("small");
      emailEl.textContent = invite.email;
      info.appendChild(nameEl);
      info.appendChild(emailEl);

      const action = document.createElement("button");
      action.type = "button";
      action.className = "cx-admin-action";
      action.textContent = "Revoke";
      action.addEventListener("click", async () => {
        await deleteDoc(doc(adminInvitesRef, docSnap.id));
        await renderInvites();
      });

      li.appendChild(info);
      li.appendChild(action);
      inviteListEl.appendChild(li);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = normalizeEmail(emailInput.value);
    const reason = (reasonInput?.value || "").trim();

    if (!email) {
      setMessage("Email is required.", true);
      return;
    }

    setMessage("Saving invite...");

    try {
      const adminsSnap = await getDocs(adminsRef);
      const alreadyAdmin = adminsSnap.docs.some(
        (docSnap) => docSnap.data().email?.toLowerCase() === email
      );
      if (alreadyAdmin) {
        setMessage("This email already has admin access.", true);
        return;
      }

      await setDoc(doc(adminInvitesRef, email), {
        email,
        name,
        reason: reason || null,
        status: "pending",
        addedBy: currentAdmin.uid,
        addedByEmail: currentAdmin.email || null,
        addedByName: currentAdmin.displayName || currentAdmin.email || "Admin",
        createdAt: serverTimestamp(),
      });

      form.reset();
      await renderInvites();
      setMessage("Invite saved. Share the login link and let them sign in.");
    } catch (error) {
      console.error("Failed to add admin invite", error);
      setMessage(error.message || "Failed to save invite.", true);
    }
  });

  await renderAdminDirectory();
  await renderInvites();
}

async function renderVisitorChart() {
  const canvas = document.getElementById("chartVisitors");
  if (!canvas) return;
  const qVisitors = query(visitorsRef, orderBy("date", "asc"));
  const snap = await getDocs(qVisitors);
  const labels = [];
  const values = [];
  snap.forEach((d) => {
    const v = d.data();
    labels.push(v.date);
    values.push(v.count || 0);
  });
  new window.Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: "rgba(202, 168, 81, 0.75)",
          borderRadius: 12,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

async function renderQuizAttemptsChart() {
  const canvas = document.getElementById("chartQuizAttempts");
  if (!canvas) return;
  const snap = await getDocs(quizResultsRef);
  const byQuiz = {};
  snap.forEach((d) => {
    const r = d.data();
    const key = r.quizTitle || r.quizId || "Quiz";
    byQuiz[key] = (byQuiz[key] || 0) + 1;
  });
  const labels = Object.keys(byQuiz);
  const values = Object.values(byQuiz);
  new window.Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(202, 168, 81, 0.85)",
            "rgba(17, 18, 26, 0.25)",
            "rgba(17, 18, 26, 0.15)",
          ],
        },
      ],
    },
    options: {
      plugins: { legend: { position: "bottom" } },
    },
  });
}

async function renderUserGrowthChart() {
  const canvas = document.getElementById("chartUserGrowth");
  if (!canvas) return;
  const snap = await getDocs(usersRef);
  const buckets = {};
  snap.forEach((d) => {
    const u = d.data();
    const created = u.createdAt?.toDate?.() ?? new Date();
    const key = `${created.getFullYear()}-${(created.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    buckets[key] = (buckets[key] || 0) + 1;
  });
  const labels = Object.keys(buckets).sort();
  const values = labels.map((k) => buckets[k]);
  new window.Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data: values,
          borderColor: "#caa851",
          backgroundColor: "rgba(202, 168, 81, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

const QUESTION_TYPES = [
  { value: "mcq", label: "Multiple choice" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "short", label: "Short answer" },
  { value: "paragraph", label: "Paragraph" },
];

function generateLocalId(prefix = "q") {
  return `${prefix}-${crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}

function ensureOptionArray(options = []) {
  const clone = [...options];
  while (clone.length < 4) clone.push("");
  return clone.slice(0, 4);
}

function createQuestionCard(questionStack, data = {}) {
  const question = {
    id: data.id || generateLocalId("question"),
    type: data.type || "mcq",
    question: data.question || "",
    description: data.description || "",
    options: ensureOptionArray(data.options || []),
    correctAnswer:
      typeof data.correctAnswer === "number"
        ? data.correctAnswer
        : typeof data.correctIndex === "number"
        ? data.correctIndex
        : 0,
    correctAnswers: Array.isArray(data.correctAnswers)
      ? data.correctAnswers
      : typeof data.correctIndex === "number"
      ? [data.correctIndex]
      : [],
    answerKey: data.answerKey || "",
  };

  const card = document.createElement("article");
  card.className = "cx-question-card";
  card.dataset.id = question.id;
  card.dataset.type = question.type;

  const header = document.createElement("header");
  const title = document.createElement("h3");
  title.textContent = `Question ${questionStack.children.length + 1}`;
  const typeSelect = document.createElement("select");
  typeSelect.className = "cx-question-type-select";
  QUESTION_TYPES.forEach((t) => {
    const option = document.createElement("option");
    option.value = t.value;
    option.textContent = t.label;
    typeSelect.appendChild(option);
  });
  typeSelect.value = question.type;
  header.appendChild(title);
  header.appendChild(typeSelect);

  const questionInput = document.createElement("textarea");
  questionInput.className = "cx-question-input";
  questionInput.placeholder = "Ask your question...";
  questionInput.value = question.question;

  const descriptionInput = document.createElement("textarea");
  descriptionInput.className = "cx-question-description";
  descriptionInput.placeholder = "Optional description or helper text";
  descriptionInput.value = question.description || "";

  const dynamicArea = document.createElement("div");

  const footer = document.createElement("div");
  footer.className = "cx-question-card-footer";
  const duplicateBtn = document.createElement("button");
  duplicateBtn.type = "button";
  duplicateBtn.className = "cx-icon-button";
  duplicateBtn.textContent = "Duplicate";
  duplicateBtn.addEventListener("click", () => {
    const duplicateData = readQuestionCard(card);
    duplicateData.id = generateLocalId("question");
    const newCard = createQuestionCard(questionStack, duplicateData);
    card.after(newCard);
    refreshQuestionNumbers(questionStack);
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "cx-icon-button";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    if (questionStack.children.length === 1) return;
    card.remove();
    refreshQuestionNumbers(questionStack);
  });
  footer.appendChild(duplicateBtn);
  footer.appendChild(deleteBtn);

  function renderDynamicFields() {
    const type = typeSelect.value;
    card.dataset.type = type;
    dynamicArea.innerHTML = "";

    if (type === "mcq" || type === "checkbox") {
      const optionsContainer = document.createElement("div");
      optionsContainer.className = "cx-option-list";
      const options = ensureOptionArray(question.options);
      options.forEach((value, index) => {
        const row = document.createElement("div");
        row.className = "cx-option-row";
        const selector = document.createElement("input");
        selector.type = type === "mcq" ? "radio" : "checkbox";
        selector.name = `${question.id}-correct`;
        selector.value = index;
        if (type === "mcq") {
          selector.checked = question.correctAnswer === index;
        } else {
          selector.checked = question.correctAnswers.includes(index);
        }

        const optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.value = value || "";
        optionInput.placeholder = `Option ${index + 1}`;
        row.appendChild(selector);
        row.appendChild(optionInput);
        optionsContainer.appendChild(row);
      });
      dynamicArea.appendChild(optionsContainer);
    }

    if (type === "short" || type === "paragraph") {
      const answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.className = "cx-short-answer-key";
      answerInput.placeholder = "Reference answer (optional)";
      answerInput.value = question.answerKey || "";
      dynamicArea.appendChild(answerInput);
    }
  }

  typeSelect.addEventListener("change", () => {
    question.options = ensureOptionArray([]);
    question.correctAnswers = [];
    question.correctAnswer = 0;
    renderDynamicFields();
  });

  renderDynamicFields();

  card.appendChild(header);
  card.appendChild(questionInput);
  card.appendChild(descriptionInput);
  card.appendChild(dynamicArea);
  card.appendChild(footer);
  return card;
}

function refreshQuestionNumbers(stack) {
  Array.from(stack.children).forEach((card, index) => {
    const heading = card.querySelector("header h3");
    if (heading) heading.textContent = `Question ${index + 1}`;
  });
}

function readQuestionCard(card) {
  const type = card.dataset.type;
  const question = card.querySelector(".cx-question-input")?.value.trim() || "";
  const description = card
    .querySelector(".cx-question-description")
    ?.value.trim();
  const base = {
    id: card.dataset.id || generateLocalId("question"),
    type,
    question,
    description: description || "",
  };

  if (type === "mcq" || type === "checkbox") {
    const options = Array.from(
      card.querySelectorAll(".cx-option-row input[type='text']")
    ).map((input) => input.value.trim());

    if (type === "mcq") {
      const selected = card.querySelector(".cx-option-row input[type='radio']:checked");
      base.options = options;
      base.correctAnswer = selected
        ? Number(selected.value)
        : 0;
    } else {
      const selected = Array.from(
        card.querySelectorAll(".cx-option-row input[type='checkbox']:checked")
      ).map((checkbox) => Number(checkbox.value));
      base.options = options;
      base.correctAnswers = selected;
    }
  }

  if (type === "short" || type === "paragraph") {
    const keyInput = card.querySelector(".cx-short-answer-key");
    base.answerKey = keyInput?.value.trim() || "";
  }

  return base;
}

// Quiz manager
async function initQuizManager() {
  const admin = await requireAdmin();
  if (!admin) return;

  const quizListEl = document.getElementById("quizList");
  const questionStack = document.getElementById("quizQuestionStack");
  const titleInput = document.getElementById("quizTitleInput");
  const descriptionInput = document.getElementById("quizDescriptionInput");
  const categoryInput = document.getElementById("quizCategoryInput");
  const difficultyInput = document.getElementById("quizDifficultyInput");
  const addQuestionBtn = document.getElementById("addQuestionBtn");
  const saveQuizBtn = document.getElementById("saveQuizBtn");
  const deleteBtn = document.getElementById("deleteQuiz");
  const newQuizBtn = document.getElementById("newQuizBtn");
  const messageEl = document.getElementById("quizEditorMessage");
  const builderTitle = document.getElementById("builderTitle");

  if (
    !quizListEl ||
    !questionStack ||
    !titleInput ||
    !descriptionInput ||
    !addQuestionBtn
  ) {
    return;
  }

  let currentQuizId = null;
  let lastCreatedAt = null;

  function setMessage(text, isError = false) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.style.color = isError ? "#e54646" : "var(--cx-accent-strong)";
  }

  function resetBuilder() {
    currentQuizId = null;
    lastCreatedAt = null;
    titleInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";
    difficultyInput.value = "medium";
    builderTitle.textContent = "Untitled quiz";
    questionStack.innerHTML = "";
    addQuestion();
    setMessage("");
    highlightSelectedQuiz();
  }

  function highlightSelectedQuiz() {
    Array.from(quizListEl.children).forEach((li) => {
      li.classList.toggle("active", li.dataset.id === currentQuizId);
    });
  }

  titleInput.addEventListener("input", () => {
    builderTitle.textContent = titleInput.value.trim() || "Untitled quiz";
  });

  function addQuestion(prefill) {
    const card = createQuestionCard(questionStack, prefill);
    questionStack.appendChild(card);
    refreshQuestionNumbers(questionStack);
    return card;
  }

  addQuestionBtn.addEventListener("click", () => addQuestion());

  async function loadQuizList() {
    quizListEl.innerHTML = "";
    const snap = await getDocs(quizzesRef);
    const quizzes = [];
    snap.forEach((docSnap) => {
      quizzes.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    quizzes
      .sort((a, b) => {
        const aDate = a.updatedAt?.toDate?.() || a.createdAt?.toDate?.() || 0;
        const bDate = b.updatedAt?.toDate?.() || b.createdAt?.toDate?.() || 0;
        return bDate - aDate;
      })
      .forEach((quiz) => {
        const li = document.createElement("li");
        li.className = "cx-quiz-list-item";
        li.dataset.id = quiz.id;
        const title = document.createElement("p");
        title.className = "cx-quiz-list-item-title";
        title.textContent = quiz.title || "Untitled quiz";
        const meta = document.createElement("p");
        meta.className = "cx-quiz-list-item-meta";
        const count = quiz.questions?.length || 0;
        meta.textContent = `${quiz.difficulty || "medium"} • ${count} question${count === 1 ? "" : "s"}`;
        li.appendChild(title);
        li.appendChild(meta);
        li.addEventListener("click", () => loadQuizIntoEditor(quiz.id));
        quizListEl.appendChild(li);
      });
    highlightSelectedQuiz();
  }

  function normalizeQuestionData(question = {}) {
    const normalized = { ...question };
    if (!normalized.type) {
      normalized.type =
        Array.isArray(normalized.options) && normalized.options.length
          ? "mcq"
          : "short";
    }
    normalized.options = ensureOptionArray(normalized.options || []);
    if (normalized.type === "checkbox") {
      normalized.correctAnswers = Array.isArray(normalized.correctAnswers)
        ? normalized.correctAnswers
        : [];
    } else if (
      typeof normalized.correctIndex === "number" &&
      normalized.type !== "paragraph" &&
      normalized.type !== "short"
    ) {
      normalized.correctAnswer = normalized.correctIndex;
    }
    return normalized;
  }

  async function loadQuizIntoEditor(quizId) {
    const snap = await getDoc(doc(db, "quizzes", quizId));
    if (!snap.exists()) return;
    const quiz = snap.data();
    currentQuizId = quizId;
    lastCreatedAt = quiz.createdAt || null;
    titleInput.value = quiz.title || "";
    descriptionInput.value = quiz.description || "";
    categoryInput.value = quiz.category || "";
    difficultyInput.value = quiz.difficulty || "medium";
    builderTitle.textContent = quiz.title || "Untitled quiz";
    questionStack.innerHTML = "";
    const fetchedQuestions = (quiz.questions || []).map(normalizeQuestionData);
    if (!fetchedQuestions.length) {
      addQuestion();
    } else {
      fetchedQuestions.forEach((q) => addQuestion(q));
    }
    refreshQuestionNumbers(questionStack);
    setMessage("");
    highlightSelectedQuiz();
  }

  function extractQuestions() {
    const cards = Array.from(questionStack.children);
    const list = [];
    for (const card of cards) {
      const details = readQuestionCard(card);
      if (!details.question) {
        setMessage("Every question needs a prompt.", true);
        return null;
      }
      if (
        (details.type === "mcq" || details.type === "checkbox") &&
        (details.options || []).filter((opt) => opt && opt.trim()).length < 2
      ) {
        setMessage("Multiple-choice questions need at least two options.", true);
        return null;
      }
      list.push(details);
    }
    return list;
  }

  saveQuizBtn.addEventListener("click", async () => {
    setMessage("Saving quiz…");
    const title = titleInput.value.trim();
    if (!title) {
      setMessage("Please provide a quiz title.", true);
      return;
    }
    const questions = extractQuestions();
    if (!questions) return;
    if (!questions.length) {
      setMessage("Add at least one question.", true);
      return;
    }
    try {
      const payload = {
        title,
        description: descriptionInput.value.trim(),
        category: categoryInput.value.trim(),
        difficulty: difficultyInput.value,
        questions,
        createdBy: admin.uid,
        createdByEmail: admin.email || null,
        updatedAt: serverTimestamp(),
        ...(lastCreatedAt ? { createdAt: lastCreatedAt } : { createdAt: serverTimestamp() }),
      };
      const quizId = currentQuizId || doc(quizzesRef).id;
      await setDoc(doc(db, "quizzes", quizId), payload, { merge: true });
      currentQuizId = quizId;
      setMessage("Quiz saved successfully.");
      await loadQuizList();
      highlightSelectedQuiz();
    } catch (error) {
      console.error("Failed to save quiz", error);
      setMessage(error.message || "Failed to save quiz.", true);
    }
  });

  deleteBtn.addEventListener("click", async () => {
    if (!currentQuizId) {
      setMessage("Select a quiz to delete.", true);
      return;
    }
    if (!confirm("Delete this quiz permanently?")) return;
    await deleteDoc(doc(db, "quizzes", currentQuizId));
    setMessage("Quiz deleted.");
    resetBuilder();
    await loadQuizList();
  });

  newQuizBtn?.addEventListener("click", () => resetBuilder());

  resetBuilder();
  await loadQuizList();
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "admin-dashboard") {
    initAdminDashboard();
  }
  if (page === "admin-quiz-manager") {
    initQuizManager();
  }
});


