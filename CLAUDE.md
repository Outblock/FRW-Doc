# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **Fumadocs-powered documentation site** for **Flow Wallet** (formerly Flow Reference Wallet or FRW), a self-custodial blockchain wallet for the Flow blockchain. The documentation covers wallet features, integration guides, tutorials, and ecosystem development resources.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Documentation**: Fumadocs (MDX-based)
- **Package Manager**: Bun
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## Commands

### Development
```bash
bun run dev          # Start development server (http://localhost:3000)
bun run build        # Build for production
bun run start        # Start production server
bun run preview      # Build and start production server
```

### Conversion Scripts
```bash
bun run scripts/convert-to-mdx.ts       # Convert GitBook markdown to Fumadocs MDX
bun run scripts/convert-remaining.ts    # Convert remaining markdown files
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with RootProvider
│   ├── page.tsx           # Homepage (redirects to /docs)
│   ├── globals.css        # Global styles (Tailwind + Fumadocs)
│   ├── source.ts          # Fumadocs source configuration
│   ├── api/               # API routes
│   │   └── search/        # Search API endpoint
│   │       └── route.ts   # Server-side search handler
│   ├── llms-full.txt/     # LLMs integration endpoint
│   │   └── route.ts       # AI-friendly documentation index
│   └── docs/              # Documentation routes
│       ├── layout.tsx     # Documentation layout (with logo)
│       └── [[...slug]]/   # Dynamic documentation pages
│           └── page.tsx   # Individual doc pages (with Edit on GitHub button)
├── lib/                   # Utility functions
│   └── get-llm-text.ts   # LLMs text extraction helper
├── content/               # MDX documentation files
│   ├── index.mdx         # Documentation homepage
│   ├── meta.json         # Navigation configuration
│   ├── features/         # Wallet features docs
│   ├── tutorial/         # User guides
│   ├── ecosystem-development/  # Developer integration guides
│   ├── ecosystem-primers/      # Background documents
│   ├── faq/              # FAQ
│   ├── download/         # Download information
│   └── open-source/      # Open source information
├── public/               # Static assets
│   ├── assets/          # Images from GitBook migration
│   └── images/          # Additional images
├── scripts/             # Utility scripts
├── source.ts            # Fumadocs source configuration
├── fumadocs.config.ts   # Fumadocs MDX configuration
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.mjs   # PostCSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Documentation Structure

### MDX Files Format

All documentation files use MDX format with frontmatter:

```mdx
---
title: Page Title
description: Optional page description
icon: OptionalLucideIconName
---

Page content here...
```

### Navigation Configuration

Navigation is controlled by `meta.json` files in each directory:

```json
{
  "title": "Section Title",
  "icon": "LucideIconName",
  "pages": [
    "file-name-without-extension",
    "another-file"
  ]
}
```

### Adding New Documentation Pages

1. Create a new `.mdx` file in the appropriate `content/` subdirectory
2. Add frontmatter with `title` and optionally `description`
3. Update the corresponding `meta.json` file to include the new page in navigation
4. Use relative links for cross-references: `[Link Text](../other-page)`

## Key Concepts

### Flow Wallet Specific Terminology

- **Account Linking/Hybrid Custody**: Flow's feature for linking custodial and self-custodial accounts
- **Account Abstraction**: Flow's native support for multiple keys per account
- **Secure Enclave**: iPhone hardware security for key storage
- **FCL (Flow Client Library)**: Flow's JavaScript SDK
- **Interaction Templates**: Human-readable transaction metadata
- **Capability Controllers**: Flow's access control system
- **Flow EVM**: Flow's EVM-compatible layer

### Fumadocs Architecture

- **Source Configuration** (`source.ts`): Defines how MDX files are loaded and processed
- **Loader**: Fumadocs' system for building page trees and generating static params
- **Layout Components**: `DocsLayout` provides the sidebar navigation and page structure
- **Page Components**: `DocsPage`, `DocsBody`, `DocsTitle`, `DocsDescription` structure individual pages

### Search Functionality

- **Search Engine**: Uses Fumadocs' built-in search with advanced search API
- **Search API**: Located at `app/api/search/route.ts`
- **Implementation**: Server-side search using `createSearchAPI` from `fumadocs-core/search/server`
- **Dependencies**: `@orama/orama` package for search indexing
- The search indexes all page titles, descriptions, and structured data
- Accessible via the search button in the navigation bar (Cmd+K or Ctrl+K)

### Logo Configuration

- **Logo File**: `/public/assets/logo.png`
- **Location**: Configured in `app/docs/layout.tsx`
- **Display**: Shows Flow Wallet logo (green and black flag on white circle) next to "Flow Wallet" text
- **Size**: 40x40px, displayed with padding (`p-1`)

### Edit on GitHub

- **Feature**: Each documentation page has an "Edit on GitHub" button at the bottom
- **Implementation**: Located in `app/docs/[[...slug]]/page.tsx`
- **Repository**: https://github.com/Outblock/FRW-Doc
- **Behavior**: Opens the source MDX file in GitHub for editing

### LLMs Integration

- **Endpoint**: `/llms-full.txt` - Provides AI-friendly documentation index
- **Purpose**: Allows AI agents to discover all documentation pages
- **Content**: Returns titles, descriptions, and URLs for all pages
- **Documentation Page**: `/docs/ai-integration` - User-facing documentation about this feature
- **Implementation**:
  - API route: `app/llms-full.txt/route.ts`
  - Text extraction: `lib/get-llm-text.ts`
  - Documentation: `content/ai-integration.mdx`
- **Sidebar**: Listed under "AI Integration" section in the navigation
- **Usage**: AI tools can fetch this file to understand the documentation structure

## Styling

- Uses Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Fumadocs UI components are pre-styled and imported via `fumadocs-ui/style.css`
- Global styles in `app/globals.css`:
  ```css
  @import 'tailwindcss';
  @import 'fumadocs-ui/style.css';
  ```

## Important Files

- **app/source.ts**: Configure the MDX source, base URL, and icon mapping
- **source.config.ts**: Fumadocs source configuration for docs and meta
- **fumadocs.config.ts**: Fumadocs MDX plugin configuration
- **next.config.mjs**: Next.js config with Fumadocs MDX plugin
- **app/docs/layout.tsx**: Documentation sidebar, navigation, and logo
- **app/docs/[[...slug]]/page.tsx**: Dynamic route for all documentation pages (includes Edit on GitHub button)
- **app/api/search/route.ts**: Server-side search API endpoint
- **app/llms-full.txt/route.ts**: LLMs integration endpoint for AI agents
- **lib/get-llm-text.ts**: Helper function to extract text for LLMs

## Git Workflow

- Main branch: `main`
- This repository was migrated from GitBook
- Original markdown files remain in root directories
- Converted MDX files are in `content/` directory

## Notes

- The site uses `output: 'export'` in Next.js config for static export compatibility
- Images from GitBook are in `public/assets/`
- Bun is used as the package manager for faster installs and execution
- TypeScript path aliases configured: `@/*` maps to project root
- Turbopack is enabled for faster development builds

## External Resources

- Flow Developers: https://developers.flow.com/
- Account Linking: https://flow.com/account-linking
- Fumadocs Documentation: https://fumadocs.vercel.app/
- Hybrid Custody: https://developers.flow.com/concepts/hybrid-custody
- Flow GitHub Organization: https://github.com/orgs/Outblock/
