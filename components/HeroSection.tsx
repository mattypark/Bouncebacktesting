"use client";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative h-screen w-full overflow-hidden">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-10 py-4 md:px-12 md:py-5 lg:px-16 lg:py-6">
        <a href="/" className="flex items-baseline text-xl text-white md:text-2xl">
          <span className="font-bold tracking-tight">Bounce</span>
          <span className="font-light tracking-tight">Back</span>
        </a>

        <div className="hidden items-center gap-14 md:flex lg:gap-20">
          <a
            href="/"
            className="text-[15px] text-white transition-opacity duration-200 hover:opacity-80"
          >
            Home
          </a>
          <a
            href="/shop"
            className="text-[15px] text-white transition-opacity duration-200 hover:opacity-80"
          >
            Shop
          </a>
          <a
            href="/about"
            className="text-[15px] text-white transition-opacity duration-200 hover:opacity-80"
          >
            About
          </a>
        </div>

        <button
          aria-label="Open menu"
          className="flex flex-col items-end gap-[5px]"
        >
          <span className="block h-[2px] w-7 bg-white" />
          <span className="block h-[2px] w-7 bg-white" />
          <span className="block h-[2px] w-5 bg-white" />
        </button>
      </nav>

      {/* ─── Left Content Block (BB-1 + Headline + Body + CTA) ─── */}
      <div className="absolute top-[16%] left-[5%] z-30 md:left-[6%] lg:left-[5%]">
        {/* BB-1 Label */}
        <div className="animate-fade-in-up flex items-center gap-4">
          <h2 className="text-2xl font-medium text-white md:text-3xl lg:text-4xl xl:text-5xl">
            BB-1
          </h2>
          <div className="animate-line-extend h-[1.5px] bg-white" />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delayed-1 mt-4 text-5xl font-bold leading-[1.05] text-white md:mt-6 md:text-6xl lg:text-7xl xl:text-8xl">
          Saving the
          <br />
          World
        </h1>

        {/* Body text */}
        <p className="animate-fade-in-up-delayed-2 mt-6 max-w-[380px] text-sm leading-relaxed text-white/90 md:text-base">
          Built for players. Designed for the planet
          <br />
          BounceBack is the first recycled pickleball with the same feel and
          performance as professional balls.
        </p>

        {/* CTA Button */}
        <a
          href="/shop"
          className="animate-fade-in-up-delayed-3 mt-7 inline-block border-2 border-white px-8 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-bb-deep"
        >
          JOIN THE MOVEMENT
        </a>
      </div>

      {/* ─── Green Circle ─── */}
      <div
        className="animate-scale-in pointer-events-none absolute z-20 aspect-square rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 38%, #9BE070, #7CCB55 60%, #65BE44)",
          width: "clamp(320px, 35vw, 520px)",
          left: "54%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          opacity: 0.55,
          boxShadow:
            "0 0 120px 40px rgba(255, 255, 255, 0.12), 0 0 80px 20px rgba(206, 241, 123, 0.1)",
        }}
      />

      {/* ─── "Pickleball!" Bottom Text ─── */}
      <div className="animate-slide-in-bottom pointer-events-none absolute bottom-[5%] left-0 z-10 w-full">
        <p
          className="select-none text-center font-black leading-none text-white"
          style={{
            fontSize: "clamp(6rem, 14vw, 16rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Pickleball!
        </p>
      </div>

      {/* ─── Right Social Bar ─── */}
      <div className="animate-social-fade pointer-events-auto absolute top-[calc(50%+10px)] right-8 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 lg:flex xl:right-10">
        <div className="mb-3 h-10 w-[1px] bg-bb-mid/50" />

        <a
          href="https://www.instagram.com/bounceback.pickle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-bb-mid text-bb-mid transition-colors duration-200 hover:border-bb-mid hover:bg-bb-mid/15"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-bb-mid text-bb-mid transition-colors duration-200 hover:border-bb-mid hover:bg-bb-mid/15"
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 16 18"
            fill="currentColor"
          >
            <path d="M11.5 0h-2.3c0 2.7 0 5.4 0 8.1 0 1.5-.1 2.9-.8 4-1 1.5-3 2-4.5 1.3-1.6-.7-2.4-2.6-1.8-4.3.6-1.6 2.3-2.6 4-2.2V4.5C2.7 4.2-.2 7 0 10.5c.2 3 2.8 5.5 5.8 5.5 3.2 0 5.8-2.6 5.8-5.8V5.1c1.2.8 2.6 1.3 4 1.3V4.1c-2.3 0-4.1-1.8-4.1-4.1z" />
          </svg>
        </a>

        <div className="h-6 w-[1px] bg-bb-mid/50" />

        <a
          href="https://www.youtube.com/@BounceBackPickle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-bb-mid text-bb-mid transition-colors duration-200 hover:border-bb-mid hover:bg-bb-mid/15"
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 14"
            fill="currentColor"
          >
            <path d="M19.6 2.2c-.2-.8-.9-1.5-1.7-1.7C16.3 0 10 0 10 0S3.7 0 2.1.5c-.8.2-1.5.9-1.7 1.7C0 3.8 0 7 0 7s0 3.2.4 4.8c.2.8.9 1.5 1.7 1.7C3.7 14 10 14 10 14s6.3 0 7.9-.5c.8-.2 1.5-.9 1.7-1.7C20 10.2 20 7 20 7s0-3.2-.4-4.8zM8 10V4l5.2 3L8 10z" />
          </svg>
        </a>

        <div className="mt-3 h-10 w-[1px] bg-bb-mid/50" />
      </div>
    </section>
  );
}
