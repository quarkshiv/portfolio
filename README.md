<div align="center">

# ✦ Shivansh Shukla — Portfolio ✦

**A cosmic-themed, immersive developer portfolio built with cutting-edge web technologies.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[**Live Demo**](#) · [**LinkedIn**](https://www.linkedin.com/in/shivansh-shukla-26807a356/) · [**LeetCode**](https://leetcode.com/u/quark_shiv/) · [**Codeforces**](https://codeforces.com/profile/shukla_shiv29)

</div>

---

## 🌌 Overview

This portfolio is more than a static resume — it's a **fully interactive, space-themed experience** featuring real-time 3D graphics, fluid animations, and a component-driven architecture. Every section is designed to feel alive, from the orbiting cosmic spheres in the background to the typewriter effect cycling through roles.

### ✨ Highlights

- 🪐 **Real-time 3D cosmic scene** — Interactive starfield, orbiting planets, and particle systems rendered with Three.js + React Three Fiber
- 🎭 **60fps animations** — Scroll-triggered reveals, parallax effects, and micro-interactions powered by Framer Motion & GSAP
- 🧊 **Glassmorphism UI** — Frosted glass cards, holographic panels, and glowing accent borders throughout
- 🤖 **AI Assistant** — An embedded chatbot that answers questions about me, my projects, and skills
- 📱 **Fully responsive** — Pixel-perfect on everything from 320px phones to ultrawide monitors
- ⚡ **Blazing fast** — Server-rendered with Next.js App Router, dynamic imports, and optimized assets

---

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata & SEO
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design tokens, animations, utilities
│
├── components/
│   ├── canvas/             # Three.js 3D components
│   │   ├── BackgroundScene.tsx # Full-screen starfield + particles
│   │   └── WireframeSphere.tsx # Animated orbiting sphere
│   │
│   ├── layout/             # Structural components
│   │   ├── Navbar.tsx      # Glassmorphic navbar with scroll-spy
│   │   └── Footer.tsx      # Site footer
│   │
│   ├── sections/           # Page sections
│   │   ├── HeroSection.tsx         # Landing hero with 3D background
│   │   ├── TimelineSection.tsx     # Animated journey timeline
│   │   ├── SkillsSection.tsx       # Interactive skill clusters
│   │   ├── ProjectsSection.tsx     # Project showcase cards
│   │   ├── CompetitiveSection.tsx  # CP stats & achievements
│   │   ├── LeadershipSection.tsx   # Roles & extracurriculars
│   │   ├── ContactSection.tsx      # Terminal-style contact form
│   │   └── AIAssistant.tsx         # Floating AI chat widget
│   │
│   └── ui/                 # Reusable UI primitives
│       ├── Button.tsx              # Themed CTA button
│       ├── GlassCard.tsx           # Frosted glass container
│       ├── HolographicPanel.tsx    # Holographic section wrapper
│       ├── SectionHeading.tsx      # Consistent section titles
│       ├── TypewriterText.tsx      # Typing animation component
│       ├── AnimatedCounter.tsx     # Number counting animation
│       ├── CursorTrail.tsx         # Custom cursor trail effect
│       ├── ShootingStar.tsx        # Random shooting star animation
│       └── Icons.tsx               # Custom SVG icon components
│
└── lib/
    └── data.ts             # All portfolio content & configuration
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | SSR, routing, optimization |
| **UI Library** | React 19 | Component architecture |
| **Language** | TypeScript 5 | Type safety |
| **3D Graphics** | Three.js + React Three Fiber | Cosmic scene, spheres, particles |
| **Animation** | Framer Motion + GSAP | Page transitions, scroll animations |
| **Styling** | Tailwind CSS 4 | Utility-first styling |
| **Icons** | Lucide React | Consistent iconography |
| **Post-processing** | React Three Postprocessing | Bloom, glow effects |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/quarkshiv/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

---

## 📂 Content Configuration

All portfolio content lives in a single file — [`src/lib/data.ts`](src/lib/data.ts). Update it to personalize:

| Export | What it controls |
|--------|-----------------|
| `personalInfo` | Name, tagline, bio, resume link |
| `socialLinks` | GitHub, LeetCode, LinkedIn, etc. |
| `roles` | Typewriter cycling text on hero |
| `timeline` | Journey milestones |
| `skillClusters` | Skill categories and proficiency |
| `projects` | Project cards with tech & metrics |
| `competitiveProgramming` | CP platform stats |
| `leadership` | Roles & organizations |
| `aiResponses` | AI assistant knowledge base |
| `navItems` | Navigation menu items |

---

## 🎨 Design System

The portfolio uses a carefully curated cosmic color palette defined in [`globals.css`](src/app/globals.css):

| Token | Hex | Usage |
|-------|-----|-------|
| `cosmic-black` | `#0a0a0f` | Deep backgrounds |
| `cosmic-blue` | `#00d4ff` | Primary accent, links, CTAs |
| `cosmic-violet` | `#8b5cf6` | Secondary accent, gradients |
| `cosmic-cyan` | `#06ffa5` | Success, highlights |
| `cosmic-gold` | `#ffd700` | Achievements, awards |
| `star-white` | `#f0f0ff` | Primary text |

**Typography**: Orbitron (headings) · Inter (body) · JetBrains Mono (code) · Space Grotesk (nav) · Syne (logo)

---

## 📦 Deployment

This project is optimized for deployment on **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/quarkshiv/portfolio)

Alternatively, deploy to any platform that supports Node.js:

```bash
npm run build   # Generates optimized production build in .next/
npm start       # Starts production server on port 3000
```

---

## 📄 License

This project is open source and available for personal use and learning. Feel free to fork and customize for your own portfolio.

---

<div align="center">

**Built with ☕ and curiosity by [Shivansh Shukla](https://github.com/quarkshiv)**

*If you found this helpful, consider giving it a ⭐*

</div>
