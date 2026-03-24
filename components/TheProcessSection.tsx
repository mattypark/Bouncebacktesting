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

  return (
    <section className="w-full bg-bb-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <h2 className="mb-14 text-center text-3xl font-bold text-black md:mb-20 md:text-4xl lg:text-5xl">
          The process?
        </h2>

        {/*
          Two-column layout
          ─────────────────
          • Left : video with 9/16 aspect ratio — this sets the row height
          • Right: cards stretch to fill the same height (flex-1 on each card)

          To adjust positioning / size, change these values:
            ┌─ Video width ──────── md:w-[32%]  (increase = wider phone)
            ├─ Video aspect ratio ─ aspect-[9/16] (change to 3/5, 2/3, etc.)
            ├─ Cards width ──────── md:w-[62%]  (should roughly = 100% - video%)
            ├─ Cards gap ─────────── md:gap-5    (space between cards)
            └─ Column gap ────────── md:gap-14   (space between video & cards)
        */}
        <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:gap-14 lg:gap-16">
          {/* Left column — video with fixed 9/16 ratio */}
          <div className="mx-auto flex w-[65%] flex-col md:mx-0 md:w-[32%]">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-bb-mint">
              {STEPS.map((step, i) => (
                <video
                  key={i}
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={step.video}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex items-center justify-center gap-2.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "bg-bb-deep scale-110"
                      : "border border-bb-deep/30 bg-transparent hover:border-bb-deep/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right column — cards stretch evenly to match video height */}
          <div className="flex w-full flex-col gap-4 md:w-[62%] md:gap-5">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex-1 rounded-xl p-6 text-left transition-all duration-300 md:p-8 ${
                    isActive
                      ? "bg-bb-deep shadow-lg"
                      : "bg-bb-mint hover:bg-bb-mint/80"
                  }`}
                >
                  <p
                    className={`mb-2 text-base font-bold md:text-lg ${
                      isActive ? "text-white" : "text-bb-deep"
                    }`}
                  >
                    {step.number}. {step.title}
                  </p>
                  <p
                    className={`text-sm leading-relaxed md:text-base ${
                      isActive ? "text-white/80" : "text-bb-deep/70"
                    }`}
                  >
                    {step.body}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
