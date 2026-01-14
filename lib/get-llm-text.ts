import type { Page } from 'fumadocs-core/source';

export async function getLLMText(page: Page): Promise<string> {
  // For now, use title and description
  // Full text extraction requires additional configuration that may not be necessary
  const title = page.data.title || '';
  const description = page.data.description || '';
  const url = page.url || '';

  let content = `# ${title}\n\n`;
  if (description) {
    content += `${description}\n\n`;
  }
  content += `URL: ${url}\n`;

  return content;
}
