"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";

type Tab = "login" | "register";

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <div className="min-h-screen bg-bb-cream text-bb-deep">
      <NavBar variant="dark" />

      {/* ─── Header ─── */}
      <div className="flex flex-col items-center pt-24 pb-8 md:pt-32 md:pb-10">
        <img
          src="/bb-icon.png"
          alt="BounceBack"
          className="h-16 w-16 md:h-20 md:w-20"
        />
        <h1 className="mt-3 text-xl font-bold tracking-[0.08em] text-bb-deep md:text-2xl">
          BOUNCEBACK ACCOUNT
        </h1>
      </div>

      {/* ─── Tabs ─── */}
      <div className="mx-auto max-w-md px-6">
        <div className="flex border-b border-bb-deep/15">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 pb-3 text-center text-sm font-semibold tracking-[0.1em] transition-colors ${
              tab === "login"
                ? "border-b-2 border-bb-deep text-bb-deep"
                : "text-bb-deep/40 hover:text-bb-deep/60"
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 pb-3 text-center text-sm font-semibold tracking-[0.1em] transition-colors ${
              tab === "register"
                ? "border-b-2 border-bb-deep text-bb-deep"
                : "text-bb-deep/40 hover:text-bb-deep/60"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* ─── LOG IN Form ─── */}
        {tab === "login" && (
          <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-bb-deep">
                E-mail<span className="text-bb-red">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bb-deep">
                Password<span className="text-bb-red">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
              />
              <button
                type="button"
                className="mt-2 text-xs text-bb-deep/50 transition-colors hover:text-bb-deep"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-bb-deep py-4 text-sm font-semibold tracking-[0.12em] text-bb-cream transition-colors hover:bg-bb-deep/90"
            >
              SIGN IN
            </button>
          </form>
        )}

        {/* ─── REGISTER Form ─── */}
        {tab === "register" && (
          <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-bb-deep">
                  First name<span className="text-bb-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  required
                  className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bb-deep">
                  Last name<span className="text-bb-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                  className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-bb-deep">
                E-mail<span className="text-bb-red">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-bb-deep">
                Password<span className="text-bb-red">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
              />
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-sm font-medium text-bb-deep">
                Birthday
              </label>
              <input
                type="date"
                className="mt-1.5 w-full border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep outline-none placeholder:text-bb-deep/30 transition-colors focus:border-bb-deep"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-bb-deep">
                Gender
              </label>
              <select
                className="mt-1.5 w-full appearance-none border border-bb-deep/20 bg-transparent px-4 py-3 text-sm text-bb-deep/50 outline-none transition-colors focus:border-bb-deep"
                defaultValue=""
              >
                <option value="" disabled>Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>

            {/* Subscribe checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 border border-bb-deep/30 accent-bb-deep"
              />
              <span className="text-xs leading-relaxed text-bb-deep/60">
                Subscribe to receive email updates about BounceBack product launches,
                promotions and exclusive discounts.
              </span>
            </label>

            {/* Terms */}
            <p className="text-xs leading-relaxed text-bb-deep/50">
              By submitting this form, you accept the{" "}
              <a href="/terms" className="underline transition-colors hover:text-bb-deep">
                Terms &amp; Conditions
              </a>
              .
              <br />
              By opting in to receive our marketing communications, you agree you may
              receive communications within the quiet time (outside of 8am to 9pm local time)
            </p>

            <button
              type="submit"
              className="w-full bg-bb-deep py-4 text-sm font-semibold tracking-[0.12em] text-bb-cream transition-colors hover:bg-bb-deep/90"
            >
              REGISTER
            </button>

            {/* ─── Benefits Section ─── */}
            <div className="mt-10 pt-10 border-t border-bb-deep/10">
              <h3 className="text-lg font-bold tracking-[0.03em] text-bb-deep leading-tight md:text-xl">
                CREATING AN ACCOUNT
                <br />
                ENABLES YOU TO:
              </h3>

              <ul className="mt-6 space-y-5">
                {benefits.map((b) => (
                  <li key={b.label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-bb-deep/15 text-bb-deep/60">
                      {b.icon}
                    </span>
                    <span className="text-sm leading-relaxed text-bb-deep/70">
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        )}

        {/* Bottom spacer */}
        <div className="h-20" />
      </div>

      {/* ─── Footer ─── */}
      <footer className="border-t border-bb-deep/10 px-10 py-8 md:px-12 lg:px-16">
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

/* ── Benefits data ── */
const benefits = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Enrol in BounceBack rewards system",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Receive the BounceBack newsletter and obtain access to the latest news, release information and unique discount codes before anyone else.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Be able to view your full order history and order tracking details.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Save your payment details, to make checking out quicker and easier.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Add products to your wishlist for viewing or purchasing at a later date.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="18" x2="12" y2="18.01" strokeLinecap="round" />
      </svg>
    ),
    label: "Access your BounceBack account on our Mobile App",
  },
];
