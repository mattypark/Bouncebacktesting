"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import NavBar from "@/components/NavBar";

/* ───────────────────────────────────────────── */
/*  Reveal wrapper                               */
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
interface Location {
  name: string;
  city: string;
  nonprofit: boolean;
}

interface StateData {
  abbr: string;
  name: string;
  locations: Location[];
}

const LOCATION_DATA: StateData[] = [
  {
    abbr: "FL",
    name: "Florida",
    locations: [
      { name: "South Sea Island", city: "Captiva", nonprofit: false },
      { name: "Eagle Scout Park", city: "Dunedin", nonprofit: false },
      { name: "Verdana Village", city: "Estero", nonprofit: false },
      { name: "Three Oaks Park", city: "Estero", nonprofit: false },
      { name: "Murano", city: "Estero", nonprofit: false },
      { name: "Shadowwood Preserve", city: "Estero", nonprofit: false },
      { name: "Ace Pickleball Club", city: "Fort Myers", nonprofit: false },
      { name: "Brooks Community Park", city: "Fort Myers", nonprofit: false },
      { name: "DNA Pickleball", city: "Fort Myers", nonprofit: false },
      { name: "The Landings", city: "Fort Myers", nonprofit: false },
      { name: "Bay Oaks Community Center", city: "Fort Myers", nonprofit: false },
      { name: "Plantation Recreation Resort", city: "Lady Lake", nonprofit: true },
      { name: "Dink House Pickleball Club", city: "Largo", nonprofit: false },
      { name: "Ace Pickleball Club", city: "Lutz", nonprofit: false },
      { name: "YMCA Marco Island", city: "Marco Island", nonprofit: false },
      { name: "Naples Pickleball Center", city: "Naples", nonprofit: true },
      { name: "Naples Heritage", city: "Naples", nonprofit: true },
      { name: "Valencia Trails", city: "Naples", nonprofit: true },
      { name: "Veterans Park", city: "Naples", nonprofit: true },
      { name: "Tampa Bay Pickleball Club", city: "Oldsmar", nonprofit: false },
      { name: "Orlando Advanced Pickleball", city: "Orlando", nonprofit: false },
      { name: "PicklePlex", city: "Punta Gorda", nonprofit: false },
      { name: "The Dunes", city: "Sanibel", nonprofit: false },
      { name: "Pickleball Shack SRQ", city: "Sarasota", nonprofit: false },
      { name: "Lakehouse Cove", city: "Sarasota", nonprofit: false },
      { name: "Cresswind Lakewood Ranch", city: "Sarasota", nonprofit: false },
      { name: "MP Tennis & Sports", city: "Tampa", nonprofit: false },
      { name: "Northdale Pickle Lounge", city: "Tampa", nonprofit: false },
      { name: "Tampa Pickleball Crew", city: "Tampa", nonprofit: false },
    ],
  },
  {
    abbr: "CA",
    name: "California",
    locations: [
      { name: "Tri Valley Pickleball Club", city: "Livermore", nonprofit: false },
      { name: "Tri Valley Pickleball Club", city: "San Ramon", nonprofit: false },
      { name: "Tri Valley Pickleball Club", city: "Pleasanton", nonprofit: false },
    ],
  },
  {
    abbr: "GA",
    name: "Georgia",
    locations: [
      { name: "Pickleball Clubs (2)", city: "Saint Mary's", nonprofit: true },
      { name: "Wilmington Island", city: "Savannah", nonprofit: true },
      { name: "Lake Mayer", city: "Savannah", nonprofit: true },
      { name: "Tybee YMCA", city: "Tybee Island", nonprofit: true },
    ],
  },
  {
    abbr: "TN",
    name: "Tennessee",
    locations: [
      { name: "The Club at Fairvue Plantation", city: "Gallatin", nonprofit: true },
      { name: "Northfield Church", city: "Gallatin", nonprofit: true },
    ],
  },
  {
    abbr: "ME",
    name: "Maine",
    locations: [
      { name: "The Wicked Pickle", city: "South Portland", nonprofit: true },
      { name: "The Point", city: "South Portland", nonprofit: true },
      { name: "Apex Racket & Fitness", city: "Portland", nonprofit: true },
      { name: "Deering Oaks Park", city: "Portland", nonprofit: true },
      { name: "The Picklr", city: "Westbrook", nonprofit: true },
      { name: "Auburn Public Courts", city: "Auburn", nonprofit: true },
      { name: "Fort Williams Park", city: "Cape Elizabeth", nonprofit: true },
      { name: "Loranger School Courts", city: "Old Orchard Beach", nonprofit: true },
      { name: "Seacoast Pickleball", city: "York", nonprofit: true },
      { name: "Williams Park", city: "Bangor", nonprofit: true },
      { name: "Bounce Pickleball", city: "Biddeford", nonprofit: true },
      { name: "Stearns High School", city: "Millinocket", nonprofit: true },
      { name: "Mattanawcook Jr. High School", city: "Lincoln", nonprofit: true },
      { name: "Messalonskee High School", city: "Oakland", nonprofit: true },
      { name: "South Portland High School", city: "South Portland", nonprofit: true },
      { name: "China Middle School", city: "South China", nonprofit: true },
    ],
  },
  {
    abbr: "MA",
    name: "Massachusetts",
    locations: [
      { name: "Recreation Park @ Pomps Pond", city: "Andover", nonprofit: true },
      { name: "Doherty Gym Courts", city: "Braintree", nonprofit: true },
      { name: "NE Racquet @ Thayer Academy", city: "Braintree", nonprofit: true },
      { name: "Pickles", city: "Hanover", nonprofit: true },
      { name: "Boston Pickle Club", city: "Norwell", nonprofit: true },
      { name: "JCC", city: "Marblehead", nonprofit: true },
      { name: "Seaside Park", city: "Marblehead", nonprofit: true },
      { name: "Veterans Middle School", city: "Marblehead", nonprofit: true },
      { name: "New England Pickleball Club", city: "Middleton", nonprofit: true },
    ],
  },
  {
    abbr: "NH",
    name: "New Hampshire",
    locations: [
      { name: "Foss Field", city: "Wolfeboro", nonprofit: true },
      { name: "Exeter Recreation Park", city: "Exeter", nonprofit: true },
      { name: "Eastman Courts", city: "Grantham", nonprofit: true },
      { name: "Prout Park", city: "Manchester", nonprofit: true },
      { name: "Portsmouth Public Courts", city: "Portsmouth", nonprofit: true },
      { name: "New England Pickleball Club", city: "Rye", nonprofit: true },
      { name: "Pickleball603", city: "East Hampstead", nonprofit: true },
      { name: "Seacoast Pickleball", city: "Newmarket", nonprofit: true },
    ],
  },
];

