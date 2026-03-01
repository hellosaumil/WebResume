# WebResume 🌐 💻 📄

A modern, interactive web-based resume — dynamic content loading, dark mode, live editing, and print-ready layout.

[![Live Site](https://img.shields.io/badge/🔗_Live_Site-hellosaumil.github.io/WebResume-blue)](https://hellosaumil.github.io/WebResume)
[![Demo Site](https://img.shields.io/badge/🧪_Demo_Site-/demo-orange)](https://hellosaumil.github.io/WebResume/demo/)
[![GitHub Pages](https://img.shields.io/github/actions/workflow/status/hellosaumil/WebResume/jekyll-gh-pages.yml?label=Deploy)](https://github.com/hellosaumil/WebResume/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](#license)

<p align="center">
  <img src="docs/assets/Hero-Light.png" alt="Hero Light" width="400">
  <img src="docs/assets/Hero-Dark.png" alt="Hero Dark" width="400">
</p>

## 💡 Motivation

<!-- TODO: Write motivation — why I decided to build this, what problem it solves, etc. -->

## ✨ Features

- **CSS Inspector** — Hover to inspect font properties

  <img src="docs/assets/Feature_Highlight-CSS_Inspector1-Demo.png" alt="CSS Inspector 1" width="500">
  <img src="docs/assets/Feature_Highlight-CSS_Inspector2-Demo.png" alt="CSS Inspector 2" width="500">
- **Dark Mode** — Auto-detects device theme with manual toggle

  <img src="docs/assets/Feature_Highlight-Dark_Mode-Demo.png" alt="Dark Mode" width="500">
- **Dynamic Content Loading** — Resume data from easy-to-edit Markdown files  <!-- ![](docs/assets/feature-dynamic.png) -->
- **Live Edit Mode** — All content editable in-browser  <!-- ![](docs/assets/feature-edit.png) -->
- **Section Reordering** — Drag & drop section titles  <!-- ![](docs/assets/feature-reorder.png) -->
- **Page Preview** — US Letter page constraints & guides  <!-- ![](docs/assets/feature-pagepreview.png) -->
- **Print Ready** — Optimized for PDF export  <!-- ![](docs/assets/feature-print.png) -->

> See [Controls & Features](docs/controls.md) for detailed usage.

## 🚀 Quick Start

```bash
npx serve .          # start local server → open http://127.0.0.1:3000
```

Edit any `.md` file in `data/`, refresh to see changes. See [Data Format](docs/data-format.md) for schemas.

## 📁 Project Structure

```
WebResume/
├── index.html              # Main HTML structure
├── styles.css              # Styling with dark mode support
├── script.js               # Dynamic loading & interactive features
├── DESIGN_SYSTEM.md        # Typography & spacing style guide
├── data/                   # Resume content in Markdown
│   ├── header.md
│   ├── summary.md
│   ├── education.md
│   ├── experience.md
│   ├── projects.md
│   ├── skills.md
│   ├── publications.md
│   ├── leadership.md
│   └── certificates.md
├── docs/                   # Detailed documentation
│   ├── data-format.md
│   ├── controls.md
│   ├── deployment.md
│   └── customization.md
└── .github/workflows/      # CI/CD
    ├── jekyll-gh-pages.yml
    └── pr-preview.yml
```

## 📦 Deployment

Pushes to `main` auto-deploy to GitHub Pages. The `demo` branch deploys to `/demo/`. Tags create frozen version snapshots. PRs get live previews.

```mermaid
flowchart LR
    subgraph Triggers ["Triggers"]
        direction TB
        A["Push main"]
        B["Push demo"]
        C["Push v*"]
        D["Open PR"]
    end

    Triggers --> GHA[["GitHub Actions"]]
    GHA --> GP[("gh-pages branch")]

    GP --> E["Deploy /"]
    GP --> F["Deploy /demo/"]
    GP --> G["Deploy /v[N]/"]
    GP --> H["Deploy /pr-[N]/"]

    %% Colors & Styles
    style Triggers fill:#fffde7,stroke:#fbc02d
    style GHA fill:#f3e5f5,stroke:#7b1fa2
    style GP fill:#e8eaf6,stroke:#3f51b5
    
    style E fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style F fill:#e8f5e9,stroke:#388e3c
    style G fill:#f3e5f5,stroke:#7b1fa2
    style H fill:#f3e5f5,stroke:#7b1fa2,stroke-dasharray: 5 5
```

> See [Deployment Guide](docs/deployment.md) for versioned deploys, manual triggers, and PR preview details.

## 🛠️ Technologies

- **Frontend**: Pure HTML / CSS / JavaScript (no frameworks)
- **Content**: Markdown for structured data
- **Fonts**: Google Fonts (Google Sans Flex, Space Grotesk)
- **Hosting**: GitHub Pages via `gh-pages` branch
- **CI/CD**: GitHub Actions (production + PR previews)

## 📚 Docs

| Document | Description |
|----------|-------------|
| [Data Format](docs/data-format.md) | Markdown schemas for each resume section |
| [Controls & Features](docs/controls.md) | Floating panel, inspector, drag & drop, link tooltips |
| [Deployment](docs/deployment.md) | Production, versioned, and PR preview deployments |
| [Customization](docs/customization.md) | Theming, section order, style guide |
| [Design System](DESIGN_SYSTEM.md) | Typography hierarchy & spacing conventions |

## 📄 License

MIT License — feel free to use this template for your own resume!
