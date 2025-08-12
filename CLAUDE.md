# PDF Optimizer - Project Context

## Project Overview

A React-based web application for PDF optimization using client-side processing. The app allows users to upload PDF files and compress them using different optimization levels (light, medium, heavy) with WebAssembly-powered Ghostscript processing.

## Tech Stack

- **Framework**: TanStack React Start (modern React meta-framework)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom styling
- **File Upload**: react-dropzone
- **PDF Processing**: WebAssembly Ghostscript worker
- **Build Tool**: Vite
- **Package Manager**: pnpm (based on pnpm-lock.yaml)

## Project Structure

```
src/
├── components/ui/          # Reusable UI components (Button, Card, Input, etc.)
├── hooks/                  # Custom React hooks
│   ├── use-locale.ts      # Internationalization hook
│   └── use-pdf-optimization.ts  # PDF processing hook
├── lib/                   # Utility libraries
├── routes/                # File-based routing
│   ├── __root.tsx        # Root layout and SEO
│   ├── index.tsx         # Main PDF optimizer page
│   └── privacy.tsx       # Privacy policy page
├── server/               # Server-side functions
├── styles/              # CSS stylesheets
├── utils/              # Utility functions
└── worker/             # WebAssembly workers
    ├── background-worker.js
    ├── gs-worker.js
    ├── gs-worker.wasm
    └── worker-init.js
```

## Key Features

- **Drag & Drop PDF Upload**: Using react-dropzone
- **Three Optimization Levels**: Light (10-30%), Medium (30-60%), Heavy (60-80%) compression
- **Client-side Processing**: WebAssembly Ghostscript for PDF optimization
- **Internationalization**: Multi-language support via useLocale hook
- **Responsive Design**: Tailwind CSS with gradient backgrounds and animations
- **File Size Comparison**: Shows original vs optimized file sizes and reduction percentage

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

## Important Notes

- PDF processing happens entirely client-side using WebAssembly
- No server-side PDF processing or storage
- Supports only PDF file uploads
- Uses Web Workers for non-blocking PDF processing
- Responsive design with animated background elements
