# PDF Optimizer

A fast, secure PDF compression tool that runs entirely in your browser.

Kudos to Laurent. Their blogpost served [as the main inspiration for this tool](https://meyer-laurent.com/playing-around-webassembly-and-ghostscript).

## Features

- **Drag & Drop Upload** - Simply drag your PDF or click to browse
- **Three Compression Levels** - Light, Medium, or Heavy optimization
- **100% Private** - Files never leave your computer
- **Lightning Fast** - WebAssembly-powered processing
- **Multi-language** - English and Portuguese support

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## How it Works

1. Upload any PDF file
2. Choose your optimization level:
   - **Light**: 10-30% reduction, maximum quality
   - **Medium**: 30-60% reduction, balanced
   - **Heavy**: 60-80% reduction, smallest size
3. Download your optimized PDF

## Tech Stack

- React + TypeScript
- TanStack Router
- Tailwind CSS
- WebAssembly (Ghostscript)

## Privacy

Your files are processed locally using WebAssembly. No data is sent to any server - everything happens in your browser and is automatically deleted when you close the page.
