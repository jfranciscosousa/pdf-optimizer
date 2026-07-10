# PDF Optimizer - Project Context

## Project Overview

A React-based web application for client-side PDF tools: optimize (compress via WebAssembly Ghostscript), merge, and split (both via pdf-lib in a dedicated Web Worker). Everything runs in the browser — no server-side file processing or storage.

## Tech Stack

- **Framework**: TanStack React Start (modern React meta-framework)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom styling
- **File Upload**: react-dropzone
- **PDF Processing**: WebAssembly Ghostscript worker (optimize), pdf-lib worker (merge/split)
- **Build Tool**: Vite
- **Package Manager**: pnpm (based on pnpm-lock.yaml)

## Project Structure

```
src/
├── components/ui/          # Reusable UI components (Button, Card, Input, etc.)
├── components/             # Shared page components (ToolNav, PdfDropzone, FileRow, UniversalFooter, ...)
├── hooks/                  # Custom React hooks
│   ├── use-locale.ts      # Internationalization hook
│   ├── use-pdf-optimization.ts  # Optimize tool hook
│   ├── use-pdf-merge.ts   # Merge tool hook
│   └── use-pdf-split.ts   # Split tool hook
├── lib/                   # Utility libraries (locales, download helper, cn)
├── routes/                # File-based routing
│   ├── __root.tsx        # Root layout and SEO
│   ├── index.tsx         # Landing/hub page (links to the three tools)
│   ├── optimize.tsx      # Optimize (compress) tool page
│   ├── merge.tsx         # Merge tool page
│   ├── split.tsx         # Split tool page
│   ├── license.tsx       # License page
│   └── privacy.tsx       # Privacy policy page
├── server/               # Server-side functions
├── styles/              # CSS stylesheets
└── worker/             # Web Workers
    ├── bg-worker.js / gs-worker.js  # Ghostscript WASM worker (optimize)
    ├── pdf-optimizer-worker.ts      # Main-thread client for the Ghostscript worker
    ├── pdf-tools-worker.ts          # pdf-lib worker (merge/split)
    └── pdf-tools.ts                 # Main-thread client for the pdf-lib worker
```

## Key Features

- **Three tools**: Optimize (compress), Merge, and Split, each on its own route (`/optimize`, `/merge`, `/split`), linked from the `/` hub page
- **Drag & Drop PDF Upload**: Using react-dropzone
- **Optimize**: Three compression levels — Light (10-30%), Medium (30-60%), Heavy (60-80%) — via WebAssembly Ghostscript
- **Merge**: Combine multiple PDFs, reorderable before merging, via pdf-lib in a Web Worker
- **Split**: Break a PDF into one single-page PDF per page, via pdf-lib in a Web Worker
- **Client-side Processing**: Nothing ever leaves the browser
- **Internationalization**: Multi-language support via useLocale hook
- **Responsive Design**: Tailwind CSS with gradient backgrounds and animations
- **File Size Comparison**: Optimize results show original vs optimized file sizes and reduction percentage

## Development Workflows

### Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build production bundle and type check
- `npm run start` - Start production server

### Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production (includes TypeScript checking)
pnpm build

# Format code (Prettier with lint-staged)
# Runs automatically on git commits via husky
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **Prettier**: Automatic formatting on commit
- **Husky**: Git hooks for code quality
- **Lint-staged**: Format files before commit

### Key Conventions

- Use `~/*` for src imports
- File-based routing with TanStack Router
- Tailwind CSS for styling
- TypeScript strict mode
- ESM modules throughout
- All user-facing copy uses Sentence case only (capitalize the first word and proper nouns; do not Title Case headings, buttons, labels, or any other UI text). The sole exception is the main app title ("PDF Optimizer"), which stays Title Case as a brand/product name
- Use Portuguese from Portugal for the PT labels

## Important Notes

- PDF processing happens entirely client-side using WebAssembly
- No server-side PDF processing or storage
- Supports only PDF file uploads
- Uses Web Workers for non-blocking PDF processing
- Responsive design with animated background elements
