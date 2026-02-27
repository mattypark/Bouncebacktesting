"use client";

import { useEffect, useRef } from "react";

/*
  Floating ball config — each ball gets its own drift path & speed.
  The animation is done with inline @keyframes injected once,
  then each ball references its own named animation.
*/

const balls = [
  {
    id: "ball-sm-left",
    base: "left-[12%] top-[18%] h-7 w-7 md:left-[16%] md:top-[22%] md:h-9 md:w-9 lg:left-[22%] lg:top-[25%] lg:h-[44px] lg:w-[44px]",
    drift: { x: 30, y: 40, rotate: 15 },
    duration: 7,
  },
  {
    id: "ball-md-tr",
    base: "right-[4%] top-[4%] h-12 w-12 md:right-[8%] md:top-[6%] md:h-[72px] md:w-[72px] lg:right-[12%] lg:top-[8%] lg:h-[100px] lg:w-[100px]",
    drift: { x: -36, y: 32, rotate: -10 },
    duration: 9,
  },
  {
    id: "ball-lg-bl",
    base: "-bottom-[50px] -left-[30px] h-[160px] w-[160px] md:-bottom-[70px] md:-left-[40px] md:h-[240px] md:w-[240px] lg:-bottom-[80px] lg:-left-[50px] lg:h-[300px] lg:w-[300px]",
    drift: { x: 28, y: -24, rotate: 8 },
    duration: 11,
  },
  {
    id: "ball-md-br",
    base: "bottom-[16%] right-[4%] h-10 w-10 md:bottom-[20%] md:right-[8%] md:h-[64px] md:w-[64px] lg:bottom-[24%] lg:right-[12%] lg:h-[90px] lg:w-[90px]",
    drift: { x: -34, y: -30, rotate: -12 },
    duration: 8,
  },
];

function buildKeyframes() {
  return balls
    .map(
      (b) => `
@keyframes ${b.id} {
  0%, 100% { transform: translate(0px, 0px); }
  25% { transform: translate(${b.drift.x}px, ${b.drift.y * 0.6}px); }
  50% { transform: translate(${b.drift.x * 0.4}px, ${b.drift.y}px); }
  75% { transform: translate(${-b.drift.x * 0.5}px, ${b.drift.y * 0.3}px); }
}`
    )
    .join("\n");
}

export default function WaitlistSection() {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (styleRef.current) return;
    const style = document.createElement("style");
    style.textContent = buildKeyframes();
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      style.remove();
      styleRef.current = null;
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-bb-cream pt-32 pb-64 md:pt-48 md:pb-80 lg:pt-64 lg:pb-[32rem]">
      {/* ── Floating decorative lime circles ── */}
      {balls.map((b) => (
        <div
          key={b.id}
          className={`pointer-events-none absolute rounded-full bg-bb-lime ${b.base}`}
          style={{
            animation: `${b.id} ${b.duration}s ease-in-out infinite`,
            willChange: "transform",
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-[64px] lg:leading-[1.1]">
          Join our waitlist
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-black/50 md:mt-6 md:text-base lg:text-lg">
          We&apos;re changing the environment. Join the waitlist be the first to hear about BounceBack's next steps.
        </p>

        {/* Email input bar */}
        <div className="relative mx-auto mt-10 max-w-[560px] md:mt-14">
          <span className="absolute -top-3 left-4 z-10 bg-bb-cream px-1.5 text-xs font-medium text-bb-mid">
            Email Address
          </span>

          <div className="flex items-stretch overflow-hidden rounded-xl">
            <div className="flex flex-1 items-center bg-bb-deep">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent px-6 py-4 text-sm text-white outline-none placeholder:text-white/30 md:py-5 md:text-base"
              />
            </div>
            <button
              type="button"
              className="shrink-0 bg-bb-lime px-10 py-4 text-sm font-semibold text-bb-deep transition-colors hover:bg-bb-mint md:px-14 md:py-5 md:text-base"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
