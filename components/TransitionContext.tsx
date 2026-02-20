"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type TransitionMode = "pixels" | "arrow" | "linear";

interface TransitionContextValue {
  mode: TransitionMode;
  setMode: (m: TransitionMode) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  mode: "arrow",
  setMode: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [mode, setModeRaw] = useState<TransitionMode>("arrow");

  const setMode = useCallback((m: TransitionMode) => {
    setModeRaw(m);
    try {
      sessionStorage.setItem("bb-transition-mode", m);
    } catch {}
  }, []);

  return (
    <TransitionContext.Provider value={{ mode, setMode }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionMode() {
  return useContext(TransitionContext);
}
