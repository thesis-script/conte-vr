import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

const STORAGE_KEY = "contevr_session";

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem("contevr_progress");
      return raw ? JSON.parse(raw) : { lastScore: null, storiesDone: 0, sceneIndex: 0 };
    } catch {
      return { lastScore: null, storiesDone: 0, sceneIndex: 0 };
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("contevr_progress", JSON.stringify(progress));
  }, [progress]);

  function login(name, role) {
    setUser({ name, role });
  }

  function logout() {
    setUser(null);
  }

  function recordQuizResult(score) {
    setProgress((p) => ({
      ...p,
      lastScore: score,
      storiesDone: p.storiesDone + 1,
    }));
  }

  return (
    <AppContext.Provider value={{ user, login, logout, progress, recordQuizResult }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
