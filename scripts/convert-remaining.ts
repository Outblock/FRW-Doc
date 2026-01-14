import { readFileSync, writeFileSync } from 'fs';

function convertGitBookToFumadocs(content: string): string {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontMatterRegex);

  let body = content;
  let title: string | undefined;
  let description: string | undefined;

  if (match) {
    const frontMatterText = match[1];
    body = content.slice(match[0].length);

    const lines = frontMatterText.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        if (key === 'title') title = value;
        if (key === 'description') description = value;
      }
    }
  }

  // Extract title from first heading if not in frontmatter
  if (!title) {
    const titleMatch = body.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }
  }

  // Remove emoji from title
  if (title) {
    title = title.replace(/^[⭐🔌📖💚🔓🦺🛠️📲💽🔐💸📱💻🖥️🔁🪙💾⛵👋❓⛓️]\s+/, '');
  }

  // Remove GitBook content-ref blocks
  body = body.replace(/\{% content-ref url="[^"]*" %\}\n\[.*?\]\(.*?\)\n\{% endcontent-ref %\}/g, '');

  // Build new frontmatter
  const fumadocsFrontMatter: string[] = ['---'];
  if (title) fumadocsFrontMatter.push(`title: ${title}`);
  if (description) fumadocsFrontMatter.push(`description: ${description}`);
  fumadocsFrontMatter.push('---');
  fumadocsFrontMatter.push('');

  return fumadocsFrontMatter.join('\n') + body.trim() + '\n';
}

const files = [
  { src: 'wallet-revoke-key-guide.md', dst: 'content/wallet-revoke-key-guide.mdx' },
  { src: 'download/download.md', dst: 'content/download/download.mdx' },
  { src: 'ecosystem-development/ecosystem-developer-grants.md', dst: 'content/ecosystem-development/ecosystem-developer-grants.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/README.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/index.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/web3-onboard.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/web3-onboard.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/web3js.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/web3js.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/privy.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/privy.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/etherjs.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/etherjs.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/mipd.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/mipd.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/others-sdks.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/others-sdks.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/rainbowkit.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/rainbowkit.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/viem.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/viem.mdx' },
  { src: 'ecosystem-development/integrate-flow-evm-with-web3-sdks/wagmi.md', dst: 'content/ecosystem-development/integrate-flow-evm-with-web3-sdks/wagmi.mdx' },
];

for (const { src, dst } of files) {
  try {
    const content = readFileSync(src, 'utf-8');
    const converted = convertGitBookToFumadocs(content);
    writeFileSync(dst, converted);
    console.log(`Converted: ${src} -> ${dst}`);
  } catch (error) {
    console.error(`Error converting ${src}:`, error);
  }
}

console.log('Remaining files converted!');
