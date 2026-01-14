import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function cleanGitBookSyntax(content: string): string {
  // Remove GitBook hint blocks
  content = content.replace(/\{% hint style="[^"]*" %\}\n?/g, '');
  content = content.replace(/\{% endhint %\}\n?/g, '');

  // Remove GitBook content-ref blocks
  content = content.replace(/\{% content-ref url="[^"]*" %\}\n?\[.*?\]\(.*?\)\n?\{% endcontent-ref %\}\n?/g, '');

  // Remove GitBook embed blocks
  content = content.replace(/\{% embed url="[^"]*" %\}\n?/g, '');

  // Fix image paths - change .gitbook/assets to /assets
  content = content.replace(/\.\.\/.gitbook\/assets\//g, '/assets/');
  content = content.replace(/\.gitbook\/assets\//g, '/assets/');

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
      const fixed = cleanGitBookSyntax(content);

      if (content !== fixed) {
        writeFileSync(fullPath, fixed);
        console.log(`Cleaned GitBook syntax in: ${fullPath}`);
      }
    }
  }
}

const contentDir = join(process.cwd(), 'content');
console.log('Cleaning GitBook syntax from MDX files...');
processDirectory(contentDir);
console.log('Done!');
