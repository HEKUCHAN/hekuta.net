const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: true },
  i18n,
  reactStrictMode: true,
};

module.exports = nextConfig;
