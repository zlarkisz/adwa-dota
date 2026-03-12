// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
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
