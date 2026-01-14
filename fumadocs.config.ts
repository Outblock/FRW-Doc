import { defineConfig } from 'fumadocs-mdx/config';

export default defineConfig({
  mdxOptions: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
