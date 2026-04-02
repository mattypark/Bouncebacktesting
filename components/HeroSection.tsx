"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "./CartIcon";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Buy Balls", href: "/bb-1" },
  { name: "Order a Bin", href: "/request-bin" },
  { name: "Bin Locations", href: "/locations" },
  { name: "Account", href: "/account" },
];

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 48px) 28px");
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const updateClipOrigin = useCallback(() => {
    if (hamburgerRef.current) {
      const rect = hamburgerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setClipOrigin(`${x}px ${y}px`);
    }
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsPastHero(window.scrollY > window.innerHeight * 0.85);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero-gradient relative h-screen w-full overflow-hidden">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-10 py-4 transition-colors duration-300 md:px-12 md:py-5 lg:px-16 lg:py-6">
        <a
          href="/"
          className="flex items-baseline text-xl transition-colors duration-300 md:text-2xl"
          style={{ zIndex: 60, color: isMenuOpen ? "#fff" : isPastHero ? "#084734" : "#fff" }}
        >
          <span className="font-bold tracking-tight">Bounce</span>
          <span className="font-light tracking-tight">Back</span>
        </a>


        {/* Cart + Hamburger */}
        <div className="flex items-center gap-5">
          <CartIcon color={isMenuOpen ? "#CEF17B" : "#084734"} />

          {/* Hamburger / X button */}
          <button
            ref={hamburgerRef}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              updateClipOrigin();
              setIsMenuOpen((prev) => !prev);
            }}
            className="relative z-[60] flex flex-col items-end gap-[5px]"
          >
            <motion.span
              className="block h-[2px] w-7 origin-center"
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 7, backgroundColor: "#CEF17B" }
                  : { rotate: 0, y: 0, backgroundColor: "#084734" }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block h-[2px] w-7 origin-center"
              animate={
                isMenuOpen
                  ? { opacity: 0, backgroundColor: "#CEF17B" }
                  : { opacity: 1, backgroundColor: "#084734" }
              }
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[2px] origin-center"
              style={{ width: isMenuOpen ? "1.75rem" : "1.25rem" }}
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -7, backgroundColor: "#CEF17B", width: "1.75rem" }
                  : { rotate: 0, y: 0, backgroundColor: "#084734", width: "1.25rem" }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </div>
      </nav>

      {/* ─── Circle Reveal Menu Overlay ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-bb-deep"
            initial={{ clipPath: `circle(0% at ${clipOrigin})` }}
            animate={{ clipPath: `circle(150% at ${clipOrigin})` }}
            exit={{ clipPath: `circle(0% at ${clipOrigin})` }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            {/* X close button — top right */}
            <div className="flex w-full justify-end px-10 py-4 md:px-12 md:py-5 lg:px-16 lg:py-6">
              <button
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="text-bb-lime/70 transition-colors duration-200 hover:text-bb-lime"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>

            {/* Menu content — links left, buttons right */}
            <div className="flex flex-1 items-center px-10 md:px-16 lg:px-24">
              {/* Links — left side */}
              <div className="flex flex-1 flex-col justify-center">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative inline-flex items-center gap-3 overflow-visible py-2 text-4xl font-light text-bb-lime/90 transition-colors duration-300 hover:text-bb-lime md:text-5xl md:gap-4 lg:text-6xl lg:gap-5"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                      <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-bb-lime after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100">
                        {link.name}
                      </span>
                      <span className="inline-block h-[10px] w-[10px] rounded-full bg-bb-lime opacity-0 scale-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:scale-100 md:h-[12px] md:w-[12px] lg:h-[14px] lg:w-[14px]" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Join the movement — right side, text link */}
              <motion.div
                className="hidden lg:flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                <a
                  href="#waitlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative text-sm font-semibold tracking-[0.15em] text-bb-lime/80 transition-colors duration-300 hover:text-bb-lime"
                >
                  <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-bb-lime after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100">
                    JOIN THE MOVEMENT
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Bottom section — divider + tagline + copyright */}
            <motion.div
              className="px-10 pb-8 md:px-16 lg:px-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="mb-6 h-[1px] w-full bg-bb-lime/20" />
              <div className="flex items-end justify-between">
                <p className="text-sm text-bb-lime/40">
                  recycled pickleballs. built for players. designed for the planet.
                </p>
                <p className="text-sm text-bb-lime/40">
                  &copy; {new Date().getFullYear()} BounceBack
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          MOBILE LAYOUT (< md): absolute "stage" positioning
          Ball centered mid-hero, BB-1 label left of ball,
          text block bottom-left, BOUNCEBACK bottom-left.
          ═══════════════════════════════════════════ */}

      {/* Ball — large, centered horizontally, upper-mid vertically */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bb1-ball.png"
        alt="BB-1 Recycled Pickleball"
        className="animate-scale-in pointer-events-none absolute z-20 md:hidden"
        style={{
          width: "clamp(340px, 150vw, 500px)",
          height: "auto",
          left: "50%",
          top: "clamp(220px, 37vh, 360px)",
          transform: "translateX(-40%)",
        }}
      />

      {/* BB-1 ——— label — left side, aligned to ball mid-height */}
      <div
        className="animate-fade-in-up absolute z-30 hidden items-center gap-3 md:hidden"
        style={{
          left: "clamp(20px, 5vw, 40px)",
          top: "clamp(160px, 28vh, 280px)",
        }}
      >
        <h2 className="text-base font-medium text-white">BB-1</h2>
        <div className="animate-line-extend h-[1.5px] bg-white" style={{ width: "clamp(80px, 18vw, 160px)" }} />
      </div>

      {/* Text block — bottom-left anchored, above BOUNCEBACK */}
      <div
        className="animate-fade-in-up-delayed-1 absolute z-30 md:hidden"
        style={{
          left: "clamp(20px, 5vw, 40px)",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: "min(520px, 75vw)",
        }}
      >
        <h1 className="text-[clamp(2.2rem,8vw,3.5rem)] font-bold leading-[1.05] text-white">
          Saving the
          <br />
          World
        </h1>

        <p className="mt-3 text-xs leading-relaxed text-white/90" style={{ maxWidth: "min(340px, 70vw)" }}>
          Built for players. Designed for the planet.
          BounceBack is the first recycled pickleball with the same feel and
          performance as professional balls.
        </p>

        <div className="animate-fade-in-up-delayed-3 mt-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <a
              href="#waitlist"
              className="inline-block border-2 border-white px-5 py-2.5 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-bb-deep"
            >
              JOIN THE MOVEMENT
            </a>
            <a
              href="/request-bin"
              className="inline-block border-2 border-white px-5 py-2.5 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-bb-deep"
            >
              ORDER A BIN
            </a>
          </div>
          <a
            href="/bb-1"
            className="inline-block w-full bg-white py-2.5 text-center text-[10px] font-semibold tracking-[0.15em] text-bb-deep transition-all duration-300 hover:bg-bb-lime"
          >
            BUY BB-1
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP LAYOUT (>= md): original absolute overlay
          ═══════════════════════════════════════════ */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[6%] z-30 hidden md:block lg:left-[5%]">
        {/* BB-1 Label */}
        <div className="animate-fade-in-up flex items-center gap-4">
          <h2 className="text-3xl font-medium text-white lg:text-4xl xl:text-5xl">
            BB-1
          </h2>
          <div className="animate-line-extend h-[1.5px] w-24 bg-white lg:w-32" />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delayed-1 mt-6 text-6xl font-bold leading-[1.05] text-white lg:text-7xl xl:text-8xl">
          Saving the
          <br />
          World
        </h1>

        {/* Body text */}
        <p className="animate-fade-in-up-delayed-2 mt-6 max-w-[380px] text-sm leading-relaxed text-white/90 lg:text-base">
          Built for players. Designed for the planet
          <br />
          BounceBack is the first recycled pickleball with the same feel and
          performance as professional balls.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delayed-3 mt-7 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <a
              href="#waitlist"
              className="inline-block border-2 border-white px-8 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-bb-deep"
            >
              JOIN THE MOVEMENT
            </a>
            <a
              href="/request-bin"
              className="inline-block border-2 border-white px-8 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-bb-deep"
            >
              ORDER A BIN
            </a>
          </div>
          <a
            href="/bb-1"
            className="inline-block w-full bg-white py-3.5 text-center text-xs font-semibold tracking-[0.15em] text-bb-deep transition-all duration-300 hover:bg-bb-lime"
          >
            BUY BB-1
          </a>
        </div>
      </div>

      {/* ─── BB-1 Ball Image (desktop only) ─── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bb1-ball.png"
        alt="BB-1 Recycled Pickleball"
        className="animate-scale-in pointer-events-none absolute z-20 hidden md:block"
        style={{
          width: "clamp(450px, 55vw, 1300px)",
          height: "auto",
          right: "-5%",
          top: "50%",
          transform: "translateY(-45%)",
        }}
      />

      {/* ─── Right Social Bar — desktop only ─── */}
      <div className="animate-social-fade pointer-events-auto absolute top-[calc(50%+90px)] right-8 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 lg:flex xl:right-10">
        <div className="mb-3 h-10 w-[1px] bg-bb-mid/50" />

        <a
          href="https://www.instagram.com/bouncebackpickle/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-bb-mid text-bb-mid transition-colors duration-200 hover:bg-bb-mid/15"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </a>

        <div className="h-6 w-[1px] bg-bb-mid/50" />

        <a
          href="https://www.tiktok.com/@bouncebackpickle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-bb-mid text-bb-mid transition-colors duration-200 hover:bg-bb-mid/15"
        >
          <svg width="18" height="20" viewBox="0 0 16 18" fill="currentColor">
            <path d="M11.5 0h-2.3c0 2.7 0 5.4 0 8.1 0 1.5-.1 2.9-.8 4-1 1.5-3 2-4.5 1.3-1.6-.7-2.4-2.6-1.8-4.3.6-1.6 2.3-2.6 4-2.2V4.5C2.7 4.2-.2 7 0 10.5c.2 3 2.8 5.5 5.8 5.5 3.2 0 5.8-2.6 5.8-5.8V5.1c1.2.8 2.6 1.3 4 1.3V4.1c-2.3 0-4.1-1.8-4.1-4.1z" />
          </svg>
        </a>

        <div className="h-6 w-[1px] bg-bb-mid/50" />

        <a
          href="https://www.linkedin.com/company/bounceback-pickle/?viewAsMember=true"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-bb-mid text-bb-mid transition-colors duration-200 hover:bg-bb-mid/15"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        <div className="mt-3 h-10 w-[1px] bg-bb-mid/50" />
      </div>
    </section>
  );
}
