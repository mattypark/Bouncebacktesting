"use client";

import { useState, useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";

const balls = [
  {
    id: "rbin-ball-sm-left",
    base: "left-[12%] top-[18%] h-7 w-7 md:left-[16%] md:top-[22%] md:h-9 md:w-9 lg:left-[22%] lg:top-[25%] lg:h-[44px] lg:w-[44px]",
    drift: { x: 30, y: 40, rotate: 15 },
    duration: 7,
  },
  {
    id: "rbin-ball-md-tr",
    base: "right-[4%] top-[4%] h-12 w-12 md:right-[8%] md:top-[6%] md:h-[72px] md:w-[72px] lg:right-[12%] lg:top-[8%] lg:h-[100px] lg:w-[100px]",
    drift: { x: -36, y: 32, rotate: -10 },
    duration: 9,
  },
  {
    id: "rbin-ball-lg-bl",
    base: "-bottom-[50px] -left-[30px] h-[160px] w-[160px] md:-bottom-[70px] md:-left-[40px] md:h-[240px] md:w-[240px] lg:-bottom-[80px] lg:-left-[50px] lg:h-[300px] lg:w-[300px]",
    drift: { x: 28, y: -24, rotate: 8 },
    duration: 11,
  },
  {
    id: "rbin-ball-md-br",
    base: "bottom-[16%] right-[4%] h-10 w-10 md:bottom-[20%] md:right-[8%] md:h-[64px] md:w-[64px] lg:bottom-[24%] lg:right-[12%] lg:h-[90px] lg:w-[90px]",
    drift: { x: -34, y: -30, rotate: -12 },
    duration: 8,
  },
];

function buildKeyframes() {
  return balls
    .map(
      (b) => `
@keyframes ${b.id} {
  0%, 100% { transform: translate(0px, 0px); }
  25% { transform: translate(${b.drift.x}px, ${b.drift.y * 0.6}px); }
  50% { transform: translate(${b.drift.x * 0.4}px, ${b.drift.y}px); }
  75% { transform: translate(${-b.drift.x * 0.5}px, ${b.drift.y * 0.3}px); }
}`
    )
    .join("\n");
}

export default function RequestBinPage() {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  useEffect(() => {
    if (styleRef.current) return;
    const style = document.createElement("style");
    style.textContent = buildKeyframes();
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      style.remove();
      styleRef.current = null;
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to backend / form service
    alert("Request submitted! We'll be in touch soon.");
  }

  return (
    <div className="min-h-screen bg-bb-cream">
      <NavBar variant="dark" />

      {/* ─── Hero / Form Section ─── */}
      <section className="relative w-full overflow-hidden pt-12 pb-40 md:pt-20 md:pb-56 lg:pt-28 lg:pb-80">
        {/* Floating decorative lime circles */}
        {balls.map((b) => (
          <div
            key={b.id}
            className={`pointer-events-none absolute rounded-full bg-bb-lime ${b.base}`}
            style={{
              animation: `${b.id} ${b.duration}s ease-in-out infinite`,
              willChange: "transform",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-[64px] lg:leading-[1.1]">
            
Order a BounceBack Bin For Your Facility

          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-black/50 md:mt-10 md:text-base lg:text-lg">Fill out this information to hear the next steps in ordering your <span className="font-bold">BounceBack Recycling Bin</span> and learn about earning your <span className="font-bold">Sustainable Facility Accreditation</span></p>

          {/* ─── Form ─── */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-[560px] space-y-5 text-left md:mt-14"
          >
            {/* Name */}
            <div className="relative">
              <span className="absolute -top-3 left-4 z-10 bg-bb-cream px-1.5 text-xs font-medium text-bb-mid">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-xl bg-bb-deep px-6 py-4 text-sm text-white outline-none placeholder:text-white/30 md:py-5 md:text-base"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute -top-3 left-4 z-10 bg-bb-cream px-1.5 text-xs font-medium text-bb-mid">
                Email Address
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full rounded-xl bg-bb-deep px-6 py-4 text-sm text-white outline-none placeholder:text-white/30 md:py-5 md:text-base"
              />
            </div>

            {/* Organization */}
            <div className="relative">
              <span className="absolute -top-3 left-4 z-10 bg-bb-cream px-1.5 text-xs font-medium text-bb-mid">
                Organization / Club
              </span>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Club name, facility, or organization"
                className="w-full rounded-xl bg-bb-deep px-6 py-4 text-sm text-white outline-none placeholder:text-white/30 md:py-5 md:text-base"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <span className="absolute -top-3 left-4 z-10 bg-bb-cream px-1.5 text-xs font-medium text-bb-mid">
                Message (optional)
              </span>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave a message for us..."
                className="w-full resize-none rounded-xl bg-bb-deep px-6 py-4 text-sm text-white outline-none placeholder:text-white/30 md:py-5 md:text-base"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-bb-lime px-10 py-4 text-sm font-semibold text-bb-deep transition-colors hover:bg-bb-mint md:py-5 md:text-base"
            >
              Recieve Next Steps
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-10 py-8 md:px-12 lg:px-16">
        <div className="flex items-end justify-between">
          <p className="text-sm text-black/30">
            recycled pickleballs. built for players. designed for the planet.
          </p>
          <p className="text-sm text-black/30">
            &copy; {new Date().getFullYear()} BounceBack
          </p>
        </div>
      </footer>
    </div>
  );
}
