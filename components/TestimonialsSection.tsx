const TESTIMONIALS = [
  {
    name: "Rey Greenlaw (DUPR 5.4):",
    quote:
      "Balls played solid, definitely like a lifetime",
  },
  {
    name: "Tyler Calka (DUPR 3.4):",
    quote:
      "When the ball is bouncing on the court, it bounces like a normal (non-recycled) ball. The recoil on the paddle is exactly like a normal ball as well.",
  },
  {
    name: "Kyle:",
    quote: "I love the ball, it hasn\u2019t cracked on me yet!",
  },
  {
    name: "Rich Pekmezian:",
    quote:
      "The ball played well, consistently well for the 2 hour session. There were no comments made to me about the ball being different from any other ball.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-bb-deep py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <h2 className="mb-14 text-center text-3xl font-bold text-white md:mb-20 md:text-4xl lg:text-5xl">
          People talking about us
        </h2>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-white/30 px-8 py-10 text-center md:min-h-[260px] md:px-12"
            >
              <p className="mb-4 text-sm font-bold text-white md:text-base">
                {t.name}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-white/70 md:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
