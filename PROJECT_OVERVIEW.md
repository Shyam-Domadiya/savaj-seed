# Savaj Seeds - Project Overview

## 1. Project Description
**Savaj Seeds** is a modern web application designed for an agricultural business specializing in premium seeds. The platform showcases various seed categories (Vegetable, Crop, Hybrid), certifications, and company information, aimed at farmers and distributors.

## 2. Technology Stack (Migration Target)
This project is currently being migrated from Next.js to a **React Single Page Application (SPA)** using **Vite**.

- **Core Framework:** React 19
- **Build Tool:** Vite 5
- **Routing:** React Router DOM v6
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (with Shadcn UI & Radix UI primitives)
- **Icons:** Lucide React
- **Animation:** Framer Motion, Tailwind Animate
- **Form Handling:** React Hook Form + Zod

## 3. Application Structure
The application is organized into the following logical sections:

### Main Pages
- **Home (`/`)**: Landing page with hero section, seasonal promotions, and "Why Choose Us" highlights.
- **Products (`/products`)**: A catalog of available seeds.
    - **Product Details (`/products/:id`)**: Detailed view of specific seeds.
- **Certifications (`/certifications`)**: Display of quality assurance and regulatory certifications.
- **About Us (`/about`)**: Company history and mission.
- **Contact (`/contact`)**: Inquiry forms and location details.
- **Blog (`/blog`)**: Agricultural tips and news.

### Key Components (To Be Moved to `src/components`)
- **UI Lib (`src/components/ui`)**: Reusable atoms like Buttons, Cards, Dialogs (Shadcn UI).
- **SiteHeader**: Main navigation bar.
- **SiteFooter**: Footer links and contact info.
- **TestimonialsSection**: Customer feedback carousel.

## 4. Migration Context (Next.js -> Vite)
We are currently converting this app from a Next.js Server-Side Rendered (SSR) app to a Client-Side Rendered (CSR) Vite app.

**Key Changes:**
- **File System:** `app/` directory will be replaced by `src/pages/` and `src/routes.tsx`.
- **Routing:** File-system routing (`app/page.tsx`) replaced by explicit route definitions.
- **Data Fetching:** Server Components replaced by client-side standard React hooks (`useEffect`).
- **Assets:** `next/image` replaced by standard `<img>` tags.

## 5. Directory Structure (Target)
```
/
├── public/              # Static assets (images, favicon)
├── src/
│   ├── components/      # Shared React components
│   │   ├── ui/          # Generic UI elements (Buttons, Inputs)
│   │   └── ...          # Feature-specific components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities (utils.ts)
│   ├── pages/           # Page components (Home, About, Products)
│   ├── layouts/         # Layout wrappers (RootLayout)
│   ├── App.tsx          # Main App component (Routes defined here)
│   ├── main.tsx         # Entry point (ReactDOM.render)
│   └── index.css        # Global styles (Tailwind)
├── index.html           # HTML entry point (Vite)
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite build config
```
