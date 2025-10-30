import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    
    // Externalize node:sqlite to prevent bundling for Cloudflare Workers
    if (isServer) {
      webpackConfig.externals = webpackConfig.externals || [];
      webpackConfig.externals.push({
        'node:sqlite': 'commonjs node:sqlite',
      });
    }
    
    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })