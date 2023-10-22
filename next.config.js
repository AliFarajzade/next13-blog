/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/alifarajzade/next13-blogposts/master/images/**',
            },
        ],
    },
}

module.exports = nextConfig
