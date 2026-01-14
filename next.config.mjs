import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // output: 'export', // Temporarily disabled for development
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
