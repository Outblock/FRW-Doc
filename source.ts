import { loader } from 'fumadocs-core/source';
import { docs, meta } from './.source/server';

export default loader({
  baseUrl: '/docs',
  source: {
    files: docs.map((doc) => ({
      ...doc,
      type: 'page' as const,
    })),
    meta: meta.map((m) => ({
      ...m,
      type: 'meta' as const,
    })),
  },
});
