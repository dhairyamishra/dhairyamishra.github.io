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

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable                  | Purpose                                                                   |
| :------------------------ | :------------------------------------------------------------------------ |
| `PUBLIC_WEB3FORMS_KEY`    | Web3Forms public access key used by the contact form. Public by design.   |

For GitHub Pages deploys, add `PUBLIC_WEB3FORMS_KEY` as a repository secret (Settings → Secrets and variables → Actions). The build workflow (`.github/workflows/deploy.yml`) reads it at build time.

## 🖼️ Open Graph Image

The social-share card lives at `public/og.svg` (source of truth) and `public/og.png` (generated). Edit the SVG to customize, then regenerate the PNG:

```bash
npm run build:og
```

`npm run build` runs this step automatically before the Astro build.

## 📝 Recent Additions
- **Inline MDX Media**: All project and experience content lives in `.mdx` files. Drop `<Hero>`, `<Figure>`, `<FigureGrid>`, `<VideoEmbed>` (in `src/components/mdx/`) directly inside the prose to interweave images and video with the narrative. Click-to-zoom is wired through `MediaLightbox.astro`.
- **Mermaid in MDX**: Use `<MermaidBlock code={`...`} />` from any `.mdx` file to render Mermaid diagrams inline.

## 📄 License
This repository is primarily for my personal portfolio, but feel free to explore the code.
