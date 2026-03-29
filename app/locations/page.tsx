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
/*  Location data                                */
/* ───────────────────────────────────────────── */
// TODO: Replace with real bin locations once finalized
const locations = [
  {
    name: "Location 1",
    region: "Region TBD",
    description: "Bin location details coming soon.",
    address: "Address TBD",
    binCount: 1,
    status: "active" as const,
  },
  {
    name: "Location 2",
    region: "Region TBD",
    description: "Bin location details coming soon.",
    address: "Address TBD",
    binCount: 1,
    status: "active" as const,
  },
  {
    name: "Location 3",
    region: "Region TBD",
    description: "Bin location details coming soon.",
    address: "Address TBD",
    binCount: 1,
    status: "active" as const,
  },
];

/* ───────────────────────────────────────────── */
/*  Pin icon SVG                                 */
/* ───────────────────────────────────────────── */
function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ───────────────────────────────────────────── */
/*  Recycle icon SVG                             */
/* ───────────────────────────────────────────── */
function RecycleBinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}

export default function LocationsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const totalBins = locations.reduce((sum, loc) => sum + loc.binCount, 0);

  return (
    <div className="min-h-screen bg-bb-cream text-bb-deep overflow-x-hidden">
      <NavBar variant="dark" />

      {/* ═══════════════════════════════════════════ */}
      {/*  HERO                                      */}
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
            BINS
          </span>
        </motion.h1>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-bb-lime/20"
          >
            <PinIcon className="h-8 w-8 text-bb-deep" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-bb-deep md:text-6xl lg:text-7xl"
          >
            Find a Bin
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 max-w-xl text-base leading-relaxed text-bb-deep/55 md:text-lg"
          >
            Locate the nearest BounceBack recycling bin and give your cracked
            pickleballs a second life. Every ball dropped off is one less in a
            landfill.
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
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-8 w-[1px] bg-bb-deep/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  STATS BAR                                 */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-deep py-12 md:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 px-8 md:flex-row md:gap-16 lg:gap-24">
          <Reveal delay={0}>
            <div className="text-center">
              <p className="text-4xl font-black text-bb-lime md:text-5xl">
                {locations.length}
              </p>
              <p className="mt-1 text-sm tracking-[0.15em] text-bb-cream/50 uppercase">
                Cities
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-center">
              <p className="text-4xl font-black text-bb-lime md:text-5xl">
                {totalBins}
              </p>
              <p className="mt-1 text-sm tracking-[0.15em] text-bb-cream/50 uppercase">
                Active Bins
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center">
              <p className="text-4xl font-black text-bb-lime md:text-5xl">
                SW FL
              </p>
              <p className="mt-1 text-sm tracking-[0.15em] text-bb-cream/50 uppercase">
                Region
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  LOCATIONS GRID                            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-cream py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-6xl px-8 lg:px-16">
          <Reveal>
            <p
              className="text-sm font-light tracking-[0.2em] text-bb-deep/40 uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Our Locations
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-4 text-3xl font-bold text-bb-deep md:text-5xl">
              Active Bin Sites
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-bb-deep/50 md:text-lg">
              Drop off your used and cracked pickleballs at any of our
              collection points across Southwest Florida. We handle the rest.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <Reveal key={loc.name} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bb-deep/8 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  {/* Top accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-bb-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Pin + Status */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bb-lime/15 transition-colors duration-300 group-hover:bg-bb-lime/30">
                      <PinIcon className="h-6 w-6 text-bb-deep" />
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-[11px] font-semibold text-green-700">
                        Active
                      </span>
                    </span>
                  </div>

                  {/* Location info */}
                  <h4 className="mt-5 text-xl font-bold text-bb-deep">
                    {loc.name}
                  </h4>
                  <p className="mt-1 text-xs font-medium tracking-[0.1em] text-bb-mid uppercase">
                    {loc.region}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bb-deep/50">
                    {loc.description}
                  </p>

                  {/* Bottom details */}
                  <div className="mt-6 flex items-center justify-between border-t border-bb-deep/6 pt-4">
                    <span className="text-xs text-bb-deep/40">
                      {loc.address}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-bb-deep/60">
                      <RecycleBinIcon className="h-4 w-4" />
                      {loc.binCount} {loc.binCount === 1 ? "bin" : "bins"}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}

            {/* "Coming Soon" card */}
            <Reveal delay={0.1 + locations.length * 0.08}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-bb-deep/15 bg-bb-cream p-8 text-center transition-colors duration-300 hover:border-bb-lime/50 hover:bg-bb-lime/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bb-deep/5">
                  <span className="text-2xl">+</span>
                </div>
                <h4 className="mt-4 text-lg font-bold text-bb-deep">
                  More Coming Soon
                </h4>
                <p className="mt-2 text-sm text-bb-deep/40">
                  We&apos;re expanding across Florida and beyond. Request a bin
                  for your area below.
                </p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  HOW IT WORKS                              */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full bg-bb-mint/40 py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="mx-auto max-w-5xl px-8 lg:px-16">
          <Reveal>
            <p
              className="text-sm font-light tracking-[0.2em] text-bb-deep/40 uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              How It Works
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-4 text-3xl font-bold text-bb-deep md:text-5xl">
              Three Simple Steps
            </h3>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                step: "01",
                title: "Find a Bin",
                body: "Locate the nearest BounceBack recycling bin at a facility in your area using this page.",
              },
              {
                step: "02",
                title: "Drop Off",
                body: "Toss your cracked, dead, or unwanted pickleballs into the bin. Any brand, any condition.",
              },
              {
                step: "03",
                title: "We Recycle",
                body: "We collect, process, and transform the old balls into brand-new, player-grade BB-1 pickleballs.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={0.15 + i * 0.12}>
                <div className="relative pl-0">
                  <span className="text-6xl font-black text-bb-lime/30">
                    {item.step}
                  </span>
                  <h4 className="mt-2 text-xl font-bold text-bb-deep">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-bb-deep/50">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  CTA — Request a bin                       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-90" />

        {/* Floating pickleballs */}
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

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-8 py-24 text-center md:py-32">
          <Reveal>
            <h3 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              Want a bin at your facility?
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              We partner with pickleball courts, recreation centers, and clubs
              across the country. Request a BounceBack recycling bin for your
              location and join the movement.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/request-bin"
                className="bg-bb-lime px-10 py-4 text-sm font-semibold tracking-[0.15em] text-bb-deep transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                REQUEST A BIN
              </a>
              <a
                href="/#waitlist"
                className="border-2 border-white/40 px-10 py-4 text-sm font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                JOIN THE WAITLIST
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
