import type { NextConfig } from "next";
import withMDX from '@next/mdx';

const nextConfig: NextConfig = withMDX({
  options: {
    providerImportSource: '@mdx-js/react',
  }
})({
  pageExtensions: ['ts', 'tsx', 'mdx'],
});

export default nextConfig;