/* Build a lookup: state abbr -> bin count */
const stateBinCounts: Record<string, number> = {};
const stateHasNonprofit: Record<string, boolean> = {};
LOCATION_DATA.forEach((s) => {
  stateBinCounts[s.abbr] = s.locations.length;
  stateHasNonprofit[s.abbr] = s.locations.some((l) => l.nonprofit);
});

const totalLocations = LOCATION_DATA.reduce((acc, s) => acc + s.locations.length, 0);
const totalStates = LOCATION_DATA.length;
const maxBins = Math.max(...Object.values(stateBinCounts));

/* Color scale: more bins = darker green */
function stateColor(abbr: string): string {
  const count = stateBinCounts[abbr];
  if (!count) return "#e5e7eb";
  const t = count / maxBins;
  // Interpolate from bb-mint (#E5FCCD) to bb-deep (#084734)
  const r = Math.round(229 + (8 - 229) * t);
  const g = Math.round(252 + (71 - 252) * t);
  const b = Math.round(205 + (52 - 205) * t);
  return `rgb(${r},${g},${b})`;
}

/* ───────────────────────────────────────────── */
/*  Approximate marker positions for states      */
/*  (x, y) in the 960x600 AlbersUSA viewBox     */
/* ───────────────────────────────────────────── */
const STATE_MARKERS: Record<string, { x: number; y: number }> = {
  FL: { x: 760, y: 480 },
  CA: { x: 100, y: 330 },
  GA: { x: 720, y: 400 },
  TN: { x: 670, y: 360 },
  ME: { x: 880, y: 110 },
  MA: { x: 890, y: 185 },
  NH: { x: 875, y: 155 },
};

