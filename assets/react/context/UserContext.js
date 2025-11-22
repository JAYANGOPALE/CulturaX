import React, { createContext, useContext, useEffect, useState } from "../lib/react.js";
import html from "../lib/html.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../firebaseClient.js";

const UserContext = createContext({
  user: null,
  loading: true,
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const Provider = UserContext.Provider;
  return html`<${Provider} value=${{ user, loading }}>
    ${children}
  </${Provider}>`;
}

export function useUser() {
  return useContext(UserContext);
}

