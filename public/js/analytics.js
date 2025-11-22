import {
  db,
  serverTimestamp,
  getCurrentUser,
} from "./firebase-init.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function detectDevice() {
  const ua = navigator.userAgent || "";
  if (/mobile|android|iphone|ipad|tablet/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser() {
  const ua = navigator.userAgent || "";
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return "Safari";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  return "Other";
}

async function updateDailyVisitors() {
  const today = new Date().toISOString().slice(0, 10);
  const ref = doc(db, "visitors", today);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const { count = 0 } = snap.data();
    await setDoc(ref, { date: today, count: count + 1 }, { merge: true });
  } else {
    await setDoc(ref, { date: today, count: 1 });
  }
}

async function logPageAnalytics() {
  try {
    const page = document.body.dataset.page || location.pathname;
    const device = detectDevice();
    const browser = detectBrowser();
    const user = await getCurrentUser();

    const analyticsRef = collection(db, "analytics");
    await addDoc(analyticsRef, {
      page,
      timestamp: serverTimestamp(),
      device,
      browser,
      userId: user ? user.uid : null,
    });

    await updateDailyVisitors();
  } catch (err) {
    console.warn("Analytics log failed", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  logPageAnalytics();
});


