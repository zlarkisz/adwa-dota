// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      title: "Fantastic 5 — Adwa Dota 2 Team",
      meta: [
        {
          name: "description",
          content:
            "Команда Fantastic 5 — профессионалы казино индустрии, которые завоюют Dota 2 турнир.",
        },
        { name: "keywords", content: "Fantastic 5, Dota 2, команда, турнир" },
        { property: "og:title", content: "Fantastic 5 — Adwa Dota 2 Team" },
        {
          property: "og:description",
          content:
            "Команда Fantastic 5 — профессионалы казино индустрии, которые завоюют Dota 2 турнир.",
        },
        { property: "og:image", content: "/images/f5-rect.jpg" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Fantastic 5 — Adwa Dota 2 Team" },
        { name: "twitter:image", content: "/images/f5-rect.jpg" },
        { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
        { name: "msapplication-TileColor", content: "#0a0a0a" },
        { name: "theme-color", content: "#0a0a0a" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png" },
        { rel: "manifest", href: "/manifest.json" },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    display: "swap",
    preload: true,
    download: true,
    families: {
      "Bebas Neue": true,
      Oswald: [300, 400, 700],
    },
  },
});
