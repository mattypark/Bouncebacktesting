"use client";

import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import type { TransitionMode } from "./TransitionContext";

/* ─────────────────────────────────────────────
   Imperative API exposed via ref
   ───────────────────────────────────────────── */
export interface TransitionOverlayHandle {
  /** Play the "cover screen" animation. Calls onMidpoint once fully covered. */
  animateOut: (opts: { mode: TransitionMode; onMidpoint: () => void }) => void;
  /** Play the "reveal screen" animation. Calls onDone when fully revealed. */
  animateIn: (opts: { mode: TransitionMode; onDone: () => void }) => void;
  /** Instantly show the solid cover (no animation). Used on page arrival. */
  instantCover: () => void;
}

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */
const DURATION_MS = 600;
const PIXEL_COLS = 12;
const PIXEL_ROWS = 8;
const BB_DEEP = "#084734";
const BB_LIME = "#CEF17B";

/* Reduced motion check */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
const TransitionOverlay = forwardRef<TransitionOverlayHandle>(
  function TransitionOverlay(_, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const [visible, setVisible] = useState(false);

    // Clean up any running animation
    const cancelAnim = useCallback(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    }, []);

    useEffect(() => () => cancelAnim(), [cancelAnim]);

    /* ── Resize canvas to viewport ── */
    const resizeCanvas = useCallback(() => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }, []);

    useEffect(() => {
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    /* ── Draw helpers ── */

    function drawSolid(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.fillStyle = BB_DEEP;
      ctx.fillRect(0, 0, w, h);
    }

    function drawLinearOut(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) {
      ctx.clearRect(0, 0, w, h);
      // Wipe from left to right covering the screen
      // At progress=0: nothing visible. At progress=1: entire screen covered.
      // Leading edge moves from left edge to right edge.
      const leading = progress * w;
      ctx.fillStyle = BB_DEEP;
      ctx.fillRect(0, 0, leading, h);
    }

    function drawLinearIn(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) {
      ctx.clearRect(0, 0, w, h);
      // Reveal: leading edge moves from left to right uncovering the page
      // At progress=0: entire screen covered. At progress=1: nothing visible.
      const revealed = progress * w;
      ctx.fillStyle = BB_DEEP;
      ctx.fillRect(revealed, 0, w, h);
    }

    function drawArrowOut(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) {
      ctx.clearRect(0, 0, w, h);
      // Chevron / arrow wipe covering screen diagonally
      const skew = w * 0.3;
      const travel = w + skew + w * 0.2;
      const leading = -skew - w * 0.2 + progress * travel;
      const trailing = leading - w * 1.4;

      ctx.fillStyle = BB_DEEP;
      ctx.beginPath();
      ctx.moveTo(trailing, 0);
      ctx.lineTo(leading + skew, 0);
      ctx.lineTo(leading, h);
      ctx.lineTo(trailing - skew, h);
      ctx.closePath();
      ctx.fill();
    }

    function drawArrowIn(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) {
      ctx.clearRect(0, 0, w, h);
      const skew = w * 0.3;
      const travel = w + skew + w * 0.2;
      // Start covering fully, then slide off to right
      const leading = progress * travel;
      const trailing = leading - w * 1.4;

      ctx.fillStyle = BB_DEEP;
      // Draw full rect minus the revealed part
      ctx.beginPath();
      ctx.moveTo(trailing, 0);
      ctx.lineTo(w + skew, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(trailing - skew, h);
      ctx.closePath();
      ctx.fill();
    }

    function drawPixelsOut(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) {
      ctx.clearRect(0, 0, w, h);
      const cellW = Math.ceil(w / PIXEL_COLS);
      const cellH = Math.ceil(h / PIXEL_ROWS);

      for (let row = 0; row < PIXEL_ROWS; row++) {
        for (let col = 0; col < PIXEL_COLS; col++) {
          // Stagger: cells closer to top-left appear first
          const dist =
            (col / PIXEL_COLS + row / PIXEL_ROWS) / 2;
          const cellProgress = Math.max(
            0,
            Math.min(1, (progress - dist * 0.6) / 0.4)
          );
          if (cellProgress <= 0) continue;

          const scale = easeOutCubic(cellProgress);
          const cx = col * cellW + cellW / 2;
          const cy = row * cellH + cellH / 2;
          const drawW = cellW * scale + 2; // +2 to avoid subpixel gaps
          const drawH = cellH * scale + 2;

          ctx.fillStyle = BB_DEEP;
          ctx.fillRect(cx - drawW / 2, cy - drawH / 2, drawW, drawH);
        }
      }
    }

    function drawPixelsIn(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) {
      ctx.clearRect(0, 0, w, h);
      const cellW = Math.ceil(w / PIXEL_COLS);
      const cellH = Math.ceil(h / PIXEL_ROWS);

      for (let row = 0; row < PIXEL_ROWS; row++) {
        for (let col = 0; col < PIXEL_COLS; col++) {
          // Reverse stagger: bottom-right disappears first
          const dist =
            ((PIXEL_COLS - 1 - col) / PIXEL_COLS +
              (PIXEL_ROWS - 1 - row) / PIXEL_ROWS) /
            2;
          const cellProgress = Math.max(
            0,
            Math.min(1, (progress - dist * 0.6) / 0.4)
          );

          const scale = 1 - easeOutCubic(cellProgress);
          if (scale <= 0) continue;

          const cx = col * cellW + cellW / 2;
          const cy = row * cellH + cellH / 2;
          const drawW = cellW * scale + 2;
          const drawH = cellH * scale + 2;

          ctx.fillStyle = BB_DEEP;
          ctx.fillRect(cx - drawW / 2, cy - drawH / 2, drawW, drawH);
        }
      }
    }

    /* ── Easing ── */
    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /* ── Run an animation loop ── */
    function runAnimation(
      direction: "out" | "in",
      mode: TransitionMode,
      onComplete: () => void
    ) {
      cancelAnim();
      setVisible(true);
      resizeCanvas();

      const c = canvasRef.current;
      if (!c) {
        onComplete();
        return;
      }
      const ctx = c.getContext("2d");
      if (!ctx) {
        onComplete();
        return;
      }

      // Reduced motion: instant cover/reveal
      if (prefersReducedMotion()) {
        if (direction === "out") {
          drawSolid(ctx, c.width, c.height);
        } else {
          ctx.clearRect(0, 0, c.width, c.height);
          setVisible(false);
        }
        onComplete();
        return;
      }

      const duration = DURATION_MS;
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start!;
        const rawProgress = Math.min(elapsed / duration, 1);
        const progress = easeInOutCubic(rawProgress);

        const w = c!.width;
        const h = c!.height;

        if (direction === "out") {
          switch (mode) {
            case "linear":
              drawLinearOut(ctx!, w, h, progress);
              break;
            case "arrow":
              drawArrowOut(ctx!, w, h, progress);
              break;
            case "pixels":
              drawPixelsOut(ctx!, w, h, progress);
              break;
          }
        } else {
          switch (mode) {
            case "linear":
              drawLinearIn(ctx!, w, h, progress);
              break;
            case "arrow":
              drawArrowIn(ctx!, w, h, progress);
              break;
            case "pixels":
              drawPixelsIn(ctx!, w, h, progress);
              break;
          }
        }

        if (rawProgress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = 0;
          if (direction === "in") {
            ctx!.clearRect(0, 0, w, h);
            setVisible(false);
          }
          onComplete();
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    /* ── Expose imperative API ── */
    useImperativeHandle(ref, () => ({
      animateOut({ mode, onMidpoint }) {
        runAnimation("out", mode, onMidpoint);
      },
      animateIn({ mode, onDone }) {
        runAnimation("in", mode, onDone);
      },
      instantCover() {
        cancelAnim();
        setVisible(true);
        resizeCanvas();
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        drawSolid(ctx, c.width, c.height);
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 99999,
          display: visible ? "block" : "none",
        }}
      />
    );
  }
);

export default TransitionOverlay;
