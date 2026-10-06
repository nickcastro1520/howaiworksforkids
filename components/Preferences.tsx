"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Welcome } from "@/components/Welcome";
import {
  DEFAULT_PREFS,
  applyPrefsToDocument,
  readPrefs,
  writePrefs,
  type Prefs,
} from "@/lib/prefs";
import type { ThemeId } from "@/lib/types";

type PrefsContextValue = {
  prefs: Prefs;
  ready: boolean;
  setTheme: (theme: ThemeId) => void;
  markComplete: (slug: string) => void;
  saveWelcome: (prefs: Pick<Prefs, "theme">) => void;
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

export function usePrefs(): PrefsContextValue {
  const value = useContext(PrefsContext);
  if (!value) throw new Error("usePrefs must be used inside PreferencesRoot");
  return value;
}

export function PreferencesRoot({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  const commit = useCallback((next: Prefs) => {
    writePrefs(next);
    applyPrefsToDocument(next);
    setPrefs(next);
    setReady(true);
    setGateOpen(false);
  }, []);

  useEffect(() => {
    const stored = readPrefs();
    const needsWelcome = document.documentElement.dataset.needsWelcome === "yes";
    const timer = window.setTimeout(() => {
      if (stored) setPrefs(stored);
      setReady(true);
      setGateOpen(needsWelcome);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setTheme = useCallback(
    (theme: ThemeId) => commit({ ...prefs, theme }),
    [commit, prefs],
  );

  const markComplete = useCallback(
    (slug: string) => {
      if (prefs.completed.includes(slug)) return;
      commit({ ...prefs, completed: [...prefs.completed, slug] });
    },
    [commit, prefs],
  );

  const saveWelcome = useCallback(
    (picked: Pick<Prefs, "theme">) => {
      commit({ ...prefs, ...picked });
    },
    [commit, prefs],
  );

  const value = useMemo(
    () => ({ prefs, ready, setTheme, markComplete, saveWelcome }),
    [prefs, ready, setTheme, markComplete, saveWelcome],
  );

  return (
    <PrefsContext.Provider value={value}>
      <Welcome />
      <div className="app-shell flex min-h-full flex-col" inert={gateOpen}>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Header />
        <main id="content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </PrefsContext.Provider>
  );
}
