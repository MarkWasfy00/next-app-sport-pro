/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['goalarab.com','media.gemini.media']
  },
  i18n: {
    locales: ["ar-EG"],
    defaultLocale: "ar-EG",
  },
}

module.exports = nextConfig
