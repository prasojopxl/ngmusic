/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_BASE: process.env.URL_BASE,
        URL_API: process.env.URL_API,
    },
    images: {
        domains: ['is1-ssl.mzstatic.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "is1-ssl.mzstatic.com",
                pathname: "**",
            },
        ],
    },
    reactStrictMode: true,
}

module.exports = nextConfig