/* ───────────────────────────────────────────── */
/*  SVG State Paths (AlbersUSA simplified)       */
/* ───────────────────────────────────────────── */
const STATE_PATHS: Record<string, string> = {
  AL: "M680,380 L695,380 700,385 705,400 705,440 700,455 695,460 680,460 675,445 675,400 Z",
  AZ: "M185,370 L240,370 250,380 250,440 245,460 230,465 185,465 180,450 175,410 Z",
  AR: "M610,390 L650,390 660,395 665,410 660,440 650,445 610,445 605,430 605,400 Z",
  CA: "M60,200 L105,210 120,250 130,300 125,340 115,380 100,410 80,430 55,420 40,380 35,330 40,280 45,240 Z",
  CO: "M290,280 L370,280 375,285 375,340 370,345 290,345 285,340 285,285 Z",
  CT: "M870,195 L890,190 895,195 895,210 890,215 870,215 865,210 Z",
  DE: "M830,265 L845,260 850,265 850,285 845,290 830,285 Z",
  FL: "M710,430 L760,420 780,430 790,445 785,475 770,500 755,520 740,510 720,490 715,475 710,460 Z",
  GA: "M720,370 L755,370 760,375 765,400 760,440 750,450 720,450 715,430 710,400 Z",
  ID: "M175,120 L210,110 225,130 230,170 225,220 210,240 190,230 175,200 170,160 Z",
  IL: "M620,240 L645,240 655,250 660,280 660,340 650,355 635,360 620,350 615,320 615,270 Z",
  IN: "M660,250 L685,250 690,260 690,340 685,350 660,350 655,340 655,265 Z",
  IA: "M560,210 L620,210 630,215 630,265 620,275 560,275 555,265 555,220 Z",
  KS: "M430,310 L530,310 535,315 535,360 530,365 430,365 425,360 425,315 Z",
  KY: "M660,320 L735,310 745,320 740,345 730,355 660,360 655,350 Z",
  LA: "M600,440 L640,435 655,445 660,470 650,490 635,495 615,485 600,470 Z",
  ME: "M870,70 L895,60 905,80 905,130 895,150 880,155 870,140 865,110 Z",
  MD: "M790,265 L830,255 840,260 840,280 830,290 800,295 790,285 Z",
  MA: "M860,180 L900,175 910,180 910,200 900,205 860,205 855,195 Z",
  MI: "M640,140 L680,130 700,150 705,190 695,220 680,230 650,225 635,200 630,170 Z",
  MN: "M530,100 L580,100 590,110 590,190 580,200 530,200 525,190 525,110 Z",
  MS: "M650,400 L670,395 680,405 680,460 670,475 655,475 645,460 645,420 Z",
  MO: "M570,300 L630,300 640,310 640,370 630,380 570,380 565,370 565,310 Z",
  MT: "M230,80 L340,80 350,90 350,140 340,150 230,150 220,140 220,90 Z",
  NE: "M400,240 L510,240 520,250 520,290 510,300 400,300 390,290 390,250 Z",
  NV: "M120,210 L170,200 180,220 180,320 170,350 150,360 120,340 110,290 Z",
  NH: "M870,130 L885,125 890,135 890,170 885,180 870,180 865,170 Z",
  NJ: "M845,225 L860,220 865,230 862,260 855,275 845,270 840,250 Z",
  NM: "M245,370 L320,370 330,380 330,460 320,470 245,470 240,460 240,380 Z",
  NY: "M810,150 L870,140 880,150 880,210 865,225 840,230 820,220 810,195 Z",
  NC: "M730,340 L810,330 820,340 815,360 800,370 730,375 725,365 Z",
  ND: "M400,100 L480,100 490,110 490,155 480,165 400,165 390,155 390,110 Z",
  OH: "M700,240 L740,235 750,245 750,310 740,320 700,325 690,315 690,250 Z",
  OK: "M430,370 L530,365 545,375 545,410 530,420 430,425 420,415 420,380 Z",
  OR: "M65,120 L150,110 165,125 165,190 150,200 65,200 55,185 55,135 Z",
  PA: "M760,215 L835,205 845,215 845,260 835,268 760,275 750,265 750,225 Z",
  RI: "M895,195 L905,192 908,198 905,210 900,213 895,210 Z",
  SC: "M740,370 L785,360 795,370 790,395 780,405 740,400 735,390 Z",
  SD: "M400,165 L480,165 490,175 490,225 480,235 400,235 390,225 390,175 Z",
  TN: "M630,350 L735,340 745,348 742,370 730,378 630,385 625,375 625,358 Z",
  TX: "M370,390 L470,380 500,400 520,430 530,470 520,510 490,530 450,530 410,510 380,480 365,440 Z",
  UT: "M215,250 L275,245 280,255 280,340 275,350 215,355 210,345 210,260 Z",
  VT: "M860,120 L875,115 880,125 878,170 872,178 860,175 855,165 Z",
  VA: "M740,290 L815,280 830,290 825,320 810,335 740,340 730,330 730,300 Z",
  WA: "M90,50 L170,45 180,55 180,115 170,125 90,130 80,120 80,60 Z",
  WV: "M740,280 L770,275 780,285 775,320 765,335 745,330 735,310 Z",
  WI: "M580,120 L630,115 640,125 640,200 630,215 580,220 575,210 575,130 Z",
  WY: "M270,165 L355,165 365,175 365,240 355,250 270,250 260,240 260,175 Z",
  DC: "M810,280 L815,278 818,282 815,286 810,284 Z",
  // Alaska and Hawaii (smaller, offset)
  AK: "M80,470 L170,460 185,475 180,520 160,540 120,545 80,530 65,510 Z",
  HI: "M260,510 L290,505 300,515 295,535 280,540 260,535 255,525 Z",
};

