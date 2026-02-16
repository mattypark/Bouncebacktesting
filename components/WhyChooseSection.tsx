export default function WhyChooseSection() {
  return (
    <section className="w-full bg-bb-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <h2 className="text-center text-3xl font-bold text-black md:text-4xl">
          Why choose Bounce Back?
        </h2>
        <p className="mx-auto mb-16 mt-3 max-w-[520px] text-center text-base text-black/70 md:text-lg">
          Bounceback is the most advanced recycled pickleball.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 — 100% Recycled */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#65BE44"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            <p className="text-base font-bold text-black md:text-lg">
              100% Recycled
            </p>
          </div>

          {/* Card 2 — 1:1 feel and performance */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center">
              <span className="text-4xl font-bold text-bb-mid">=</span>
            </div>
            <p className="text-base font-bold text-black md:text-lg">
              1:1 feel and performance
            </p>
          </div>

          {/* Card 3 — Cost Effective */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#65BE44"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <p className="text-base font-bold text-black md:text-lg">
              Cost Effective
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
