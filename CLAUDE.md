# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kevin Armbruster's personal website for his Process Automation Consulting business. The site showcases his expertise in operational excellence, business process automation, and workflow optimization for SMEs.
The URL of the website is https://kevinarmbruster.de/

**Current Status:** Early stage development with concept documentation and placeholder homepage. The site will be a professional bilingual (German/English) portfolio and service presentation platform.

## Project Architecture

### Content Strategy
The website is structured around 7 main pages:
1. **Home** - Hero, impact numbers, services teaser, featured projects, testimonials
2. **About** (Über mich) - Personal story, background (7 years at KREATIZE), qualifications (Lean Master, Maschinenbau Master), 4-step methodology
3. **Services** - 3 core services with detailed 6-step delivery process, pricing (€100/hr), engagement models
4. **Portfolio** - Featured projects: Veer.io Order Management, KREATIZE Logistics Center, KREATIZE Delivery Improvement, Pura Vida Chatbot/Events
5. **Values** (Werte) - Communication philosophy (NVC), work values, Pura Vida connection
6. **Contact** - Calendar integration, contact form, FAQ
7. **404** - Custom error page

### Bilingual Implementation
- All content exists in both German (primary) and English
- Language toggle in navigation (DE|EN)
- Content files located in [concept/](concept/) directory with naming pattern: `{number}-{page}-texte-de.md`
- Language detection should use localStorage or URL parameter