/* ───────────────────────────────────────────── */
/*  Main Page Component                          */
/* ───────────────────────────────────────────── */
export default function LocationsPage() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const stateDataMap = useMemo(() => {
    const m: Record<string, StateData> = {};
    LOCATION_DATA.forEach((s) => {
      m[s.abbr] = s;
    });
    return m;
  }, []);

  const allStateAbbrs = Object.keys(STATE_PATHS);

  function handleMouseMove(e: React.MouseEvent<SVGElement>, abbr: string) {
    if (!stateBinCounts[abbr]) return;
    const svg = (e.target as SVGElement).closest("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
    });
    setHoveredState(abbr);
  }

  function handleMouseLeave() {
    setHoveredState(null);
  }

  /* Build gradient legend stops */
  const gradientStops = [1, 5, 10, 16, 29].map((count) => {
    const t = count / maxBins;
    const r = Math.round(229 + (8 - 229) * t);
    const g = Math.round(252 + (71 - 252) * t);
    const b = Math.round(205 + (52 - 205) * t);
    return `rgb(${r},${g},${b})`;
  });

  return (
    <div className="min-h-screen bg-bb-cream">
      <NavBar variant="dark" />

      {/* ═══════════════════════════════════════════ */}
      {/*  HERO                                      */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-cream pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-6xl px-8 lg:px-16 text-center">
          <Reveal>
            <p
              className="text-sm font-light tracking-[0.2em] text-bb-deep/40 uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Find a Bin Near You
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-4xl font-bold text-bb-deep md:text-6xl lg:text-7xl">
              Bin <span className="text-bb-mid">Locations</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bb-deep/60 md:text-lg">
              BounceBack recycling bins are placed at pickleball facilities across the country.
              Drop off your cracked balls and we&apos;ll give them a second life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  STATS BAR                                 */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-deep py-6 md:py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-8 md:flex-row md:gap-16">
          <Reveal delay={0}>
            <div className="text-center">
              <p className="text-3xl font-black text-bb-lime md:text-4xl">{totalLocations}</p>
              <p className="mt-1 text-xs font-light tracking-[0.15em] text-bb-cream/60 uppercase">
                Total Bins
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-center">
              <p className="text-3xl font-black text-bb-lime md:text-4xl">{totalStates}</p>
              <p className="mt-1 text-xs font-light tracking-[0.15em] text-bb-cream/60 uppercase">
                States
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center">
              <p className="text-sm font-semibold text-bb-cream md:text-base">
                Partnered with{" "}
                <span className="text-bb-lime">The RePickle Project</span>
              </p>
              <p className="mt-1 text-xs font-light tracking-[0.15em] text-bb-cream/60 uppercase">
                Nonprofit Partnership
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  INTERACTIVE MAP                           */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-16">
          <Reveal>
            <div className="relative w-full overflow-hidden rounded-2xl border border-bb-deep/10 bg-white p-4 shadow-sm md:p-8">
              <svg
                viewBox="0 0 960 600"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Render all states */}
                {allStateAbbrs.map((abbr) => {
                  const hasBins = !!stateBinCounts[abbr];
                  const isHovered = hoveredState === abbr;
                  return (
                    <path
                      key={abbr}
                      id={abbr}
                      d={STATE_PATHS[abbr]}
                      fill={isHovered && hasBins ? "#65BE44" : stateColor(abbr)}
                      stroke="#fff"
                      strokeWidth={1.5}
                      className={hasBins ? "cursor-pointer transition-colors duration-200" : ""}
                      onMouseMove={(e) => handleMouseMove(e, abbr)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}

                {/* Markers for states with bins */}
                {LOCATION_DATA.map((state) => {
                  const pos = STATE_MARKERS[state.abbr];
                  if (!pos) return null;
                  const hasNP = state.locations.some((l) => l.nonprofit);
                  const hasRegular = state.locations.some((l) => !l.nonprofit);

                  return (
                    <g key={`markers-${state.abbr}`}>
                      {/* Regular marker (circle) */}
                      {hasRegular && (
                        <circle
                          cx={pos.x - (hasNP ? 6 : 0)}
                          cy={pos.y}
                          r={3.5}
                          fill="#084734"
                          stroke="#fff"
                          strokeWidth={1}
                          className="pointer-events-none"
                        />
                      )}
                      {/* Nonprofit marker (star) */}
                      {hasNP && (
                        <polygon
                          points={starPoints(pos.x + (hasRegular ? 6 : 0), pos.y, 5, 2.5)}
                          fill="#084734"
                          stroke="#fff"
                          strokeWidth={0.8}
                          className="pointer-events-none"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredState && stateBinCounts[hoveredState] && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute z-20 rounded-lg bg-bb-deep px-4 py-3 shadow-lg"
                    style={{
                      left: tooltipPos.x,
                      top: tooltipPos.y,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <p className="text-sm font-bold text-bb-lime">
                      {stateDataMap[hoveredState]?.name}
                    </p>
                    <p className="text-xs text-bb-cream/80">
                      {stateBinCounts[hoveredState]} bin
                      {stateBinCounts[hoveredState] > 1 ? "s" : ""} &middot;{" "}
                      {new Set(
                        stateDataMap[hoveredState]?.locations.map((l) => l.city)
                      ).size}{" "}
                      {new Set(
                        stateDataMap[hoveredState]?.locations.map((l) => l.city)
                      ).size === 1
                        ? "city"
                        : "cities"}
                    </p>
                    {stateHasNonprofit[hoveredState] && (
                      <p className="mt-1 text-[10px] text-bb-lime/70">
                        Includes RePickle Project partnership
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* ═══════════════════════════════════════════ */}
          {/*  LEGEND                                    */}
          {/* ═══════════════════════════════════════════ */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
              {/* Marker legend */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="5" fill="#084734" />
                  </svg>
                  <span className="text-xs text-bb-deep/60">BounceBack Bin</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <polygon
                      points={starPoints(7, 7, 6, 3)}
                      fill="#084734"
                    />
                  </svg>
                  <span className="text-xs text-bb-deep/60">
                    Partnership with The RePickle Project
                  </span>
                </div>
              </div>

              {/* Color gradient legend */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-bb-deep/40">Fewer bins</span>
                <div
                  className="h-3 w-28 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${gradientStops.join(", ")})`,
                  }}
                />
                <span className="text-[10px] text-bb-deep/40">More bins</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  LOCATION LIST                             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="w-full bg-bb-mint/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-8 lg:px-16">
          <Reveal>
            <p
              className="text-sm font-light tracking-[0.2em] text-bb-deep/40 uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              All Locations
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-3xl font-bold text-bb-deep md:text-5xl">
              Browse by State
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LOCATION_DATA.sort((a, b) => a.name.localeCompare(b.name)).map((state, si) => {
              const allNonprofit = state.locations.every((l) => l.nonprofit);
              const someNonprofit = state.locations.some((l) => l.nonprofit);
              return (
                <Reveal key={state.abbr} delay={0.05 * si}>
                  <div className="h-full rounded-xl border border-bb-deep/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-bb-deep">
                        {state.name}
                        <span className="ml-2 text-sm font-normal text-bb-deep/40">
                          ({state.locations.length})
                        </span>
                      </h3>
                      {someNonprofit && (
                        <span className="rounded-full bg-bb-lime/30 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-bb-deep/70 uppercase">
                          {allNonprofit ? "RePickle Partner" : "Mixed"}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 h-[2px] w-10 bg-bb-lime" />

                    {/* Locations list */}
                    <ul className="mt-4 space-y-2">
                      {state.locations.map((loc, li) => (
                        <li key={li} className="flex items-start gap-2">
                          {loc.nonprofit ? (
                            <svg
                              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-bb-mid"
                              viewBox="0 0 14 14"
                              fill="currentColor"
                            >
                              <polygon points={starPoints(7, 7, 7, 3.5)} />
                            </svg>
                          ) : (
                            <svg
                              className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-bb-deep"
                              viewBox="0 0 10 10"
                              fill="currentColor"
                            >
                              <circle cx="5" cy="5" r="4" />
                            </svg>
                          )}
                          <span className="text-sm text-bb-deep/70">
                            <span className="font-medium text-bb-deep/90">{loc.name}</span>
                            <span className="text-bb-deep/40"> — {loc.city}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  CTA                                       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-8 py-24 text-center md:py-32">
          <Reveal>
            <h3 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              Want a bin at your facility?
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              We&apos;re expanding our bin network to pickleball clubs, parks, and recreation
              centers across the country. Request a free recycling bin or join our waitlist.
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

/* ───────────────────────────────────────────── */
/*  Star polygon helper                          */
/* ───────────────────────────────────────────── */
function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    // Outer point
    const outerAngle = (Math.PI / 2) * -1 + (2 * Math.PI * i) / 5;
    pts.push(
      `${cx + outerR * Math.cos(outerAngle)},${cy + outerR * Math.sin(outerAngle)}`
    );
    // Inner point
    const innerAngle = outerAngle + Math.PI / 5;
    pts.push(
      `${cx + innerR * Math.cos(innerAngle)},${cy + innerR * Math.sin(innerAngle)}`
    );
  }
  return pts.join(" ");
}
