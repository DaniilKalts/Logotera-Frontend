// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // …any other existing options…

    // add this:
    experimental: {
        allowedDevOrigins: [
            'http://localhost:3002',
            'http://192.168.43.116:3002',
        ],
    },
}

module.exports = nextConfig
