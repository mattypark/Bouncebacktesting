"use client";

import { useEffect, useRef, useState, useMemo } from "react";

/* ────────────────────────────────────────────
   Odometer-style digit roller
   Each digit column shows 0-9 stacked vertically
   and translates upward to reveal the target digit.
   ──────────────────────────────────────────── */

function DigitColumn({
  digit,
  animate,
  delay,
}: {
  digit: number;
  animate: boolean;
  delay: number;
}) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: "1em" }}>
      <span
        className="inline-flex flex-col"
        style={{
          transform: animate ? `translateY(-${digit * 10}%)` : "translateY(0%)",
          transition: animate
            ? `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
            : "none",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="block text-center leading-none"
            style={{ height: "1em" }}
            aria-hidden={n !== digit}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function CommaChar() {
  return (
    <span className="inline-block leading-none" style={{ height: "1em" }}>
      ,
    </span>
  );
}

/* Format target number into an array of { type, value } for rendering */
function getDigitParts(n: number): { type: "digit" | "comma"; value: number }[] {
  const formatted = n.toLocaleString("en-US");
  return formatted.split("").map((ch) =>
    ch === ","
      ? { type: "comma" as const, value: 0 }
      : { type: "digit" as const, value: parseInt(ch, 10) }
  );
}

export default function WasteStatSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const TARGET = 770000;
  const parts = useMemo(() => getDigitParts(TARGET), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Stagger delays: rightmost digits start first for a rolling feel
  const digitCount = parts.filter((p) => p.type === "digit").length;
  let digitIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center bg-bb-lime"
    >
      {/* ─── Content ─── */}
      <div className="mx-auto w-full max-w-[89rem] px-8 md:px-14 lg:px-20">
        {/* Label */}
        <p className="text-xl font-bold text-bb-deep md:text-2xl lg:text-3xl">
          Pickleball Creates
        </p>

        {/* Stat Number + Subtitle */}
        <div className="relative inline-block">
          <h2
            className="whitespace-nowrap font-bold leading-none tracking-tight text-bb-deep"
            style={{ fontSize: "clamp(7rem, 18vw, 22rem)" }}
            aria-label={TARGET.toLocaleString("en-US")}
          >
            {parts.map((part, i) => {
              if (part.type === "comma") {
                return <CommaChar key={`c-${i}`} />;
              }
              const idx = digitIndex++;
              // Stagger: leftmost digits animate last
              const delay = (digitCount - 1 - idx) * 0.07;
              return (
                <DigitColumn
                  key={`d-${i}`}
                  digit={part.value}
                  animate={hasStarted}
                  delay={delay}
                />
              );
            })}
          </h2>

          <p className="mt-2 text-right text-sm font-normal text-bb-deep md:text-base lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:text-lg">
            pounds of plastic waste every year.
          </p>
        </div>
      </div>
    </section>
  );
}
