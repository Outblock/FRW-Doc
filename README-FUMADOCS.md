# Flow Wallet Documentation

Modern documentation site for Flow Wallet built with [Fumadocs](https://fumadocs.vercel.app/) and Next.js.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Documentation**: Fumadocs (MDX-based)
- **Package Manager**: Bun
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## 📁 Project Structure

- `app/` - Next.js application pages and layouts
- `content/` - MDX documentation files organized by topic
- `public/assets/` - Images and static assets
- `source.ts` - Fumadocs source configuration

## 📝 Writing Documentation

### Adding a New Page

1. Create an `.mdx` file in the appropriate `content/` subdirectory:

```mdx
---
title: Your Page Title
description: Optional description
---

Your content here...
```

2. Update the `meta.json` file in that directory to add your page to navigation:

```json
{
  "title": "Section Name",
  "pages": [
    "existing-page",
    "your-new-page"
  ]
}
```

### Organizing Content

- Each subdirectory in `content/` can have its own `meta.json` for navigation
- Use `index.mdx` for the main page of a section
- Reference images from `public/assets/`

## 🔧 Available Commands

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run preview  # Build and preview
```

## 🎨 Customization

- **Styling**: Edit `app/globals.css` and `tailwind.config.ts`
- **Layout**: Modify `app/docs/layout.tsx` for sidebar and navigation
- **Homepage**: Edit `app/page.tsx`
- **Theme**: Configure in `app/layout.tsx` with RootProvider

## 📚 Learn More

- [Fumadocs Documentation](https://fumadocs.vercel.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Flow Blockchain](https://flow.com/)

## 🤝 Contributing

See the original Flow Wallet documentation for contribution guidelines.

## 📄 License

See LICENSE file for details.
