"use client";

import { useState } from "react";
import {
  useTransitionMode,
  type TransitionMode,
} from "./TransitionContext";

const modes: { value: TransitionMode; label: string }[] = [
  { value: "pixels", label: "Pixels" },
  { value: "arrow", label: "Arrow" },
  { value: "linear", label: "Linear" },
];

export default function TransitionModeToggle() {
  const { mode, setMode } = useTransitionMode();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2">
      {/* Expanded mode pills */}
      {open && (
        <div className="flex gap-1.5 rounded-full border border-bb-lime/30 bg-bb-deep/95 px-1.5 py-1.5 shadow-lg backdrop-blur-sm">
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => {
                setMode(m.value);
                setOpen(false);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                mode === m.value
                  ? "bg-bb-lime text-bb-deep"
                  : "text-bb-lime/70 hover:bg-bb-lime/10 hover:text-bb-lime"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle transition mode"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-bb-lime/30 bg-bb-deep/95 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-bb-lime/60"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CEF17B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>
      </button>
    </div>
  );
}
