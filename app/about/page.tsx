"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import NavBar from "@/components/NavBar";

/* ───────────────────────────────────────────── */
/*  Stagger wrapper — fades children in on view  */
/* ───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────────────────────────── */
/*  Values data                                  */
/* ───────────────────────────────────────────── */
const values = [
  {
    number: "01",
    title: "Sustainability First",
    body: "Every ball we make is 100% recycled. We built BounceBack on the belief that the industry deserves a real solution to its waste problem, and we're transparent about every step of how we deliver it – from collection to court.",
  },
  {
    number: "02",
    title: "Player-Grade Performance",
    body: "Recycled doesn't mean compromised. The BB-1 is built to meet the same bounce, weight, and durability standards as the top balls on the market. Sustainability only wins if the product can stand on its own.",
  },
  {
    number: "03",
    title: "Community Driven",
    body: "From our recycling bin program to partnerships with courts and clubs, BounceBack is built on the energy of players who care about the sport and the planet.",
  },
];

const milestones = [
  { year: "Jan 2025", text: "The idea for BounceBack comes to life — a mission to recycle every cracked pickleball instead of sending it to landfill." },
  { year: "Mar 2025", text: "First BounceBack recycling bin placed at a local facility, kicking off the collection program." },
  { year: "Jul 2025", text: "Recycling network expands across Southwest Florida. Partnered with the RePickle Project to collect balls in 7 additional states." },
  { year: "Oct 2025", text: "Prototype manufacturing begins — turning recycled pickleball material into the BB-1." },
  { year: "Nov 2025", text: "BounceBack goes viral, gaining millions of views across social media and building massive hype for the mission." },
  { year: "Dec 2025", text: "Los Angeles expansion explored, bringing BounceBack's recycling program to the West Coast." },
  { year: "Jan 2026", text: "Prototypes return for testing. BounceBack featured on ABC7 and The Observer, bringing national attention to the mission." },
  { year: "Feb 2026", text: "BB-1 quality confirmed — prototypes pass rigorous performance testing. Featured in WGCU and ABC Gulf Coast." },
  { year: "Mar 2026", text: "Exploring U.S. manufacturing partners for full-scale BB-1 production." },
  { year: "Apr 2026", text: "Nationwide recycling program launches — every court, every club, every cracked ball gets a second life." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-bb-cream text-bb-deep overflow-x-hidden">
      <NavBar variant="dark" />

      {/* ═══════════════════════════════════════════ */}
      {/*  HERO — Full-width parallax intro          */}
      {/* ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden"
      >
        {/* Giant background text */}
        <motion.h1
          style={{ y: heroY, opacity: heroOpacity }}
          className="pointer-events-none absolute select-none font-black leading-none text-bb-deep/[0.04] whitespace-nowrap"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <span
            style={{
              fontSize: "clamp(5rem, 28vw, 42rem)",
              letterSpacing: "-0.04em",
            }}
          >
            ABOUT
          </span>
        </motion.h1>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-bb-deep md:text-6xl lg:text-7xl"
          >
            Our story
            <br />
            <span
              className="italic font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              to change the planet.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-bb-deep/55 md:text-lg"
          >
            BounceBack is on a mission to eliminate pickleball waste. The world&apos;s first closed-loop
            pickleball recycling company, keeping the sport we love sustainable without a sacrifice in performance.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] text-bb-deep/30 uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-[1px] bg-bb-deep/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  FOUNDER — Dillon Rosenthal                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full bg-bb-deep py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-bb-mid/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-bb-lime/8 blur-[100px]" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 md:flex-row md:items-start md:gap-20 lg:px-16">
          {/* Photo */}
          <Reveal className="relative shrink-0" delay={0.1}>
            <div className="relative">
              {/* Lime accent frame offset behind photo */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-bb-lime/30" />
              <div className="relative h-[380px] w-[300px] overflow-hidden rounded-2xl bg-bb-cream/10 md:h-[480px] md:w-[360px]">
                <Image
                  src="/dillon.png"
                  alt="Dillon Rosenthal — Founder of BounceBack"
                  width={360}
                  height={480}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-4 rounded-full bg-bb-lime px-5 py-2.5 shadow-lg md:-left-8"
              >
                <span className="text-xs font-bold tracking-[0.12em] text-bb-deep uppercase">
                  Founder & CEO
                </span>
              </motion.div>
            </div>
          </Reveal>

          {/* Bio text */}
          <div className="flex flex-1 flex-col justify-center text-left">
            <Reveal delay={0.15}>
              <p
                className="text-sm font-light tracking-[0.2em] text-bb-lime/50 uppercase"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Meet the Founder
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <h3 className="mt-4 text-4xl font-bold text-bb-cream md:text-5xl lg:text-6xl">
                Dillon
                <br />
                <span className="text-bb-lime">Rosenthal</span>
              </h3>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-6 h-[2px] w-16 bg-bb-lime/40" />
            </Reveal>

            <Reveal delay={0.4}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-bb-cream/60 md:text-lg">
                As an avid pickleball player, Dillon saw firsthand the staggering amount of
                plastic waste the sport generates. Cracked balls tossed after every session with
                no end of life solution.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-bb-cream/60 md:text-lg">
                That concern turned into a question worth solving:{" "}
                <span className="font-semibold text-bb-lime/90 italic">
                  &quot;What if we could turn every discarded pickleball into a brand-new one?&quot;
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-bb-cream/60 md:text-lg">
                As an entrepreneurship student with a love for startups and an obsession with
                product quality, Dillon set out to prove that recycled can mean elite.
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-bb-cream/60 md:text-lg">
                Today, BounceBack is actively building the first closed-loop recycling system for
                pickleballs, collecting, processing, and remanufacturing balls that play just
                as well as anything on the market, while cleaning up our game.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  VALUES — Three pillars                    */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-cream py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-6xl px-8 lg:px-16">
          <Reveal>
            <p
              className="text-sm font-light tracking-[0.2em] text-bb-deep/40 uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              What We Stand For
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-4 text-3xl font-bold text-bb-deep md:text-5xl">
              Our Values
            </h3>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-0 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.number} delay={0.1 + i * 0.12}>
                <div className="group relative border-t border-bb-deep/10 py-10 pr-8 md:border-l md:border-t-0 md:py-0 md:pl-8 md:pr-6 first:md:border-l-0 first:md:pl-0">
                  {/* Hover accent line */}
                  <div className="absolute left-0 top-0 h-[2px] w-0 bg-bb-lime transition-all duration-500 group-hover:w-full md:h-full md:w-[2px] md:group-hover:h-full md:group-hover:w-[2px]" />
                  <span className="text-5xl font-black text-bb-lime/30">{v.number}</span>
                  <h4 className="mt-4 text-xl font-bold text-bb-deep">{v.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-bb-deep/50">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  TIMELINE — Journey so far                 */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full bg-bb-mint/40 py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="mx-auto max-w-4xl px-8 lg:px-16">
          <Reveal>
            <p
              className="text-sm font-light tracking-[0.2em] text-bb-deep/40 uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              The Journey
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-4 text-3xl font-bold text-bb-deep md:text-5xl">
              Our Timeline
            </h3>
          </Reveal>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-bb-deep/10 md:left-[23px]" />

            {milestones.map((m, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1} className="relative mb-12 last:mb-0 pl-14 md:pl-16">
                {/* Dot */}
                <div className="absolute left-[12px] top-[6px] h-[16px] w-[16px] rounded-full border-[3px] border-bb-deep bg-bb-cream md:left-[16px] md:h-[16px] md:w-[16px]" />
                <span className="text-xs font-bold tracking-[0.15em] text-bb-mid uppercase">
                  {m.year}
                </span>
                <p className="mt-1 text-base leading-relaxed text-bb-deep/70 md:text-lg">
                  {m.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  CTA — Join the movement                   */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        {/* Gradient background matching hero-gradient style */}
        <div className="hero-gradient absolute inset-0 opacity-90" />

        {/* Scattered pickleball images */}
        <motion.div
          className="pointer-events-none absolute z-[1] w-[60px] md:w-[90px]"
          style={{ top: "12%", left: "6%" }}
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/bb1-ball.png" alt="" aria-hidden width={90} height={90} className="w-full h-auto opacity-35" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute z-[1] w-[35px] md:w-[55px]"
          style={{ top: "28%", right: "10%" }}
          animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image src="/bb1-ball.png" alt="" aria-hidden width={55} height={55} className="w-full h-auto opacity-30" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute z-[1] w-[75px] md:w-[110px]"
          style={{ bottom: "15%", right: "5%" }}
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/bb1-ball.png" alt="" aria-hidden width={110} height={110} className="w-full h-auto opacity-30" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute z-[1] w-[45px] md:w-[65px]"
          style={{ bottom: "22%", left: "8%" }}
          animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Image src="/bb1-ball.png" alt="" aria-hidden width={65} height={65} className="w-full h-auto opacity-25" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute z-[1] w-[28px] md:w-[40px]"
          style={{ top: "55%", left: "18%" }}
          animate={{ y: [0, -7, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src="/bb1-ball.png" alt="" aria-hidden width={40} height={40} className="w-full h-auto opacity-25" />
        </motion.div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-8 py-24 text-center md:py-32">
          <Reveal>
            <h3 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              Ready to play different?
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              Join thousands of players choosing performance and sustainability.
              The future of pickleball starts with you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/#waitlist"
                className="bg-bb-lime px-10 py-4 text-sm font-semibold tracking-[0.15em] text-bb-deep transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                JOIN THE WAITLIST
              </a>
              <a
                href="/bb-1"
                className="border-2 border-white/40 px-10 py-4 text-sm font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                VIEW THE BB-1
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  FOOTER                                    */}
      {/* ═══════════════════════════════════════════ */}
      <footer className="border-t border-bb-deep/10 bg-bb-cream px-10 py-8 md:px-12 lg:px-16">
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
