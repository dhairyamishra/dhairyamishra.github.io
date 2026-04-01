# Dhairya Mishra - Personal Portfolio

Welcome to the repository for my personal portfolio website, built with [Astro](https://astro.build/). This site showcases my projects, professional experience, education, and skills.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Framework Integrations**: React (for interactive components like contact forms)
- **Content Management**: Built-in Astro Content Collections (Markdown/MDX) for projects and experiences

## 📁 Project Structure

```text
/
├── public/                 # Static assets (images, robots.txt, etc.)
│   └── images/
│       └── projects/       # Project thumbnails and galleries
├── src/
│   ├── components/         # Astro and React UI components
│   ├── content/            # Markdown content collections
│   │   ├── experience/     # Resume/work experience entries
│   │   └── projects/       # Portfolio project entries
│   ├── data/               # Static data arrays (skills, education, publications)
│   ├── layouts/            # Page layouts
│   └── pages/              # Routing pages (index, about, projects, contact)
├── astro.config.mjs        # Astro configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🧞 Development Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 📝 Recent Additions
- **Media Lightbox & Galleries**: Added `MediaLightbox.astro` and `ProjectGallery.astro` to showcase project images seamlessly.
- **Mermaid Markdown**: Added `MermaidBlock.astro` to render Mermaid diagrams directly inside markdown entries.

## 📄 License
This repository is primarily for my personal portfolio, but feel free to explore the code.
