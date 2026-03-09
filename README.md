# Mini Masters Playground

A modern, animated landing page for **Mini Masters Playground** — an indoor children's playground offering fun adventures for tiny heroes. Built with Next.js, React, and Tailwind CSS.

## About

Mini Masters Playground is an interactive single-page website designed to showcase a children's indoor playground. The site features rich animations, responsive design, and a playful visual identity with vibrant colors and custom typography.

### Key Sections

- **Navigation** — Responsive navbar with a mobile hamburger drawer menu
- **Hero** — Eye-catching hero section with an infinite image marquee and animated info cards displaying key highlights (age range, play area size, party options)
- **Tickets Slider** — A custom arc/wheel carousel showcasing different ticket and pricing options with smooth auto-rotation
- **Mobile App** — Displays opening times and a loyalty program through a phone mockup UI, encouraging app downloads via QR code
- **Location & Hours** — Opening hours and location details with decorative illustrations
- **FAQ** — Accordion-style frequently asked questions organized into three categories (General, Pricing, Activities) with smooth expand/collapse animations
- **Footer** — Testimonial card carousel, newsletter signup form, social media links, and contact information

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, CSS transitions, custom carousel logic
- **Carousel**: Embla Carousel, React Fast Marquee
- **Icons**: Lucide React, custom SVGs

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/AchieveNL/minimastersplayground.git

# Navigate to the project
cd minimastersplayground

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
mini-masters/
├── app/
│   ├── components/
│   │   ├── AnimatedSilder.tsx   # Infinite marquee image slider
│   │   ├── Faq.tsx              # FAQ accordion section
│   │   ├── Footer.tsx           # Footer with testimonials & newsletter
│   │   ├── Hero.tsx             # Hero section with info cards
│   │   ├── InfoCard.tsx         # Reusable info card component
│   │   ├── Location.tsx         # Location & opening hours
│   │   ├── Mobile.tsx           # Phone mockup wrapper
│   │   ├── MobileSection.tsx    # Mobile app promotion section
│   │   ├── Nav.tsx              # Navigation bar
│   │   └── Slider.tsx           # Arc carousel for tickets
│   ├── globals.css              # Global styles & font imports
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── public/
│   ├── assets/                  # SVG icons & images
│   └── fonts/                   # Custom fonts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Color Palette

| Color   | Hex       | Usage                    |
|---------|-----------|--------------------------|
| Green   | `#67CD8A` | Primary accent, cards     |
| Yellow  | `#FFCA58` | Highlights, backgrounds   |
| Blue    | `#5763FF` | Accents, interactive      |
| Purple  | `#BB76FF` | Decorative elements       |
| Red     | `#FF5757` | Alerts, emphasis          |
| Cream   | `#F8F5E3` | Page background           |

## Fonts

- **Quicksand** — Primary body text
- **StudlyFree** — Display/heading font
- **Nunito Variable** — Secondary text
- **Luckiest Guy** — Accent headings
