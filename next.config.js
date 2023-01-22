/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

const withTM = require('next-transpile-modules')(['three'])

// Module export the nextConfig and the withTM
module.exports = withTM(nextConfig)
