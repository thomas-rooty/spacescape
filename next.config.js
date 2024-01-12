/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
}

const withTM = require('next-transpile-modules')(['three'])

// Module export the nextConfig and the withTM
module.exports = withTM()
module.exports = nextConfig

