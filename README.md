# 💻 Modern Cinematic 3D Portfolio

![Demo Preview](public/preview.jpg) <!-- Optional: Add a screenshot here in future -->

Welcome to the **Cinematic 3D Developer Portfolio**. This project is a state-of-the-art, high-performance web application designed to present software development skills through an immersive, macOS-inspired interface. The portfolio blends sleek modern web aesthetics with highly refined 3D interactions and smooth animations.

---

## ✨ Features

- **macOS-Inspired Interface:** Uses dynamic dock navigation, fluid entrance animations, and a realistic "boot-up" sequence replicating the macOS startup experience.
- **Cinematic Visuals & 3D Interactivity:** Leveraging **Three.js** and **React Three Fiber/Drei**, featuring scroll-rotated 3D background elements, spotlights, and "Liquid Glass" effects.
- **LiquidEther WebGL Backgrounds:** Features a highly optimized WebGL fluid background that adapts to user interactions and seamlessly transitions between themes.
- **Theme Consistency:** Complete synchrony between Light and Dark modes with context-aware text, shadows, liquid glass effects, and dynamic UI elements.
- **Performant Smooth Scrolling:** Utilizing **Lenis** to provide silky smooth momentum scrolling synchronized with parallax blur effects and intersection observers.
- **Advanced Animations:** Combines **Framer Motion** and **GSAP** for dynamic scroll-linked blur transitions, tilt-effect project cards, and 3D-perspective entrance animations.
- **Developer Activity Tracking:** An integrated, aesthetically customized GitHub contributions heatmap using `react-github-calendar` seamlessly integrated into the Stats/Skills section.

---

## 🛠️ Technology Stack

This application is built entirely on the modern React 19 and Vite 8 ecosystem, focusing heavily on interactive rendering and strict type safety.

- **Framework:** React 19 + TypeScript
- **Tooling:** Vite 8
- **Styling:** Tailwind CSS V4 + PostCSS + `clsx` / `tailwind-merge`
- **Animations:** Framer Motion + GSAP
- **3D & Canvas:** Three.js + @react-three/fiber + @react-three/drei + Spline 
- **Smooth Scrolling:** Lenis
- **UI Primitives & Icons:** Radix UI (`@radix-ui/react-switch`), Lucide React, React Icons
- **Formatting & Linting:** ESLint 9 + Prettier

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (LTS or v24+ recommended) and **npm/yarn/pnpm** installed on your system.

### 1. Clone the repository

```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Install Dependencies

You can use `npm` or `yarn`:

```bash
npm install
```

### 3. Run the Development Server

Start Vite's ultra-fast local development server:

```bash
npm run dev
```

The application will be available at [`http://localhost:5173`](http://localhost:5173).

### 4. Build for Production

To create a highly optimized and minified production build:

```bash
npm run build
```

You can then locally preview the complete production build using:

```bash
npm run preview
```

---

## 📁 Project Structure highlights

- `src/components/MacStartup.tsx` - Handles the dramatic system-boot cinematic sequence.
- `src/components/HomeDock.tsx` - The custom "liquid glass" navigation dock.
- `src/App.tsx` - Central routing/layout logic, setting up Lenis, context providers, and dynamic backgrounds.
- `src/components/` - Isolated UI components combining UI primitives and complex animation logic. 

---

## 🎨 Future Enhancements & Ideas

- Deeper integration of 3D shaders directly interacting with the mouse pointers.
- Localization (i18n) for multiple languages.
- More 3D easter eggs scattered around the component sections.

---

## 📝 License

This project is open-source and available under the MIT License. Feel free to use this as inspiration or a template to build your own immersive web portfolio!
