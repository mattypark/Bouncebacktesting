"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/*
  Wrapper around next/navigation useRouter that plays
  the diagonal sweep exit animation before navigating.

  Usage:
    const { push } = useTransitionRouter();
    push("/bb-1");

  Or from any element:
    <button onClick={() => push("/about")}>Go</button>
*/

export function useTransitionRouter() {
  const router = useRouter();

  const push = useCallback(
    (href: string) => {
      // Dispatch a custom event that template.tsx listens for
      const event = new CustomEvent("page-transition", { detail: { href } });
      window.dispatchEvent(event);
    },
    []
  );

  return { push, router };
}
