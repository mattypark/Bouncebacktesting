"use client";

import { useRef, useEffect } from "react";

export default function RecycledRevealSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  // Auto-play video when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Word-by-word scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const windowH = window.innerHeight;

      const start = windowH * 1.0;
      const end = windowH * 0.6;
      const sectionCenter = rect.top + rect.height / 2;
      const progress = 1 - (sectionCenter - end) / (start - end);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const words = wordsRef.current;
      const totalWords = words.length;

      words.forEach((word, i) => {
        if (!word) return;
        const wordStart = i / totalWords;
        const wordEnd = (i + 1) / totalWords;
        const wordProgress = (clampedProgress - wordStart) / (wordEnd - wordStart);
        const clampedWordProgress = Math.max(0, Math.min(1, wordProgress));
        const opacity = 0.15 + clampedWordProgress * 0.85;
        word.style.opacity = String(opacity);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headlineWords = "We created the First Ever Recycled Pickleball.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-bb-lime py-24 md:py-32 lg:py-40"
    >
      {/* Headline — single line, word-by-word scroll reveal */}
      <div className="mx-auto mb-16 px-8 md:mb-20 md:px-14 lg:px-20">
        <p className="whitespace-nowrap text-center text-3xl font-bold text-bb-deep md:text-5xl lg:text-6xl">
          {headlineWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className="inline-block transition-opacity duration-300 ease-out"
              style={{ opacity: 0.15, marginRight: "0.3em" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Video */}
      <div className="relative mx-auto w-[70%] max-w-[500px] md:w-[50%] lg:w-[40%]">
        <div className="relative overflow-hidden rounded-lg">
          <video
            ref={videoRef}
            src="/recycled-reveal.mov"
            muted
            playsInline
            loop
            preload="metadata"
            className="block w-full"
          />
        </div>
      </div>
    </section>
  );
}
