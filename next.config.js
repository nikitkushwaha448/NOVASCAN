/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        http2: false,
        child_process: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
      };
    }

    // Handle node: protocol imports for both client and server
    const nodeProtocolModules = {
      'node:events': 'events',
      'node:buffer': 'buffer',
      'node:stream': 'stream',
      'node:util': 'util',
      'node:crypto': 'crypto',
      'node:fs': 'fs',
      'node:path': 'path',
      'node:url': 'url',
      'node:assert': 'assert',
      'node:process': 'process',
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      ...nodeProtocolModules,
    };

    // Add fallback for client-side
    if (!isServer) {
      Object.keys(nodeProtocolModules).forEach(key => {
        const value = nodeProtocolModules[key];
        if (config.resolve.fallback[value] === false) {
          config.resolve.fallback[key] = false;
        }
      });
    }

    return config;
  },
}

module.exports = nextConfig
