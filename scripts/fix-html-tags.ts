import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function fixHtmlTags(content: string): string {
  // Fix img tags that don't have self-closing slash
  // Match <img...> that doesn't end with /> or />
  content = content.replace(/<img([^>]*)(?<!\/)\s*>/g, '<img$1 />');

  return content;
}

function processDirectory(dir: string) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.mdx')) {
      const content = readFileSync(fullPath, 'utf-8');
      const fixed = fixHtmlTags(content);

      if (content !== fixed) {
        writeFileSync(fullPath, fixed);
        console.log(`Fixed HTML tags in: ${fullPath}`);
      }
    }
  }
}

const contentDir = join(process.cwd(), 'content');
console.log('Fixing HTML tags in MDX files...');
processDirectory(contentDir);
console.log('Done!');