### Design System
**Color Palette:**
- Primary: Dark Blue-Grey (#2C3E50)
- Secondary: Warm Green (#27AE60) - Pura Vida connection
- Accent: Light Orange (#E67E22) - CTAs
- Background: White + very light grey (#F8F9FA)
- Text: Dark grey (#2C3E50)

**Typography:**
- Headlines: Inter or Poppins
- Body: Inter or system font
- Code: JetBrains Mono (for n8n workflows)

**Design Philosophy:** Minimalist-modern with human touch, professional for Mittelstand executives, modern for technical competence

## Key Features to Implement

### n8n Chatbot Integration
A critical differentiating feature showcasing Kevin's automation expertise:

**Frontend Widget:**
- Fixed position (bottom right)
- Uses [@n8n/chat](https://www.npmjs.com/package/@n8n/chat) package
- Implementation guide: [concept/n8n-chatbot-implementation-guide.md](concept/n8n-chatbot-implementation-guide.md)
- Bilingual support with language detection
- Webhook URL: Points to n8n backend flow

**Backend Architecture (n8n):**
1. Webhook Trigger → 2. Context Retrieval (Supabase) → 3. Knowledge Base Retrieval → 4. Prompt Construction → 5. LLM Call (OpenRouter) → 6. Response Processing → 7. Conversation Storage → 8. Intent Handling (booking, pricing, contact) → 9. Response

**Technologies:** n8n, OpenRouter (LLM), Supabase (storage), custom JavaScript widget

**Showcase:** Display the n8n workflow transparently on the website as proof of expertise ("I practice what I preach")

### Calendar Booking Integration
- Use Calendly or Cal.com
- 30-minute free consultation slots
- Embedded on Contact page and CTAs throughout site

### Downloadable Resources
Located in [resources/](resources/) directory:
- CV in German and English (PDFs already exist)
- Services Overview PDF (to be created)

## Content Guidelines

### Impact Numbers (Featured throughout)
These are real achievements from Kevin's work:
- **81% → 95%** - On-time delivery improvement (KREATIZE)
- **50%** - Cost reduction (Logistics Center)
- **80%** - Manual work reduction (Veer.io automation)
- **7 Years** - Operations experience at KREATIZE

### Core Services & Pricing
1. **Process Analysis & Optimization** - 2-4 weeks, €4,000-8,000
2. **Workflow Automation** - 4-8 weeks, €8,000-16,000
3. **End-to-End Implementation** - 8-12 weeks, €16,000-32,000

Hourly rate: **€100/hour** (Time & Materials basis)

### 4-Step Methodology
1. **VERSTEHEN** - Understand current workflows
2. **IDENTIFIZIEREN** - Identify bottlenecks
3. **LÖSEN** - Build targeted solutions
4. **DOKUMENTIEREN** - Ensure knowledge transfer

### Portfolio Projects (Featured)
Detailed content in [concept/04-portfolio-texte-de.md](concept/04-portfolio-texte-de.md):
- Veer.io Order Management System (n8n, NocoDB, Web Dev)
- KREATIZE In-House Logistics Center (Lean, Salesforce)
- KREATIZE Delivery Improvement (81→95% OTD)
- Pura Vida AI Chatbot (n8n, LLM, Telegram)
- Pura Vida Event Platform (Web scraping, n8n)

## Tech Stack

### Frontend
**Recommended: Plain HTML + Modern Enhancements**

This project does not require a JavaScript framework. Use plain HTML with:
- **Styling:** Tailwind CSS + **daisyUI** component library
- **Component Framework:** [daisyUI](https://daisyui.com/) for pre-built components (buttons, cards, navbars, etc.)
- **JavaScript:** Vanilla JS for language toggle and interactions
- **Chatbot:** [@n8n/chat](https://www.npmjs.com/package/@n8n/chat) widget via CDN (works perfectly with plain HTML)
- **Animations:** CSS transitions or lightweight JS (optional)

**Why Plain HTML:**
- ✅ No build process needed
- ✅ Faster loading (no framework overhead)
- ✅ Simpler deployment and maintenance
- ✅ Complete control over code
- ✅ Perfectly suitable for portfolio/service site

**Why daisyUI:**
- ✅ Built on Tailwind CSS (semantic component classes)
- ✅ Works with plain HTML (no React/Vue required)
- ✅ Professional, clean design perfect for B2B consulting
- ✅ Highly customizable to match brand colors
- ✅ Excellent documentation

**Component Usage:**
For all new features, use daisyUI components instead of building from scratch:
- Buttons: `<button class="btn btn-primary">Text</button>`
- Cards: `<div class="card bg-base-100 shadow-xl">...</div>`
- Navbar: `<div class="navbar bg-base-100">...</div>`
- See full component list: [daisyUI Components](https://daisyui.com/components/)

**Must-haves:**
- Fully responsive (mobile-first)
- Bilingual toggle (simple localStorage + JavaScript)
- Fast loading (<3s)
- SEO-optimized (proper meta tags, semantic HTML)

### Bilingual Implementation
Use simple JavaScript for language switching:
```javascript
// Store translations in JavaScript objects
const translations = {
    de: { /* German content */ },
    en: { /* English content */ }
};

// Toggle language with localStorage
function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}
```

Alternatively, use separate HTML files: `index-de.html` and `index-en.html` with a simple redirect script.

### Hosting
**Recommended options (all free for static sites):**
- **GitHub Pages** - Easiest if repo is public
- **Netlify** - Drag & drop or Git integration, custom domains
- **Vercel** - Supports plain HTML (not just Next.js)
- **Cloudflare Pages** - Fast global CDN

All support custom domains and HTTPS out of the box.

### Backend/Services
- **n8n** - Chatbot workflows and form handling
- **Supabase** - Database for conversation storage (free tier sufficient)
- **Calendly or Cal.com** - Booking integration
- **OpenRouter** - LLM API for chatbot (GPT-4 or Claude)

## SEO Strategy

### Primary Keywords (DE)
- Prozessautomatisierung Berater
- Workflow Automatisierung Deutschland
- n8n Consultant Deutschland
- Prozessoptimierung für Unternehmen

### Primary Keywords (EN)
- Process Automation Consultant
- Workflow Automation Germany
- n8n Consultant Berlin
- Operations Excellence Consultant

### Meta Description Template (DE)
"Prozessautomatisierung Berater für Unternehmen. Eliminiere repetitive Arbeit durch systematische Analyse und hands-on Implementierung. 7 Jahre Operations-Erfahrung + moderne Tools."

### Meta Description Template (EN)
"Process Automation Consultant helping SMEs eliminate repetitive work through systematic analysis and hands-on implementation. 7 years operations experience + modern automation tools."

## Development Guidelines

### File Organization
- Content files: [concept/](concept/) - All German text content with numbering system
- Images: [images/](images/) - Professional photos and project screenshots
- Resources: [resources/](resources/) - Downloadable PDFs (CVs already present)
- Current homepage: [index.html](index.html) - Simple "coming soon" placeholder

### Content Source Files
All page content is fully written in German in the concept directory:
- [01-home-texte-de.md](concept/01-home-texte-de.md)
- [02-about-texte-de.md](concept/02-about-texte-de.md)
- [03-services-texte-de.md](concept/03-services-texte-de.md)
- [04-portfolio-texte-de.md](concept/04-portfolio-texte-de.md)
- [05-values-texte-de.md](concept/05-values-texte-de.md)
- [06-contact-texte-de.md](concept/06-contact-texte-de.md)
- [07-404-texte-de.md](concept/07-404-texte-de.md)

**Master concept document:** [website-konzept-overview.md](concept/website-konzept-overview.md)

### Navigation Structure
```
[Logo] Kevin Armbruster | Home | Über mich | Services | Portfolio | Werte | Kontakt | [DE|EN] [LinkedIn]
```

### Footer Structure
- Column 1: About Kevin Armbruster
- Column 2: Quick Links (Services, Portfolio, About, Values, Contact)
- Column 3: Resources (CV download, Services PDF, email, phone)
- Column 4: Connect (LinkedIn, Location: Berlin)
- Bottom: © 2026 + Impressum | Datenschutz | Language toggle

## Important Notes

### Testimonials
All testimonials in content files are **placeholders**. Real testimonials need to be collected from actual clients. The placeholders provide structure and tone guidance.

### Legal Requirements (DSGVO)
To be created:
- Impressum page
- Datenschutzerklärung (Privacy Policy)
- Cookie banner (if using analytics)

### Missing Assets
- Professional photos of Kevin
- Screenshots of all portfolio projects
- n8n workflow screenshots
- Services Overview PDF

### Pura Vida Connection
Kevin coordinates the Operations Team at Pura Vida Festival and practices Non-Violent Communication (NVC) there. This is featured on the Values page as it connects to his business approach: successful automation requires people to adopt change, and NVC skills help navigate resistance with empathy.

## Contact Information
- LinkedIn: linkedin.com/in/kevin-armbruster
- Location: Berlin, Deutschland

## Development Phases (From Concept)

1. **Preparation** - Finalize design, organize photos, register domain
2. **Content** - Finalize PDFs, collect testimonials, review texts
3. **Development** - Tech stack setup, build pages, responsive design, language toggle
4. **Integration** - n8n chatbot, calendar booking, PDF downloads, contact form
5. **Launch** - Testing, SEO, legal pages, soft launch, LinkedIn announcement
