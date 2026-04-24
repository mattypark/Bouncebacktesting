"use client";

import { useEffect, useRef } from "react";

const WORDS = ["Play", "Life", "Impact"] as const;
const ACCENTS = ["#084734", "#65BE44", "#A83232"] as const; // bb-deep, bb-mid, bb-red

export default function PinScrollImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const activeStateRef = useRef<number>(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let rafId = 0;
    let ticking = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;

      const p = clamp01(-rect.top / total);

      // 3 thirds: [0, 1/3), [1/3, 2/3), [2/3, 1]
      let state = 0;
      if (p >= 2 / 3) state = 2;
      else if (p >= 1 / 3) state = 1;

      if (state !== activeStateRef.current) {
        activeStateRef.current = state;
        // Update word classes
        wordRefs.current.forEach((el, i) => {
          if (!el) return;
          el.classList.remove("is-active", "is-past");
          if (i < state) el.classList.add("is-past");
          else if (i === state) el.classList.add("is-active");
        });
        // Update accent + card state
        section.style.setProperty("--accent", ACCENTS[state]);
        if (cardRef.current) {
          cardRef.current.setAttribute("data-state", String(state));
        }
      }

      // Progress bars
      const thirds = [0, 1 / 3, 2 / 3, 1];
      for (let i = 0; i < 3; i++) {
        const bar = barRefs.current[i];
        if (!bar) continue;
        const fill = clamp01((p - thirds[i]) / (thirds[i + 1] - thirds[i]));
        bar.style.setProperty("--fill", String(fill));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    // Initial state
    section.style.setProperty("--accent", ACCENTS[0]);
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pin-impact-section relative w-full bg-bb-cream"
    >
      {/* Intro heading */}
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-32">
        <h2 className="text-center text-3xl font-bold tracking-tight text-bb-deep md:text-5xl lg:text-6xl">
          Welcome to a{" "}
          <em className="pin-impact-em not-italic font-bold">new era</em>{" "}
          of pickleball.
        </h2>
      </div>

      {/* Pin track */}
      <div ref={trackRef} className="pin-impact-track relative">
        <div className="pin-impact-sticky">
          {/* Left: word stack + bars */}
          <div className="pin-impact-left">
            <div className="pin-impact-phrase">
              <span className="pin-impact-prefix">More</span>
              <span className="pin-impact-words">
                {WORDS.map((w, i) => (
                  <span
                    key={w}
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className={`pin-word${i === 0 ? " is-active" : ""}`}
                  >
                    {w}
                  </span>
                ))}
              </span>
            </div>

            <div className="pin-impact-bars">
              {WORDS.map((w, i) => (
                <div
                  key={w}
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  className={`pin-bar pin-bar-${i}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>

          {/* Right: growing card + neighbor */}
          <div className="pin-impact-right">
            <div className="pin-impact-cards">
              <div className="pin-impact-card-wrap">
                <div
                  ref={cardRef}
                  className="pin-impact-card"
                  data-state="0"
                >
                  <div className="pin-impact-chip" aria-hidden>
                    <span className="pin-impact-chip-dot" />
                  </div>
                </div>
                <p className="pin-impact-label">BounceBack</p>
              </div>

              <div className="pin-impact-card-wrap">
                <div className="pin-impact-card-neighbor" aria-hidden>
                  <div className="pin-impact-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <p className="pin-impact-label pin-impact-label-muted">
                  Traditional Pickleballs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pin-impact-section {
          --accent: #084734;
        }

        .pin-impact-em {
          color: var(--accent);
          transition: color 0.9s ease;
        }

        .pin-impact-track {
          height: 340vh;
          position: relative;
        }

        .pin-impact-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 2rem;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          max-width: 1400px;
          margin: 0 auto;
        }

        .pin-impact-left {
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 5vw, 3.5rem);
        }

        .pin-impact-phrase {
          display: flex;
          align-items: baseline;
          gap: clamp(0.75rem, 2vw, 1.5rem);
          line-height: 1;
        }

        .pin-impact-prefix {
          font-size: clamp(26px, 4vw, 58px);
          font-weight: 700;
          color: #084734;
          letter-spacing: -0.02em;
        }

        .pin-impact-words {
          position: relative;
          display: inline-block;
          min-width: clamp(220px, 28vw, 440px);
          height: clamp(60px, 7.5vw, 112px);
        }

        .pin-word {
          position: absolute;
          inset: 0;
          display: inline-block;
          font-size: clamp(48px, 6.4vw, 96px);
          font-style: italic;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--accent);
          opacity: 0;
          transform: translateY(40px);
          filter: blur(8px);
          transition:
            opacity 0.7s cubic-bezier(0.65, 0, 0.2, 1),
            transform 0.7s cubic-bezier(0.65, 0, 0.2, 1),
            filter 0.7s cubic-bezier(0.65, 0, 0.2, 1),
            color 0.9s ease;
        }

        .pin-word.is-active {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .pin-word.is-past {
          opacity: 0;
          transform: translateY(-40px);
          filter: blur(8px);
        }

        .pin-impact-bars {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 360px;
        }

        .pin-bar {
          --fill: 0;
          position: relative;
          height: 2px;
          background: rgba(8, 71, 52, 0.12);
          border-radius: 999px;
          overflow: hidden;
        }

        .pin-bar::after {
          content: "";
          position: absolute;
          inset: 0;
          width: calc(var(--fill) * 100%);
          border-radius: 999px;
          transition: width 0.15s linear;
        }

        .pin-bar-0::after {
          background: #084734;
        }
        .pin-bar-1::after {
          background: #65be44;
        }
        .pin-bar-2::after {
          background: #a83232;
        }

        .pin-impact-right {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
        }

        .pin-impact-cards {
          display: flex;
          align-items: flex-end;
          gap: clamp(1rem, 2.5vw, 2.5rem);
        }

        .pin-impact-card-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .pin-impact-card {
          width: clamp(140px, 13vw, 190px);
          height: clamp(200px, 20vw, 260px);
          background: var(--accent);
          border-radius: clamp(20px, 2vw, 28px);
          position: relative;
          transition:
            height 1.1s cubic-bezier(0.65, 0, 0.2, 1),
            background 0.9s ease;
          box-shadow: 0 30px 60px -30px rgba(8, 71, 52, 0.35);
        }

        .pin-impact-card[data-state="1"] {
          height: clamp(300px, 30vw, 400px);
        }

        .pin-impact-card[data-state="2"] {
          height: clamp(420px, 44vw, 580px);
        }

        .pin-impact-chip {
          position: absolute;
          top: 16px;
          left: 16px;
          width: clamp(36px, 3vw, 46px);
          height: clamp(36px, 3vw, 46px);
          border-radius: 12px;
          background: #fbfff1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background 0.6s ease,
            color 0.6s ease;
        }

        .pin-impact-chip-dot {
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: var(--accent);
          transition: background 0.6s ease;
        }

        .pin-impact-card[data-state="2"] .pin-impact-chip {
          background: #0a0a0a;
        }
        .pin-impact-card[data-state="2"] .pin-impact-chip-dot {
          background: #fbfff1;
        }

        .pin-impact-label {
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 600;
          color: #084734;
          letter-spacing: -0.01em;
        }

        .pin-impact-label-muted {
          color: rgba(8, 71, 52, 0.55);
        }

        .pin-impact-card-neighbor {
          width: clamp(120px, 11vw, 160px);
          height: clamp(160px, 16vw, 220px);
          background: rgba(8, 71, 52, 0.06);
          border: 1px solid rgba(8, 71, 52, 0.1);
          border-radius: clamp(16px, 1.6vw, 22px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14%;
        }

        .pin-impact-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 8px;
        }

        .pin-impact-grid > span {
          background: rgba(8, 71, 52, 0.18);
          border-radius: 50%;
        }

        @media (max-width: 860px) {
          .pin-impact-track {
            height: 260vh;
          }
          .pin-impact-sticky {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2rem 1.5rem;
          }
          .pin-impact-left {
            align-items: center;
            text-align: center;
          }
          .pin-impact-phrase {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          .pin-impact-words {
            min-width: 0;
            width: 100%;
            text-align: center;
          }
          .pin-word {
            text-align: center;
          }
          .pin-impact-bars {
            margin: 0 auto;
            width: 80%;
          }
          .pin-impact-right {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
