import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "../firebaseClient.js";

const visitsRef = collection(db, "visits");
const quizzesRef = collection(db, "quizzes");
const resultsRef = collection(db, "results");

export async function logVisit(page, userId = null) {
  try {
    await addDoc(visitsRef, {
      page_visited: page,
      user_id: userId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.warn("Visit logging failed:", error);
  }
}

export async function saveQuiz(quiz) {
  const quizPayload = {
    ...quiz,
    questions: quiz.questions?.map((q, idx) => ({
      id: idx,
      text: q.text,
      options: q.options,
      correct_option: q.correct_option,
    })),
    created_at: serverTimestamp(),
  };

  try {
    await addDoc(quizzesRef, quizPayload);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function fetchQuizzes() {
  try {
    const snapshot = await getDocs(quizzesRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Unable to fetch quizzes:", error);
    return [];
  }
}

export async function saveResult(result) {
  try {
    await addDoc(resultsRef, {
      ...result,
      created_at: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function fetchRecentResults(count = 5) {
  try {
    const q = query(resultsRef, orderBy("created_at", "desc"), limit(count));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
}

