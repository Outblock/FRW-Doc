import { docs, meta } from '@/.source/server';
import { loader, source } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// Transform docs to VirtualPage format
const pages = docs.map((doc: any) => {
  // Remove 'content/' prefix and '.mdx' extension from path
  const cleanPath = doc.info.path.replace(/\.mdx$/, '');

  return {
    type: 'page' as const,
    path: cleanPath,
    absolutePath: doc.info.fullPath,
    data: doc,
  };
});

// Transform meta to VirtualMeta format
const metas = meta.map((m: any) => {
  // Remove 'content/' prefix and '.json' extension from path
  const cleanPath = m.info.path.replace(/\.json$/, '');

  return {
    type: 'meta' as const,
    path: cleanPath,
    absolutePath: m.info.fullPath,
    data: m,
  };
});

const sourceData = source({
  pages,
  metas,
});

export default loader({
  baseUrl: '/docs',
  source: sourceData,
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
});
