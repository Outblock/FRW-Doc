import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content',
  docs: {
    includeProcessedMarkdown: true,
  },
});

export default defineConfig();
