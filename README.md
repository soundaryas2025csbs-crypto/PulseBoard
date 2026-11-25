# PulseBoard

A responsive workspace dashboard built with React, Vite, Tailwind CSS, reusable Shadcn-style UI components, Lucide icons and Recharts.

## Features
- Responsive dashboard layout with mobile navigation
- Sidebar navigation across workspace sections
- Overview metric cards and activity charts
- Task list with interactive completion states
- Create-task modal
- Search/filter tasks
- Reusable Button and Card UI primitives

## Requirements
- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## GitHub

If you already have a repository, extract this folder into your project directory, then run:

```bash
git add .
git commit -m "Add PulseBoard dashboard"
git push
```

If the repository has not been connected yet:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git branch -M main
git push -u origin main
```

Replace the example URL with your own repository URL. Do not overwrite existing work without checking the repository first.

## Project structure

```text
pulseboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── lib/
    │   └── utils.js
    └── components/
        └── ui/
            ├── button.jsx
            └── card.jsx
```
