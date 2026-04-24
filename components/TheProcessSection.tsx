"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    number: "1",
    title: "Collect",
    body: "Cracked pickleballs are collected in BounceBack bins and shipped out for reprocessing before they ever reach a landfill.",
    video: "/process1.mp4",
  },
  {
    number: "2",
    title: "Grind",
    body: "Collected balls are broken down into raw material.",
    video: "/process2.mp4",
  },
  {
    number: "3",
    title: "Remold",
    body: "That material is remolded into new pickleballs, retaining the same feel & same bounce.",
    video: "/process3.mp4",
  },
];

export default function TheProcessSection() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const lockUntilRef = useRef<number>(0);

  // Play/pause videos when active changes
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  // Scroll-driven active step
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    let rafId = 0;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const update = () => {
      ticking = false;
      // Skip pinning on narrow viewports — click navigation handles it
      if (window.innerWidth <= 860) return;
      // Skip if user recently clicked a step
      if (Date.now() < lockUntilRef.current) return;

      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;

      const p = clamp01(-rect.top / total);

      let next = 0;
      if (p >= 2 / 3) next = 2;
      else if (p >= 1 / 3) next = 1;

      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleJump = (i: number) => {
    lockUntilRef.current = Date.now() + 600;
    setActive(i);
  };

  // Arrow vertical offset maps to active index (0 → top numeral, 2 → bottom)
  const arrowOffset = `${active * 100}%`;

  return (
    <section className="process-section relative w-full bg-bb-cream">
      <div className="process-track" ref={trackRef}>
        <div className="process-sticky">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <h2 className="process-heading">The process?</h2>

            <div className="process-grid">
              {/* Left: phone-frame video */}
              <div className="process-left">
                <div className="process-phone">
                  <div className="process-phone-screen">
                    {STEPS.map((step, i) => (
                      <video
                        key={i}
                        ref={(el) => {
                          videoRefs.current[i] = el;
                        }}
                        src={step.video}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        className="process-video"
                        style={{ opacity: active === i ? 1 : 0 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="process-dots">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to step ${i + 1}`}
                      onClick={() => handleJump(i)}
                      className={`process-dot${active === i ? " is-active" : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: numerals + arrow + copy */}
              <div className="process-right">
                <div className="process-numerals">
                  {STEPS.map((step, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleJump(i)}
                      className={`process-numeral${active === i ? " is-active" : ""}`}
                      aria-label={`Step ${step.number}: ${step.title}`}
                    >
                      {step.number}
                    </button>
                  ))}

                  <div
                    className="process-arrow"
                    style={{ transform: `translateY(${arrowOffset})` }}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 80 120"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M70 110 Q 70 60, 40 30 L 18 12" />
                      <polyline points="8,20 18,12 28,22" />
                    </svg>
                  </div>
                </div>

                <div className="process-copy">
                  {STEPS.map((step, i) => (
                    <div
                      key={i}
                      className={`process-copy-slide${active === i ? " is-active" : ""}`}
                      aria-hidden={active !== i}
                    >
                      <p className="process-copy-title">{step.title}</p>
                      <p className="process-copy-body">{step.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .process-track {
          height: 250vh;
          position: relative;
        }

        .process-sticky {
          position: sticky;
          top: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: clamp(4rem, 8vh, 8rem) 0;
        }

        .process-heading {
          text-align: center;
          font-size: clamp(28px, 4.5vw, 56px);
          font-weight: 700;
          color: #0a0a0a;
          margin-bottom: clamp(2.5rem, 6vh, 5rem);
          letter-spacing: -0.02em;
        }

        .process-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        /* Left — phone */
        .process-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .process-phone {
          width: min(100%, 360px);
          aspect-ratio: 9 / 16;
          border: 6px solid #0a0a0a;
          border-radius: 32px;
          padding: 4px;
          background: #0a0a0a;
          box-shadow: 0 40px 80px -40px rgba(10, 10, 10, 0.35);
        }

        .process-phone-screen {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: #e5fccd;
        }

        .process-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 500ms ease-in-out;
        }

        .process-dots {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          justify-content: center;
        }

        .process-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(8, 71, 52, 0.3);
          background: transparent;
          transition: all 300ms ease;
          cursor: pointer;
        }

        .process-dot:hover {
          border-color: rgba(8, 71, 52, 0.6);
        }

        .process-dot.is-active {
          background: #084734;
          border-color: #084734;
          transform: scale(1.1);
        }

        /* Right — numerals + arrow + copy */
        .process-right {
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vh, 3rem);
          width: 100%;
        }

        .process-numerals {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: clamp(0.25rem, 1vh, 0.75rem);
          padding-right: clamp(60px, 8vw, 110px);
          align-items: flex-start;
        }

        .process-numeral {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          font-family: inherit;
          font-size: clamp(96px, 12vw, 180px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.05em;
          color: rgba(8, 71, 52, 0.22);
          transition: color 0.6s ease;
          text-align: left;
        }

        .process-numeral.is-active {
          color: #084734;
        }

        .process-arrow {
          position: absolute;
          right: 0;
          top: 0;
          width: clamp(52px, 6vw, 84px);
          height: clamp(96px, 12vw, 180px);
          color: #084734;
          transition: transform 0.8s cubic-bezier(0.65, 0, 0.2, 1);
          pointer-events: none;
        }

        .process-arrow :global(svg) {
          width: 100%;
          height: 100%;
        }

        .process-copy {
          position: relative;
          min-height: clamp(110px, 14vh, 160px);
          max-width: 520px;
        }

        .process-copy-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 0.5s ease,
            transform 0.5s ease;
          pointer-events: none;
        }

        .process-copy-slide.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .process-copy-title {
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 700;
          color: #084734;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .process-copy-body {
          font-size: clamp(15px, 1.1vw, 18px);
          line-height: 1.55;
          color: rgba(8, 71, 52, 0.75);
        }

        @media (max-width: 860px) {
          .process-track {
            height: auto;
          }
          .process-sticky {
            position: static;
            min-height: 0;
            padding: 4rem 0;
          }
          .process-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .process-numerals {
            padding-right: 80px;
            align-items: center;
          }
          .process-numeral {
            text-align: center;
          }
          .process-copy {
            margin: 0 auto;
            text-align: center;
            min-height: 140px;
          }
        }
      `}</style>
    </section>
  );
}
