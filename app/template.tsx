"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import TransitionOverlay, {
  type TransitionOverlayHandle,
} from "@/components/TransitionOverlay";
import { useTransitionMode } from "@/components/TransitionContext";

/*
  Page transition controller (state machine).

  States:  idle → animatingOut → switching → animatingIn → idle

  Flow:
  1. User clicks an internal link / calls navigateWithTransition
  2. State → animatingOut: overlay covers the screen
  3. Once overlay is fully opaque → state → switching: router.push(href)
  4. template.tsx re-mounts on the new route
  5. On mount, detect "bb-transition" flag → state → animatingIn: overlay reveals
  6. Once reveal finishes → state → idle

  Navigation triggers are ignored while state !== idle.
*/

type Phase = "idle" | "animatingOut" | "switching" | "animatingIn";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { mode } = useTransitionMode();

  const overlayRef = useRef<TransitionOverlayHandle>(null);
  const phaseRef = useRef<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* ── Safety: force idle after max timeout ── */
  const armSafety = useCallback((ms = 2500) => {
    clearTimeout(safetyTimer.current);
    safetyTimer.current = setTimeout(() => {
      phaseRef.current = "idle";
      pendingHref.current = null;
    }, ms);
  }, []);

  const clearSafety = useCallback(() => {
    clearTimeout(safetyTimer.current);
  }, []);

  /* ── Core transition trigger ── */
  const startTransition = useCallback(
    (href: string) => {
      if (href === pathname || phaseRef.current !== "idle") return;

      phaseRef.current = "animatingOut";
      pendingHref.current = href;
      armSafety();

      overlayRef.current?.animateOut({
        mode,
        onMidpoint: () => {
          // Screen is now fully covered — perform navigation
          phaseRef.current = "switching";
          const target = pendingHref.current;
          pendingHref.current = null;

          if (target) {
            try {
              sessionStorage.setItem("bb-transition", "1");
              sessionStorage.setItem("bb-transition-mode", mode);
            } catch {}
            // Ensure the solid cover is painted before navigating
            // so there's no flash between pages
            overlayRef.current?.instantCover();
            requestAnimationFrame(() => {
              router.push(target);
            });
          } else {
            phaseRef.current = "idle";
            clearSafety();
          }
        },
      });
    },
    [pathname, mode, router, armSafety, clearSafety]
  );

  /* ── On mount: check if we arrived via transition → play reveal ── */
  const didMountReveal = useRef(false);
  useEffect(() => {
    if (didMountReveal.current) return;
    didMountReveal.current = true;

    let arrivedViaTransition = false;
    let savedMode = mode;
    try {
      arrivedViaTransition = sessionStorage.getItem("bb-transition") === "1";
      const saved = sessionStorage.getItem("bb-transition-mode");
      if (saved === "pixels" || saved === "arrow" || saved === "linear") {
        savedMode = saved;
      }
      sessionStorage.removeItem("bb-transition");
      sessionStorage.removeItem("bb-transition-mode");
    } catch {}

    if (arrivedViaTransition && overlayRef.current) {
      phaseRef.current = "animatingIn";
      armSafety();

      // Instantly show solid cover so there's no flash of the new page
      overlayRef.current.instantCover();

      // Double rAF: first frame lets the browser composite the cover,
      // second frame ensures the page content is painted underneath,
      // then we start the smooth reveal — no glitch.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlayRef.current?.animateIn({
            mode: savedMode,
            onDone: () => {
              phaseRef.current = "idle";
              clearSafety();
            },
          });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Intercept <a> clicks for internal navigation ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external, hash, mailto, same-page, blank-target
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        anchor.target === "_blank" ||
        href === pathname
      ) {
        return;
      }

      e.preventDefault();
      startTransition(href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, startTransition]);

  /* ── Listen for programmatic transitions (useTransitionRouter) ── */
  useEffect(() => {
    function onPageTransition(e: Event) {
      const customEvent = e as CustomEvent<{ href: string }>;
      startTransition(customEvent.detail.href);
    }
    window.addEventListener("page-transition", onPageTransition);
    return () =>
      window.removeEventListener("page-transition", onPageTransition);
  }, [startTransition]);

  /* ── Cleanup on unmount ── */
  useEffect(() => () => clearSafety(), [clearSafety]);

  return (
    <>
      <TransitionOverlay ref={overlayRef} />
      {children}
    </>
  );
}
