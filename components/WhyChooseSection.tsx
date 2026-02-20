export default function WhyChooseSection() {
  return (
    <section className="w-full bg-bb-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <h2 className="text-center text-3xl font-bold text-black md:text-4xl lg:text-5xl">
          Why choose Bounce Back?
        </h2>
        <p className="mx-auto mb-16 mt-4 max-w-[580px] text-center text-base text-black/70 md:text-lg">
          BounceBack is the most advanced recycled pickleball.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 — Efficient recycling */}
          <div className="rounded-xl border-2 border-bb-lime bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-bb-mint">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M7.5 7.5c.7-1.5 2.2-2.5 4-2.5a4.5 4.5 0 0 1 3.8 2.1" />
                <path d="M16.5 7l-1.2.2.2-1.2" />
                <path d="M16.5 16.5c-.7 1.5-2.2 2.5-4 2.5a4.5 4.5 0 0 1-3.8-2.1" />
                <path d="M7.5 17l1.2-.2-.2 1.2" />
                <path d="M5 12H3" />
                <path d="M21 12h-2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <p className="mb-2 text-base font-bold text-black md:text-lg">
              Efficient recycling.
            </p>
            <p className="text-sm leading-relaxed text-black/60 md:text-base">
              We use efficient materials and manufacturers in order to save the environment as much as we can.
            </p>
          </div>

          {/* Card 2 — 1-1 Same feel */}
          <div className="rounded-xl border-2 border-bb-lime bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-bb-mint">
              <span className="text-2xl font-bold text-black">=</span>
            </div>
            <p className="mb-2 text-base font-bold text-black md:text-lg">
              1-1 Same feel with pro Pickleballs.
            </p>
            <p className="text-sm leading-relaxed text-black/60 md:text-base">
              The way we manufactured the gives us the desired feel when buying a professional pickleball.
            </p>
          </div>

          {/* Card 3 — Cost Effective */}
          <div className="rounded-xl border-2 border-bb-lime bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-bb-mint">
              <span className="text-2xl font-bold text-black">$</span>
            </div>
            <p className="mb-2 text-base font-bold text-black md:text-lg">
              Cost Effective.
            </p>
            <p className="text-sm leading-relaxed text-black/60 md:text-base">
              We are 1.5x cheaper than all the pickle balls you see in the market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
