# Flow Wallet Documentation

Official documentation website for Flow Wallet, a self-custodial blockchain wallet for the Flow blockchain.

## Overview

This documentation site is built with [Fumadocs](https://fumadocs.vercel.app/), a modern documentation framework powered by Next.js and MDX. It provides comprehensive guides for wallet users, developers integrating Flow Wallet, and ecosystem contributors.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Documentation**: Fumadocs (MDX-based)
- **Package Manager**: Bun
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Search**: Fumadocs built-in search with Orama

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── docs/              # Documentation routes
│   ├── api/               # API routes (search, LLMs)
│   └── source.ts          # Fumadocs source configuration
├── content/               # MDX documentation files
│   ├── features/         # Wallet features
│   ├── tutorial/         # User guides
│   ├── ecosystem-development/  # Developer integration
│   └── meta.json         # Navigation configuration
├── public/               # Static assets
│   ├── assets/          # Images and media
│   └── images/          # Additional images
├── lib/                  # Utility functions
├── scripts/              # Utility scripts
└── fumadocs.config.ts   # Fumadocs configuration
```

## Writing Documentation

### Creating a New Page

1. Create a new `.mdx` file in the appropriate `content/` subdirectory:

```mdx
---
title: Page Title
description: Optional page description
icon: LucideIconName
---

# Page Title

Your content here...
```

2. Update the corresponding `meta.json` file to add the page to navigation:

```json
{
  "title": "Section Title",
  "icon": "LucideIconName",
  "pages": [
    "existing-page",
    "your-new-page"
  ]
}
```

### MDX Features

- Use frontmatter for page metadata (title, description, icon)
- Use relative links for cross-references: `[Link Text](../other-page)`
- Import React components directly in MDX
- Support for code blocks with syntax highlighting

## Features

### Search

Built-in search functionality powered by Fumadocs and Orama:
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to search
- Server-side search API at `/api/search`
- Indexes all page titles, descriptions, and content

### AI Integration

Special endpoint for AI agents and LLMs:
- Endpoint: `/llms-full.txt`
- Provides a structured index of all documentation pages
- Returns titles, descriptions, and URLs in AI-friendly format

### Edit on GitHub

Every documentation page includes an "Edit on GitHub" button for easy contributions.

## Commands Reference

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run preview      # Build and start production server

# Conversion Scripts (from GitBook migration)
bun run scripts/convert-to-mdx.ts       # Convert GitBook markdown to MDX
bun run scripts/convert-remaining.ts    # Convert remaining markdown files
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes in the `content/` directory
4. Test locally with `bun run dev`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Links

- **Documentation Site**: https://frw-doc.vercel.app (or your deployed URL)
- **Flow Wallet iOS**: [App Store](https://apps.apple.com/ca/app/flow-wallet-nfts-and-crypto/id6478996750)
- **Flow Wallet Android**: [Google Play](https://play.google.com/store/apps/details?id=com.flowfoundation.wallet)
- **Chrome Extension**: [Chrome Web Store](https://chrome.google.com/webstore/detail/flow-core/hpclkefagolihohboafpheddmmgdffjm)
- **Flow Developers**: https://developers.flow.com/
- **GitHub Organization**: https://github.com/orgs/Outblock/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please:
- Open an issue on [GitHub](https://github.com/onflow/FRW-doc/issues)
- Visit [Flow Discord](https://discord.gg/flow)
- Check the [Flow Forum](https://forum.flow.com/)
