"use client";

import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useCart } from "@/components/CartContext";

const videos = [
  "/videos/bb1-clip-1.mov",
  "/videos/bb1-clip-2.mov",
  "/videos/bb1-clip-3.mov",
  "/videos/bb1-clip-4.mov",
];

export default function BB1ProductPage() {
  const { addItem } = useCart();
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  /* Pause all except the active video, autoplay the active one */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeVideo) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeVideo]);

  const prev = () => setActiveVideo((i) => (i === 0 ? videos.length - 1 : i - 1));
  const next = () => setActiveVideo((i) => (i === videos.length - 1 ? 0 : i + 1));
  return (
    <div className="min-h-screen bg-bb-cream text-bb-deep">
      <NavBar variant="dark" />

      {/* ─── Breadcrumb ─── */}
      <div className="px-10 pt-2 pb-4 md:px-12 lg:px-16">
        <p className="text-sm text-bb-deep/40">
          <a href="/" className="transition-colors hover:text-bb-deep/60">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="transition-colors hover:text-bb-deep/60">Our Products</a>
          <span className="mx-2">/</span>
          <span className="text-bb-deep/70">BounceBack BB-1</span>
        </p>
      </div>

      {/* ─── Hero Section — Big text + product image ─── */}
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden">
        {/* Large background text */}
        <h1
          className="pointer-events-none absolute select-none font-black leading-none text-bb-deep/[0.06]"
          style={{
            fontSize: "clamp(18rem, 38vw, 52rem)",
            letterSpacing: "-0.04em",
          }}
        >
          BB-1
        </h1>

        {/* 3-ball stack — pack of 3 layout */}
        <div className="relative z-10 flex items-end justify-center">
          {/* Left ball — behind, lower-left */}
          <img
            src="/bb1-ball.png"
            alt="BounceBack BB-1"
            className="w-[280px] -mr-[160px] mb-0 drop-shadow-xl md:w-[380px] md:-mr-[215px] lg:w-[460px] lg:-mr-[340px]"
            style={{ transform: "translateY(15%)" }}
          />
          {/* Center ball — front, top */}
          <img
            src="/bb1-ball.png"
            alt="BounceBack BB-1"
            className="relative z-10 w-[320px] drop-shadow-2xl md:w-[440px] lg:w-[530px]"
            style={{ transform: "translateY(-8%)" }}
          />
          {/* Right ball — behind, lower-right */}
          <img
            src="/bb1-ball.png"
            alt="BounceBack BB-1"
            className="w-[280px] -ml-[160px] mb-0 drop-shadow-xl md:w-[380px] md:-ml-[215px] lg:w-[460px] lg:-ml-[340px]"
            style={{ transform: "translateY(15%)" }}
          />
        </div>
      </section>

      {/* ─── Product Info Section ─── */}
      <section className="mx-auto max-w-3xl px-10 py-16 text-center md:px-12 lg:px-16">
        <h2 className="text-2xl font-bold text-bb-deep md:text-3xl">
          Introducing the BounceBack BB-1
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-bb-deep/60">
          In its compact, lightweight, and durable body, the BounceBack BB-1
          delivers everything you need. Built from 100% recycled materials with
          the same feel, bounce, and performance as professional-grade
          pickleballs. Approved for competitive play — designed for the planet.
        </p>

        <button
          onClick={() =>
            addItem({
              id: "bb1-lime",
              name: "BounceBack BB-1",
              variant: "Lime",
              price: 9.99,
              image: "/bb1-ball.png",
            })
          }
          className="mt-8 inline-block border-2 border-bb-deep px-10 py-4 text-sm font-semibold tracking-[0.15em] text-bb-deep transition-all duration-300 hover:bg-bb-deep hover:text-bb-cream"
        >
          BUY NOW
        </button>
      </section>

      {/* ─── See the BB-1 In Action ─── */}
      <section className="w-full bg-bb-cream px-6 py-20 md:py-28 lg:py-32">
        <h2 className="text-center text-3xl font-bold tracking-tight text-bb-deep md:text-4xl lg:text-5xl">
          See the BB-1 In Action.
        </h2>

        <div className="relative mx-auto mt-12 flex items-center justify-center gap-6 md:mt-16 md:gap-10">
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous video"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bb-lime text-bb-deep transition-colors hover:bg-bb-mid md:h-12 md:w-12"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Phone-shaped video frame */}
          <div className="relative w-[240px] overflow-hidden rounded-2xl bg-black shadow-2xl md:w-[300px] lg:w-[340px]" style={{ aspectRatio: "9 / 16" }}>
            {videos.map((src, i) => (
              <video
                key={src}
                ref={(el) => { videoRefs.current[i] = el; }}
                src={src}
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: i === activeVideo ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next video"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bb-lime text-bb-deep transition-colors hover:bg-bb-mid md:h-12 md:w-12"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                i === activeVideo
                  ? "bg-bb-deep scale-110"
                  : "bg-bb-deep/20 hover:bg-bb-deep/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── Specs / Features Grid ─── */}
      <section className="mx-auto max-w-5xl px-10 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border-t border-bb-deep/10 pt-6">
            <h3 className="text-lg font-bold text-bb-deep">100% Recycled</h3>
            <p className="mt-2 text-sm leading-relaxed text-bb-deep/50">
              Made entirely from recycled plastic waste collected through our
              community bin program.
            </p>
          </div>
          <div className="border-t border-bb-deep/10 pt-6">
            <h3 className="text-lg font-bold text-bb-deep">Pro-Level Performance</h3>
            <p className="mt-2 text-sm leading-relaxed text-bb-deep/50">
              Same bounce, weight, and durability as leading professional
              pickleballs. USAPA approved specifications.
            </p>
          </div>
          <div className="border-t border-bb-deep/10 pt-6">
            <h3 className="text-lg font-bold text-bb-deep">40-Hole Design</h3>
            <p className="mt-2 text-sm leading-relaxed text-bb-deep/50">
              Precision-drilled outdoor pattern for consistent flight and
              optimal wind resistance.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-bb-deep/10 px-10 py-8 md:px-12 lg:px-16">
        <div className="flex items-end justify-between">
          <p className="text-sm text-bb-deep/30">
            recycled pickleballs. built for players. designed for the planet.
          </p>
          <p className="text-sm text-bb-deep/30">
            &copy; {new Date().getFullYear()} BounceBack
          </p>
        </div>
      </footer>
    </div>
  );
}
