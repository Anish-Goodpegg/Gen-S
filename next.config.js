/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  webpack: (config) => {
    // Add transpilation for firebase and undici packages
    config.module.rules.push({
      test: /[\\/]node_modules[\\/](firebase|undici)[\\/].*\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    });
    return config;
  }
};

module.exports = nextConfig;