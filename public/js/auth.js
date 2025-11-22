import { auth, db, getCurrentUser, serverTimestamp } from "./firebase-init.js";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_INVITES_COLLECTION = "adminInvites";
const DEFAULT_ADMIN = {
  email: "jayan@gmail.com",
  password: "pass123",
  name: "Jayan",
};

async function handleUserLogin(event) {
  event.preventDefault();
  const email = document.getElementById("userEmail").value.trim();
  const password = document.getElementById("userPassword").value;
  const errorEl = document.getElementById("userLoginError");
  errorEl.textContent = "";

  try {
    await attemptUserSignIn(email, password);
    window.location.href = "user-dashboard.html";
  } catch (error) {
    errorEl.textContent = error.message;
  }
}

async function handleAdminLogin(event) {
  event.preventDefault();
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;
  const errorEl = document.getElementById("adminLoginError");
  errorEl.textContent = "";
  let credential = null;

  try {
    credential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const normalized = normalizeEmail(email);
    const matchesDefault =
      normalized === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password;
    const seedableErrors = [
      "auth/user-not-found",
      "auth/invalid-credential",
      "auth/invalid-email",
    ];
    if (matchesDefault && seedableErrors.includes(error.code)) {
      try {
        credential = await createUserWithEmailAndPassword(auth, email, password);
        await seedAdminProfile(credential.user, DEFAULT_ADMIN.name);
      } catch (createError) {
        if (createError.code === "auth/email-already-in-use") {
          errorEl.textContent =
            "Default admin exists but the password is different. Reset it from the Firebase Console.";
        } else {
          errorEl.textContent = createError.message;
        }
        return;
      }
    } else {
      errorEl.textContent = error.message;
      return;
    }
  }

  try {
    await ensureAdminAccess(credential.user);
    window.location.href = "admin-dashboard.html";
  } catch (error) {
    errorEl.textContent = error.message;
  }
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

async function getAdminInvite(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const inviteRef = doc(db, ADMIN_INVITES_COLLECTION, normalized);
  const inviteSnap = await getDoc(inviteRef);
  if (!inviteSnap.exists()) return null;
  return { ref: inviteRef, data: inviteSnap.data() };
}

async function ensureAdminAccess(user) {
  const adminRef = doc(db, "admins", user.uid);
  const adminSnap = await getDoc(adminRef);

  if (adminSnap.exists()) {
    if (adminSnap.data().role === "admin") {
      await upsertUserDocument(user, {
        name: adminSnap.data().name,
        role: "admin",
      });
      await upsertAdminDocument(user, { name: adminSnap.data().name });
      return;
    }
    await signOut(auth);
    throw new Error("You do not have admin privileges.");
  }
  const invite = await getAdminInvite(user.email);
  if (invite) {
    const inviteData = invite.data || {};
    const name =
      inviteData.name ||
      user.displayName ||
      user.email?.split("@")[0] ||
      "Admin";
    await upsertAdminDocument(user, {
      name,
      invitedBy: inviteData.addedBy || null,
      invitedByEmail: inviteData.addedByEmail || null,
      invitedReason: inviteData.reason || null,
    });
    await upsertUserDocument(user, { name, role: "admin" });
    await deleteDoc(invite.ref);
    return;
  }

  if (normalizeEmail(user.email) === DEFAULT_ADMIN.email) {
    await seedAdminProfile(user, DEFAULT_ADMIN.name);
    return;
  }

  await signOut(auth);
  throw new Error("You do not have admin privileges.");
}

async function upsertUserDocument(user, options = {}) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const isNew = !snapshot.exists();

  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email,
      name: options.name || user.displayName || "Learner",
      role: options.role || "user",
      provider: user.providerData?.[0]?.providerId || "password",
      lastLoginAt: serverTimestamp(),
      ...(isNew ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true }
  );
}

async function upsertAdminDocument(user, options = {}) {
  const adminRef = doc(db, "admins", user.uid);
  const snapshot = await getDoc(adminRef);
  const isNew = !snapshot.exists();
  const { name, ...additional } = options;

  await setDoc(
    adminRef,
    {
      uid: user.uid,
      email: user.email,
      name: name || user.displayName || "Admin",
      role: "admin",
      lastLoginAt: serverTimestamp(),
      ...(isNew ? { createdAt: serverTimestamp() } : {}),
      ...additional,
    },
    { merge: true }
  );
}

async function attemptUserSignIn(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await upsertUserDocument(credential.user, {
    name: credential.user.displayName || "Learner",
    role: "user",
  });
  return credential;
}

async function handleUserSignup(event) {
  event.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const messageEl = document.getElementById("signupMessage");
  messageEl.textContent = "Creating account...";

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await upsertUserDocument(credential.user, {
      name: name || "Learner",
      role: "user",
    });
    messageEl.style.color = "var(--cx-accent-strong)";
    messageEl.textContent = "Account created! Redirecting...";
    setTimeout(() => {
      window.location.href = "user-dashboard.html";
    }, 800);
  } catch (error) {
    messageEl.style.color = "#e54646";
    messageEl.textContent = error.message;
  }
}

async function seedAdminProfile(user, name = "Admin") {
  await upsertAdminDocument(user, { name, role: "admin" });
  await upsertUserDocument(user, { name, role: "admin" });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "user-login.html";
    return null;
  }
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "admin-login.html";
    return null;
  }
  try {
    await ensureAdminAccess(user);
    return user;
  } catch (error) {
    window.location.href = "admin-login.html";
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userLoginForm");
  const adminForm = document.getElementById("adminLoginForm");
  const signupForm = document.getElementById("userSignupForm");
  if (userForm) userForm.addEventListener("submit", handleUserLogin);
  if (adminForm) adminForm.addEventListener("submit", handleAdminLogin);
  if (signupForm) signupForm.addEventListener("submit", handleUserSignup);

  const userSignOut = document.getElementById("userSignOut");
  const adminSignOut = document.getElementById("adminSignOut");
  const adminSignOut2 = document.getElementById("adminSignOut2");
  const globalSignOut = document.getElementById("globalSignOut");

  async function handleSignOut() {
    await signOut(auth);
    window.location.href = "index.html";
  }

  if (userSignOut) userSignOut.addEventListener("click", handleSignOut);
  if (adminSignOut) adminSignOut.addEventListener("click", handleSignOut);
  if (adminSignOut2) adminSignOut2.addEventListener("click", handleSignOut);
  if (globalSignOut) globalSignOut.addEventListener("click", handleSignOut);

  hydrateGlobalAuthMenu();
});

async function hydrateGlobalAuthMenu() {
  const label = document.getElementById("cxAuthLabel");
  const loggedOutLinks = document.getElementById("cxAuthLoggedOut");
  const signOutButton = document.getElementById("globalSignOut");
  if (!label || !signOutButton) return;

  const user = await getCurrentUser();
  if (user) {
    label.textContent = user.displayName || user.email?.split("@")[0] || "Account";
    if (loggedOutLinks) loggedOutLinks.style.display = "none";
    signOutButton.hidden = false;
  } else {
    label.textContent = "Login";
    if (loggedOutLinks) loggedOutLinks.style.removeProperty("display");
    signOutButton.hidden = true;
  }
}


