export default function WaitlistSection() {
  return (
    <section className="relative w-full overflow-hidden bg-bb-cream pt-24 pb-40 md:pt-36 md:pb-56 lg:pt-52 lg:pb-80">
      {/* ── Decorative lime circles ── */}

      {/* Small circle — left of heading */}
      <div
        className="pointer-events-none absolute left-[12%] top-[18%] h-7 w-7 rounded-full bg-bb-lime
                   md:left-[16%] md:top-[22%] md:h-9 md:w-9
                   lg:left-[22%] lg:top-[25%] lg:h-[44px] lg:w-[44px]"
      />

      {/* Medium circle — top right */}
      <div
        className="pointer-events-none absolute right-[4%] top-[4%] h-12 w-12 rounded-full bg-bb-lime
                   md:right-[8%] md:top-[6%] md:h-[72px] md:w-[72px]
                   lg:right-[12%] lg:top-[8%] lg:h-[100px] lg:w-[100px]"
      />

      {/* Large circle — bottom left (overflows) */}
      <div
        className="pointer-events-none absolute -bottom-[50px] -left-[30px] h-[160px] w-[160px] rounded-full bg-bb-lime
                   md:-bottom-[70px] md:-left-[40px] md:h-[240px] md:w-[240px]
                   lg:-bottom-[80px] lg:-left-[50px] lg:h-[300px] lg:w-[300px]"
      />

      {/* Medium circle — bottom right */}
      <div
        className="pointer-events-none absolute bottom-[16%] right-[4%] h-10 w-10 rounded-full bg-bb-lime
                   md:bottom-[20%] md:right-[8%] md:h-[64px] md:w-[64px]
                   lg:bottom-[24%] lg:right-[12%] lg:h-[90px] lg:w-[90px]"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-[64px] lg:leading-[1.1]">
          Join our waitlist
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-black/50 md:mt-6 md:text-base lg:text-lg">
          We&apos;re changing the environment. Join the waitlist to get a
          recycled pickleball in your hands.
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
