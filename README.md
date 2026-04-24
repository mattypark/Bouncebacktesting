# BounceBack — Recycled Pickleball

The official website for [BounceBack](https://bouncebackpickle.com), the first recycled pickleball built with the same feel and performance as professional balls. Built with Next.js 16, Framer Motion, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **Scroll-Driven Storytelling** — Problem/solution narrative with animated text reveals and stat counters
- **Video Sections** — Embedded process videos showing how balls are recycled
- **Smooth Scrolling** — Lenis-powered scroll experience
- **Contact Form** — Bin request form with email notifications via Resend
- **User Accounts** — Registration and login backed by Supabase Auth
- **Product Page** — BB-1 ball showcase with cart functionality
- **Fully Responsive** — Mobile-first design across all breakpoints
- **Analytics** — Vercel Analytics integration

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Auth & Database | Supabase |
| Email | Resend |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Create a .env.local file with your credentials:
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# NEXT_PUBLIC_BACKEND_URL=
# RESEND_API_KEY=

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
app/
  layout.tsx                # Root layout, fonts, providers
  page.tsx                  # Home — storytelling sections
  globals.css               # Global styles
  account/page.tsx          # Login / registration
  bb-1/page.tsx             # BB-1 product page
  request-bin/page.tsx      # Bin request page
  api/
    auth/                   # Auth routes (login, register, logout, callback)
    contact/route.ts        # Contact form → Resend emails
components/
  HeroSection.tsx           # Hero with video background
  TextRevealSection.tsx     # Scroll-triggered text reveal
  WasteStatSection.tsx      # Animated waste statistics
  RecycledRevealSection.tsx # Product reveal animation
  TheProcessSection.tsx     # Recycling process with video
  WhyChooseSection.tsx      # Value propositions
  TestimonialsSection.tsx   # Customer testimonials
  WaitlistSection.tsx       # Waitlist / contact CTA
  FounderSection.tsx        # Founder story
  NavBar.tsx                # Navigation bar
  CartContext.tsx            # Cart state provider
  CartDrawer.tsx            # Slide-out cart drawer
  CartIcon.tsx              # Cart icon with badge
  SmoothScroll.tsx          # Lenis scroll provider
  Providers.tsx             # App-level providers
lib/
  supabase.ts               # Supabase client
public/
  videos/                   # Product clips
  *.mp4, *.mov              # Process and reveal videos
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL |
| `RESEND_API_KEY` | Resend API key (server-only) |

## License

MIT
# Bouncebacktesting
