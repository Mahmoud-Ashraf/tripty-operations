/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  sassOptions: {
    additionalData: `@import '@/styles/Utils/variables';`,
  },
}

module.exports = nextConfig
