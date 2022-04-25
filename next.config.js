/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['goalarab.com','media.gemini.media']
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
