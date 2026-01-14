import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename, relative } from 'path';

interface FrontMatter {
  title?: string;
  description?: string;
  icon?: string;
  [key: string]: any;
}

function extractGitBookFrontMatter(content: string): { frontMatter: FrontMatter; body: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, body: content };
  }

  const frontMatterText = match[1];
  const body = content.slice(match[0].length);

  const frontMatter: FrontMatter = {};
  const lines = frontMatterText.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontMatter[key] = value;
    }
  }

  return { frontMatter, body };
}

function extractTitleFromContent(body: string): string | undefined {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/^[⭐🔌📖💚🔓🦺🛠️📲💽🔐💸📱💻🖥️🔁🪙💾⛵👋❓⛓️]\s+/, '') : undefined;
}

function removeEmojiFromTitle(title: string): string {
  return title.replace(/^[⭐🔌📖💚🔓🦺🛠️📲💽🔐💸📱💻🖥️🔁🪙💾⛵👋❓⛓️]\s+/, '');
}

function convertGitBookToFumadocs(content: string): string {
  const { frontMatter, body } = extractGitBookFrontMatter(content);

  // Extract title from content if not in front matter
  const title = frontMatter.title || extractTitleFromContent(body);
  const description = frontMatter.description;

  // Remove GitBook-specific content-ref blocks
  let cleanBody = body.replace(/\{% content-ref url="[^"]*" %\}\n\[.*?\]\(.*?\)\n\{% endcontent-ref %\}/g, '');

  // Clean up title if it exists in both frontmatter and body
  if (title) {
    cleanBody = cleanBody.replace(new RegExp(`^#\\s+[⭐🔌📖💚🔓🦺🛠️📲💽🔐💸📱💻🖥️🔁🪙💾⛵👋❓⛓️]?\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm'), '');
  }

  // Build Fumadocs frontmatter
  const fumadocsFrontMatter: string[] = ['---'];
  if (title) fumadocsFrontMatter.push(`title: ${removeEmojiFromTitle(title)}`);
  if (description) fumadocsFrontMatter.push(`description: ${description}`);
  fumadocsFrontMatter.push('---');
  fumadocsFrontMatter.push('');

  return fumadocsFrontMatter.join('\n') + cleanBody.trim() + '\n';
}

function processDirectory(sourceDir: string, targetDir: string) {
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const items = readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = join(sourceDir, item);
    const stat = statSync(sourcePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (['.git', '.gitbook', 'node_modules', 'app', 'public', 'scripts'].includes(item)) {
        continue;
      }

      const targetSubDir = join(targetDir, item);
      processDirectory(sourcePath, targetSubDir);
    } else if (item.endsWith('.md') && !['README.md', 'SUMMARY.md', 'CLAUDE.md', 'LICENSE'].includes(item)) {
      const content = readFileSync(sourcePath, 'utf-8');
      const converted = convertGitBookToFumadocs(content);

      // Change .md to .mdx
      const targetFileName = item.replace(/\.md$/, '.mdx');
      const targetPath = join(targetDir, targetFileName);

      writeFileSync(targetPath, converted);
      console.log(`Converted: ${sourcePath} -> ${targetPath}`);
    }
  }
}

// Special handling for README.md -> index.mdx
function convertReadme() {
  const readmePath = join(process.cwd(), 'README.md');
  const content = readFileSync(readmePath, 'utf-8');
  const converted = convertGitBookToFumadocs(content);

  const targetPath = join(process.cwd(), 'content', 'index.mdx');
  writeFileSync(targetPath, converted);
  console.log(`Converted: ${readmePath} -> ${targetPath}`);
}

// Run conversion
const sourceDir = process.cwd();
const targetDir = join(process.cwd(), 'content');

console.log('Starting conversion...');
convertReadme();
processDirectory(sourceDir, targetDir);
console.log('Conversion complete!');
