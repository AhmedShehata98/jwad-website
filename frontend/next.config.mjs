/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_BASE_URL_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_BASE_URL,
                port: process.env.NEXT_PUBLIC_BASE_URL_PORT,
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
